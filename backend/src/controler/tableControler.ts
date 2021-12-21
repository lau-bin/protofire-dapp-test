import {Server} from "@hapi/hapi";
import {singleton, inject} from "tsyringe";
import { TableDAO } from "../dao/tableDAO";

@singleton()
export class Controller {
    constructor(@inject("TableDAO") private tableDAO: TableDAO, server: Server){
        server.route({
            method: 'GET',
            path: '/results',
            handler: (request, h) => {
                
                return 'Hello World!';
            }
        });
    }
}
