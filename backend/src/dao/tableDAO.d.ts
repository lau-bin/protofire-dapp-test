import TableDTO from "../dto/tableDTO";
import {AbiItem} from "web3-utils";

export interface TableDAO{
  getLastUpdate: ()=>Date | null,
  setUpdateInterval: (millis:Integer)=>void,
  getTable: ()=>TableDTO
}

export interface TableDAOConfig{
  contractAddress: string,
  fromAddress: string,
  gasMax: Integer,
  gasPrice: string,
  ctrRegisterInterface: AbiItem,
  updateInterval: Integer,
  provider: string
}