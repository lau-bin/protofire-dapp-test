export default interface TableDTO{
  rows: Row[]
}

interface Row{
  position: number,
  team: string,
  points: number,
  playedGames: number,
  wonGames: number,
  drawGames: number,
  lostGames: number,
  difference: number
}