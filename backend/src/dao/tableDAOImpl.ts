import { TableDAO, TableDAOConfig } from "./tableDAO";
import {Eth} from "web3-eth";
import Table from "../entity/table";
import TableDTO from "../dto/tableDTO";
import {singleton, inject} from "tsyringe";

@singleton()
export class TableDAOImpl implements TableDAO{
  contract;
  table: Table = new Table();
  updateInterval;
  lastUpdate: Date | null = null;
  constructor(@inject("TableDAOConfig") config: TableDAOConfig){
    let eth = new Eth(config.provider);
    this.contract = new eth.Contract(
      config.ctrRegisterInterface,
      config.contractAddress,
      {
        from: config.fromAddress,
        gas: config.gasMax,
        gasPrice: config.gasPrice
      }
    );
    this.updateInterval = config.updateInterval;
  }

  getLastUpdate(){
    return this.lastUpdate;
  }
  setUpdateInterval(millis: Integer){
    this.updateInterval = millis;
  }
  getTable(){
    return this.table as TableDTO;
  }

  
}

