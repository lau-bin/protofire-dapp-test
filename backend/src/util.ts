import {AbiItem} from "web3-utils";



export function isInteger(obj: number): obj is Integer{
  if (obj % 1 > 0){
    return false;
  }
  else{
    return true;
  }
}

export function hasValue<T>(obj: T): obj is Exclude<typeof obj, undefined | null>{
  if (obj == null){
    return false;
  }
  else{
    return true;
  }
}

export function unwrap<T>(obj: T, message?: string) {
  if (hasValue(obj)){
    return obj;
  }
  else{
    throw new Error(message || "Value not present");
  }
}

export function assert(bool: boolean, msg: string): asserts bool{
  if (!bool) throw new Error(msg) 
}

export const stringType = "string";

type Integer = number & Symbol