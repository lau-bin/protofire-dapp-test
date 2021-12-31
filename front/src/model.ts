import { TableDTO } from "../../backend/src/dto/tableDTO"
import { BaseModel, BuildClosedModel, PublicStoreValues, ClosedModel } from "../modules/sam"
import { TABLE_API_URI } from "./constants";
import {TableProvider} from "./service/tableProvider";

class GeneralModel extends BaseModel {

  constructor(){
    super();
    this.privateStore.tableProvider = new TableProvider(TABLE_API_URI);
    this.privateStore.tableProvider.start();
  }

  publicStore = {
    table: this.createProperty<TableDTO | null>(null),
  }
  privateStore: PrivateStore = {
    tableProvider: null
  }
  presentLogic(store: PublicStoreValues<this>, any?: {}) {
    if (nullish(store.table)){
      if (nullish(this.publicStore.table.value)){
        if (store.table.lastUpdate > this.publicStore.table.value?.lastUpdate){
          this.publicStore.table.set(store.table);
        }
      }
      else{
        this.publicStore.table.set(store.table);
      }
    }
  }

  broadcastChangedProps() {
    this.publicStore.table.broadcast()

  }

  nextAction() {

  }
}
export const appModelOpen = new GeneralModel();
export const appModel = BuildClosedModel(appModelOpen);
export type Model = ClosedModel<GeneralModel>
function nullish(el:any): el is {} {
  if (el != null && el != undefined){
    return true;
  }
  return false;
}


interface PrivateStore {
  tableProvider: TableProvider | null
} 