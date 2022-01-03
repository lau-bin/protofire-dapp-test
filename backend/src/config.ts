import { TableDAOConfig } from "./dao/tableDAO";
import { assert, isInteger, unwrap } from "./util";
import {isAddress} from "web3-utils";
import {injectable} from "tsyringe";
import { ControlerConfig } from "./controler/controlerConfig";
import * as fs from "fs";

@injectable()
export class DAOConfig implements TableDAOConfig{
  contractAddress;
  fromAddress;
  gasMax;
  gasPrice;
  ctrRegisterInterface;
  provider;

  constructor(){
    let ctrInterface = JSON.parse(fs.readFileSync(process.env.CTR_REGISTER_INTERFACE!, {encoding: "utf-8"}));
    let ctrAddress = unwrap(process.env.CONTRACT_ADDRESS);
    let fromAddress = unwrap(process.env.FROM_ADDRESS);
    let gasMax = Number.parseInt(unwrap(process.env.GAS_MAX));
    let provider = unwrap(process.env.WEB3_PROVIDER);
  
    assert(isInteger(gasMax), "gas max is not an integer");
    assert(isAddress(ctrAddress), "contract address has wrong format");
    assert(isAddress(ctrAddress), "contract address has wrong format");
    assert(ctrInterface != undefined, "contract interface has wrong format");
  
    this.contractAddress = ctrAddress;
    this.fromAddress = fromAddress;
    this.gasMax = gasMax;
    this.gasPrice = process.env.GAS_PRICE!;
    this.ctrRegisterInterface = ctrInterface;
    this.provider = provider;
  }
}
@injectable()
export class ControlerConfigImpl implements ControlerConfig {
  updateInterval;
  oldUpdateMillis;
  constructor(){
    let updateInterval = Number.parseInt(unwrap(process.env.CTR_UPDATE_INTERVAL))
    let oldUpdateMillis = Number.parseInt(unwrap(process.env.OLD_UPDATE_MILLIS))

    assert(isInteger(updateInterval), "update interval is not an integer")
    assert(isInteger(oldUpdateMillis), "old update millis is not an integer")
    this.updateInterval = updateInterval;
    this.oldUpdateMillis = oldUpdateMillis;
  }
}