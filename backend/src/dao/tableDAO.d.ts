import {AbiItem} from "web3-utils";


export interface TableDAO{
  getMatchData: (tournamentId: number, from_block: number, limit: number)=> Promise<MatchData>
  getDeletedMatches: (tournamentId: number, from_block: number, limit: number)=> Promise<BigInt[]>
  getLastTournamentId: ()=> Promise<number>
  getTournamentName: (id:number)=> Promise<string>
  getTeamNames: (ids:number[]) => Promise<{names: string[], ids: number[]}>
  getTeamName: (id:number) => Promise<string>
  getMaxTimeframeForUpdate: ()=> Promise<number>
  getLastBlock: ()=>Promise<number>
  getLastMatchId: ()=>Promise<BigInt>
}

export interface TableDAOConfig{
  contractAddress: string,
  fromAddress: string,
  gasMax: Integer,
  gasPrice: string,
  ctrRegisterInterface: AbiItem,
  provider: string
}

export type MatchData = {
  id: number,
  matches: Array<{
    id: BigInt,
    data: Array<{
      score: number,
      id: number
    }>
  }>
}



