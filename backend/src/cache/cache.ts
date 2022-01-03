export interface Cache<T>{
  get: ()=>T | null
  save: (obj: T)=>void
  lastUpdate: ()=> number
}