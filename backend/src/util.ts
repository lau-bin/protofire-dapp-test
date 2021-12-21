import {AbiItem} from "web3-utils";

export function isAbiItem(obj: any): obj is AbiItem{
  return(
    obj.type != undefined
  )
}

export function isInteger(obj: number): obj is Integer{
  if (obj % 1 > 0){
    return false;
  }
  else{
    return true;
  }
}

export function assert(bool: boolean, msg: string): asserts bool{
  if (!bool) throw new Error(msg) 
}
