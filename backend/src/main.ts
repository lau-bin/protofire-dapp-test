import "reflect-metadata";
import {container} from "tsyringe";
import { ControlerConfigImpl, DAOConfig } from "./config";
import { TableDAOImpl } from "./dao/tableDAOImpl";
import {Controller} from "./controler/tableControler";
import {server, Server} from "@hapi/hapi";
import { TableImpl } from "./model/tableImpl";
import { CacheImpl } from "./cache/cacheImpl";
// exit on unhandled exceptions
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
// creates the server object
const serverInstance = server({port: 4000, host: 'localhost'});

// configuration
container.register("TableDAOConfig", {
  useClass: DAOConfig
});
container.register("TableDAO", {
  useClass: TableDAOImpl,
});
container.register<Server>(Server, {useValue: serverInstance});
container.register("ControlerConfig", {
  useClass: ControlerConfigImpl,
});
container.register("Cache", {
  useClass: CacheImpl,
});
container.register("Table", {
  useClass: TableImpl,
});

// builds the api with DI
const instance = container.resolve(Controller)
// starts the server, it will begin to accept requests
serverInstance.start()
.then(ok=>{
},
err=>{
  console.log("server failed to start");
  console.log(err);
  process.exit(1);
})
console.log('server running on %s', serverInstance.info.uri);
