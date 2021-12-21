export default class Table{
  rows: Row[] = []
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