import { inject, injectable, singleton } from "tsyringe";
import { FunctionBody, isThrowStatement } from "typescript";
import { MatchData, TableDAO } from "../dao/tableDAO";
import { Row, Table } from "./table";

@injectable()
export class TableImpl implements Table{
  private rows: Map<number, Row> = new Map();
  private rowsOrder: number[] = [];
  private lastUpdated: number | null = null;
  private lastBlock: number = 0;
  private lastMatchId: BigInt = BigInt(-1);
  private tournamentId: number = 0;
  constructor(
    @inject("TableDAO") private tableDAO: TableDAO
  ){}

  getTable(){
    if (this.lastUpdated == null){
      return null;
    }
    return {
      table: Array.from(this.rows.values()),
      lastUpdate: this.lastUpdated,
    }
  }

  async update(tournamentId: number){
    // clear state if tracked tournament changes
    if (this.tournamentId != tournamentId){
      this.rows.clear();
      this.tournamentId = tournamentId;
      this.lastUpdated = null;
      this.rowsOrder = [];
      this.lastBlock = 0;
      this.lastMatchId = BigInt(-1);
    }
    // clone model to discard update on errors
    let rowsClone = new Map(this.rows);
    let rowsOrderClone = Array.from(this.rowsOrder);
    let lastMatch = await this.tableDAO.getLastMatchId();
    // check if it's up to date
    if (lastMatch == this.lastMatchId){
      this.lastUpdated = Date.now();
      return;
    }
    let lastBlock = await this.tableDAO.getLastBlock();
    // only store the table of a single tournament

    // get all matches in batches to prevent throttle errors
    let matchData: MatchData[] = [];
    let block = {val:this.lastBlock};
    while (block.val < lastBlock){
      let requestArr = this.createCalls("getMatchData", lastBlock, tournamentId, block);
      let result = await Promise.all(requestArr);
      matchData = matchData.concat(result);
    }
    // get all deleted matches
    let deletedMatchData: BigInt[][] = [];
    block.val = this.lastBlock;
    while (block.val < lastBlock){
      let requestArr = this.createCalls("getDeletedMatches", lastBlock, tournamentId, block);
      let result = await Promise.all(requestArr);
      deletedMatchData = deletedMatchData.concat(result);
    }
    let flatDeletedMatchData = deletedMatchData.flat(1);
    let idsToGet: number[] = []

    // build table
    matchData.forEach(m=>{
      m.matches.forEach(mm=>{
        if (mm.id >= this.lastMatchId){
          let index = flatDeletedMatchData.indexOf(mm.id);
          if (index != -1){
            flatDeletedMatchData.splice(index, 1);
          }
          else{
            extractTeamData(idsToGet, mm.data, rowsClone, rowsOrderClone);
          }
        }
      });
    });
    // set team position from mirrored array
    rowsOrderClone.forEach((id, index)=>{
      rowsClone.get(id)!.position = index;
    })
    // get missing team names from rpc
    let counter = 0;
    let idsCounter = 0;
    while(idsCounter < idsToGet.length){
      let requests = [];
      while (idsCounter < idsToGet.length && counter < 10){
        let length = idsCounter + 50;
        requests.push(this.tableDAO.getTeamNames(idsToGet.slice(idsCounter, length > idsToGet.length ? idsToGet.length : length)));
        idsCounter += length;
      }
      let result = await Promise.all(requests);
      // set team names in table
      result.forEach(res=>{
        for (let i = 0; i < res.ids.length; i++){
          rowsClone.get(res.ids[i])!.team = res.names[i];
        }
      })
      counter = 0;
    }
    // if there wasnt an error the updated data is persisted on the model
    this.lastMatchId = lastMatch;
    this.lastUpdated = Date.now()
    this.lastBlock = lastBlock;
    this.rows = rowsClone;
    this.rowsOrder = rowsOrderClone;
  }

  // creates rpc event requests in 10 batches of 100.000 blocks
  private createCalls<T extends keyof Pick<TableDAO, "getDeletedMatches" | "getMatchData">>(method: T, lastBlock: number, tournamentId: number, block:{val:number}): ReturnType<TableDAO[T]>[]{
    let requestArr: any[] = [];
    let counter = 0;

    while (lastBlock > block.val && counter < 10){
      counter++;
      let diff = lastBlock - block.val;
      let request = this.tableDAO[method](
        tournamentId,
        block.val,
        100_000 > diff ? diff : 100_000
      );

      requestArr.push(request);
      block.val += 100_000 
    }

    return requestArr;
  }
}
// builds the table
function extractTeamData(idsToGet: number[], teamData: MatchData["matches"][any]["data"], rows: TableImpl["rows"], rowsOrder: TableImpl["rowsOrder"]) {
  let teamData1 = teamData[0];
  let team1 = rows.get(teamData1.id);
  if (team1){
    team1.points += teamData1.score;
    orderByScore(teamData1.id, team1.points, rowsOrder, rows, true);
  } 
  else{
    team1 = {} as Row;
    team1.points = teamData1.score;
    team1.playedGames = 0;
    team1.lostGames = 0;
    team1.wonGames = 0;
    team1.drawGames = 0;
    rows.set(teamData1.id, team1);
    orderByScore(teamData1.id, teamData1.score, rowsOrder, rows, false);
    idsToGet.push(teamData1.id);
  }

  let teamData2 = teamData[1];
  let team2 = rows.get(teamData2.id);
  if (team2){
    team2.points += teamData2.score;
    orderByScore(teamData2.id, team2.points, rowsOrder, rows, true);
  } 
  else{
    team2 = {} as Row;
    team2.points = teamData2.score;
    team2.playedGames = 0;
    team2.lostGames = 0;
    team2.wonGames = 0;
    team2.drawGames = 0;
    rows.set(teamData2.id, team2);
    orderByScore(teamData2.id, teamData2.score, rowsOrder, rows, false);
    idsToGet.push(teamData2.id);
  }
  team1.playedGames++;
  team2.playedGames++;

  if (teamData1.score > teamData2.score){
    team1.wonGames++;
    team2.lostGames++;
  }
  else if (teamData1.score < teamData2.score){
    team2.wonGames++;
    team1.lostGames++;
  }
  else{
    team2.drawGames++;
    team1.drawGames++;
  }
  
}
// calculates the position in the scoreboard using an array where the index is the position
function orderByScore(id: number, score: number, rowsOrder: TableImpl["rowsOrder"], rows: TableImpl["rows"], isPresent: boolean): number{
  let i = 0;
  if (isPresent){
    let limit = rowsOrder.indexOf(id);
    for (; i < limit; i++){
      if (rows.get(rowsOrder[i])!.playedGames < score){
        // deleted position is always higher so inisertion order does not change 
        rowsOrder.splice(limit, 1);
        rowsOrder.splice(i, 0, id);
        break;
      }
    }
  }
  else{
    for (; i < rowsOrder.length; i++){
      if (rows.get(rowsOrder[i])!.playedGames < score){
        rowsOrder.splice(i, 0, id);
        break;
      }
    }
    if (i == rowsOrder.length){
      rowsOrder.push(id);
    }
  }
  return i;
}