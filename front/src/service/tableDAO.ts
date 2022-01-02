import { Service } from "modules/framework/framework";
import { TableDTO } from "../../../backend/src/dto/tableDTO";
import { ViewDTO } from "../../../backend/src/dto/viewDTO";

export class TableProvider {

  private running = false;
  private table: TableDTO | null = null;
  constructor(private uri: string){
  }

  async getTable(): Promise<TableDTO>{
    let data = await this.fetch();
    let table = this.buildTable(data);
    return table;
  }

  private buildTable(data: ViewDTO): TableDTO{
    return data as unknown as TableDTO;
  }

  private async fetch(){
    let response = await window.fetch(this.uri, {
      method: "GET",
      headers: new Headers([
        ["Content-Type", "text/json"]
      ]),
      mode:"cors"
    });

    console.log(response.body)
    return (await response.json()) as ViewDTO;
  }
}