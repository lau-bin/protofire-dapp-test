import { TableDAO, TableDAOConfig } from "./tableDAO";
import Eth from "web3-eth";
import Web3 from "web3"
import {singleton, inject, injectable} from "tsyringe";
import { assert, stringType } from "../util";
import BN from "bn.js";

@injectable()
export class TableDAOImpl implements TableDAO{
  contract;
  eth;
  eventNames = {
    new: "RegisterMatch",
    delete: "DeleteMatch"
  }
  constructor(@inject("TableDAOConfig") config: TableDAOConfig){
    this.eth = new Eth(new Web3.providers.HttpProvider(config.provider));
    this.contract = new this.eth.Contract(
      config.ctrRegisterInterface,
      config.contractAddress,
      {
        from: config.fromAddress,
        gas: config.gasMax,
        gasPrice: config.gasPrice
      }
    );
  }

  async getLastMatchId(){
    return BigInt(((await this.contract.methods.matchId().call()) as BN).toString());
  }
  async getLastBlock(){
    return await this.eth.getBlockNumber();
  }
  async getDeletedMatches(id: number, from_block: number, limit: number){
    let events = await this.contract.getPastEvents(this.eventNames.delete, {
      filter: {tournamentId: id},
      fromBlock: from_block,
      toBlock: from_block + limit
    });
    let deletedMatches = events.map(e=>{
      let data = BigInt(e.returnValues.id);
      return data;
    })
    return deletedMatches;
  }
  async getLastTournamentId(){
    return ((await this.contract.methods.tournamentIndex().call()) as BN).toNumber();
  }
  async getTournamentName(id: number){
    return await this.contract.methods.tournaments().call(id);
  }
  async getTeamNames(_ids: number[]){
    let result = await this.contract.methods.getTeamNames(_ids).call();
    let names = result["0"];
    let ids: BN[] = result["1"];
    return {
      ids: ids.map(id=>id.toNumber()),
      names
    }
  }
  async getTeamName(id: number){
    return await this.contract.methods.teams().call(id);
  }
  
  async getMaxTimeframeForUpdate(){
    return ((await this.contract.methods.deletionTimeframeMaxMinutes().call()) as BN).toNumber();
  }

  async getMatchData(id: number, from_block: number, limit: number) {
    let events = await this.contract.getPastEvents(this.eventNames.new, {
      filter: {tournamentId: id},
      fromBlock: from_block,
      toBlock: from_block + limit
    });
    let data = events.map(e=>{
      assert(typeof e.returnValues.data === stringType, "getMatchData event must be string");
      let data = BigInt("0" + e.returnValues.data);
      let matchId = data>>BigInt(128);
      let team1Data = data&BigInt("0xFFFFFFFFC00000000");
      let team1Id = Number(team1Data>>BigInt(36));
      let team1Score = Number((team1Data&BigInt(0xC00000000))>>BigInt(34));
      let team2Data = data&BigInt(0x3FFFFFFFF);
      let team2Id = Number(team2Data>>BigInt(2));
      let team2Score = Number(team2Data&BigInt(0x3));

      return {
        id: matchId,
        data: [
          {
            id: team1Id,
            score: team1Score
          },
          {
            id: team2Id,
            score: team2Score
          }
        ]
      }
    });

    return {
      id: id,
      matches: data
    }
  }
}

