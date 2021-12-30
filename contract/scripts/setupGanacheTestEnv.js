const ganacheInstance = require("./setupGanache");
const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');

const GANACHE_DB = path.join(".", "scripts", "ganacheDB");
if (fs.existsSync(GANACHE_DB)){
  if (fs.existsSync(path.join(GANACHE_DB, "_tmp"))){
    fs.rmdirSync(path.join(GANACHE_DB, "_tmp"), {force:true});
  }
  fs.rmdirSync(GANACHE_DB, {force:true});
}
fs.mkdirSync(GANACHE_DB);

const instance = ganacheInstance.getInstance({
  db_path: GANACHE_DB,
  mnemonic: "polar velvet stereo oval echo senior cause cruel tube hobby exact angry",
  network_id: 5777,
  ws: false
});
ganacheInstance.start(instance);
var deploy;
instance.on("listening", ()=>{

  deploy = exec('npx truffle deploy');
  deploy.stdout.on('data', (data) => {
    console.log(`Truffle deploy: \n${data}`);
  });
  deploy.stderr.on('data', (data) => {
    console.log(`Truffle deploy: \n${data}`);
  });
  deploy.on("exit", ()=>{
    instance.close();
    console.log("Done");
  })
  // let migrations = fs.readdirSync(path.join(".", "migrations"));
  // migrations.sort((a, b)=>{
  //   let an = Number.parseInt(a.substring(0, 1));
  //   let bn = Number.parseInt(b.substring(0, 1));
  //   if (an < bn){
  //     return -1;
  //   }
  //   else if (an > bn){
  //     return 1;
  //   }
  //   return 0;
  // })
  // for (let i = 0; i < migrations.length; i++){
  //   console.log("Executing migration " + path.basename(migrations[i]));
  //   require(path.join("..", "migrations", migrations[i]))();
  // }
  // instance.close();
})
instance.on("exit", ()=>{
  deploy.kill();
})