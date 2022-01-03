import { inject, injectable, singleton } from "tsyringe";
import { Cache } from "./cache";

@injectable()
export class CacheImpl<T> implements Cache<T>{

  private obj: T | null = null;
  private lastUpdated = 0;
  get(){
    return this.obj;
  }
  save(obj: T){
    this.obj = obj;
    this.lastUpdated = Date.now()
  }
  lastUpdate(){
    return this.lastUpdated;
  }
}