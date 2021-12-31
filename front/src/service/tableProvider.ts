import { Service } from "modules/framework/framework";
import { TableDTO } from "../../../backend/src/dto/tableDTO";
import { ViewDTO } from "../../../backend/src/dto/viewDTO";

export class TableProvider implements Service{

  private running = false;
  private table: TableDTO | null = null;
  constructor(private uri: string){
    this.start();
  }
  start(): void {
    if (!this.running){
      this.running = true;
      this.run();
    }
  }
  stop(): void {
    
  }

  private run(){
    window.setTimeout( async ()=>{
      try{
        let response = await this.fetch();
        console.log(response)
        // this.table = buildTable(response.body);
      }
      catch(e){
        console.log(e)
      }
      this.run();
    }, 15000);
  }

  private buildTable(data: ViewDTO){

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
  }
}