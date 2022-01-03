import { Server } from "@hapi/hapi";
import { singleton, inject, injectable } from "tsyringe";
import { Cache } from "../cache/cache";
import { TableDAO } from "../dao/tableDAO";
import { BusinessError } from "../dto/errors";
import { TableDTO } from "../dto/tableDTO";
import { ViewDTO } from "../dto/viewDTO";
import { Table } from "../model/table";
import { ControlerConfig } from "./controlerConfig";

@injectable()
export class Controller {
    updateError = false;
    constructor(
        @inject("Table") private table: Table,
        server: Server,
        @inject("Cache") private cache: Cache<TableDTO>,
        @inject("ControlerConfig") private config: ControlerConfig
    ) {
        this.updateTable();
        server.route({
            method: 'GET',
            path: '/results',
            handler: (request, h) => {
                let table = cache.get();
                let error: BusinessError[] = [];
                this.updateError && error.push("UpdateFailed");
                table == null && error.push("NotReady");
                table?.lastUpdate && table.lastUpdate < Date.now() - config.oldUpdateMillis && error.push("OldUpdate");
<<<<<<< HEAD
                let response: ViewDTO = {
                    table,
                    error
                };
=======
                let body: ViewDTO = {
                    table,
                    error
                };
                let response = h.response(body).header("Access-Control-Allow-Origin", "*");
                return response;
            }
        });
        server.route({
            method: 'OPTIONS',
            path: '/results',
            handler: (request, h) => {
                let response = h.response().header("Access-Control-Allow-Origin", "*");
                response.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
                response.header("Access-Control-Allow-Headers", "Content-Type");
                response.header("Access-Control-Max-Age", "30");
>>>>>>> develop
                return response;
            }
        });
    }

    private updateTable(){
        try{
            this.table.update(0)
            .then(()=>{
                let table = this.table.getTable();
                if (table != null){
                    this.cache.save(table);
                }
                this.updateError = false;
                setTimeout(() => {
                    this.updateTable();
                }, this.config.updateInterval);
            },
            e=>{
                this.updateError = true;
                console.log(e)
                setTimeout(() => {
                    this.updateTable();
                }, this.config.updateInterval);
            });
        }
        catch(e){
            this.updateError = true;
            console.log(e)
            setTimeout(() => {
                this.updateTable();
            }, this.config.updateInterval);
        }
        
    }
}
