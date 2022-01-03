import { Service } from "modules/framework/framework";
import { TableDTO } from "../../../backend/src/dto/tableDTO";
import { ViewDTO } from "../../../backend/src/dto/viewDTO";

export class TableProvider {

  private running = false;
  private table: TableDTO | null = null;
  constructor(private uri: string){
  }

  async getTable(): Promise<ViewDTO>{
    let data = await this.fetch();
    return data;
  }

  private async fetch(){
    let response = await window.fetch(this.uri, {
      method: "GET",
      headers: new Headers([
        ["Content-Type", "text/json"],
      ]),
      mode:"cors"
    });

    return (await response.json()) as ViewDTO;
  }
}