import { Service } from "modules/framework/framework";
import { TableDTO } from "../../../backend/src/dto/tableDTO";
import { ViewDTO } from "../../../backend/src/dto/viewDTO";

export class TableProvider {

  private running = false;
  private table: TableDTO | null = null;
  constructor(private uri: string){
  }

<<<<<<< HEAD
  async getTable(): Promise<TableDTO>{
    let data = await this.fetch();
    let table = this.buildTable(data);
    return table;
  }

  private buildTable(data: ViewDTO): TableDTO{
    return data as unknown as TableDTO;
=======
  async getTable(): Promise<ViewDTO>{
    let data = await this.fetch();
    return data;
>>>>>>> develop
  }

  private async fetch(){
    let response = await window.fetch(this.uri, {
      method: "GET",
      headers: new Headers([
<<<<<<< HEAD
        ["Content-Type", "text/json"]
=======
        ["Content-Type", "text/json"],
>>>>>>> develop
      ]),
      mode:"cors"
    });

<<<<<<< HEAD
    console.log(response.body)
=======
>>>>>>> develop
    return (await response.json()) as ViewDTO;
  }
}