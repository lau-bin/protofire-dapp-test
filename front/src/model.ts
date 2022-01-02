import { TableDTO } from "../../backend/src/dto/tableDTO"
import { BaseModel, BuildClosedModel, PublicStoreValues, ClosedModel } from "../modules/sam"
import { TABLE_API_URI } from "./constants";
import {TableProvider} from "./service/tableDAO";

class GeneralModel extends BaseModel {

  constructor(){
    super();
    this.nextAction();
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
    if (this.privateStore.tableProvider == null){
      this.privateStore.tableProvider = new TableProvider(TABLE_API_URI);
      tableRecursive(this.privateStore.tableProvider);
    }
  }
}


var appModelOpen: GeneralModel | null = null;
var closedModel: ClosedModel<BaseModel> | null = null;
export function getAppModel(){
  if (closedModel == null){
    closedModel = BuildClosedModel(getAppModelOpen());
  }
  return closedModel;
}
export function getAppModelOpen(){
  if (appModelOpen == null){
    appModelOpen = new GeneralModel();
  }
  return appModelOpen;
}
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


const tableRecursive = async (service: TableProvider) => {
  let table = await service.getTable();
  appModelOpen!.present({table: table})
  setTimeout(() => {
    tableRecursive(service)
  }, 15000);
}