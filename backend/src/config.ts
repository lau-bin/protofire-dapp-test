import { TableDAOConfig } from "./dao/tableDAO";
import { assert, isAbiItem, isInteger } from "./util";
import {isAddress} from "web3-utils";
import {injectable} from "tsyringe";

@injectable()
export class DAOConfig implements TableDAOConfig{
  contractAddress;
  fromAddress;
  gasMax;
  gasPrice;
  ctrRegisterInterface;
  updateInterval;
  provider;

  constructor(){
    let ctrInterface = JSON.parse(process.env.CTR_REGISTER_INTERFACE!);
    let ctrAddress = process.env.CONTRACT_ADDRESS!;
    let fromAddress = process.env.FROM_ADDRESS!
    let gasMax = Number.parseInt(process.env.GAS_MAX!)
    let updateInterval = Number.parseInt(process.env.CTR_UPDATE_INTERVAL!)
    let provider = process.env.WEB3_PROVIDER!;
  
    assert(isInteger(updateInterval), "update interval is not an integer")
    assert(isInteger(gasMax), "gas max is not an integer");
    assert(isAddress(ctrAddress), "contract address has wrong format");
    assert(isAddress(ctrAddress), "contract address has wrong format");
    assert(isAbiItem(ctrInterface), "contract interface has wrong format");
  
    this.contractAddress = ctrAddress;
    this.fromAddress = fromAddress;
    this.gasMax = gasMax;
    this.gasPrice = process.env.GAS_PRICE!;
    this.ctrRegisterInterface = ctrInterface;
    this.updateInterval = updateInterval;
    this.provider = provider;
  }
}