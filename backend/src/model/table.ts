import { TableDTO } from "../dto/tableDTO";

export interface Table{
  getTable: ()=> TableDTO | null
  update: (tournamentId: number)=> Promise<void>
}

export interface Row{
  position: number,
  team: string,
  points: number,
  playedGames: number,
  wonGames: number,
  drawGames: number,
  lostGames: number,
  difference: number
}