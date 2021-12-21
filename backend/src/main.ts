import "reflect-metadata";
import {container} from "tsyringe";
import { DAOConfig } from "./config";
import { TableDAOImpl } from "./dao/tableDAOImpl";
import {Controller} from "./controler/tableControler";
import {server, Server} from "@hapi/hapi";

const serverInstance = server({port: 3000, host: 'localhost'});

// configuration
container.register("TableDAOConfig", {
  useClass: DAOConfig
});
container.register("TableDAO", {
  useClass: TableDAOImpl,

});
container.register<Server>(Server, {useValue: serverInstance});
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

// init process
const instance = container.resolve(Controller)

serverInstance.start()
.then(ok=>{
  console.log('server running on %s', serverInstance.info.uri);
},
err=>{
  console.log("server failed to start");
  console.log(err);
  process.exit(1);
})
