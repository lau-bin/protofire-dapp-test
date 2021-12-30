import Ganache from "ganache-core";
import { unwrap } from "../src/util";
import { execSync } from "child_process";
import * as path from "path";
// import { test, expect, jest, beforeEach } from "@jest/globals";


const src = path.join("tests", "ganacheDB");
const dist = path.join("tests", "copy_ganacheDB");
// copy blockchain test env to prevent modifications
console.warn("Copying DB")
execSync(`rm -rf ${dist}`);
execSync(`mkdir ${dist}`);
execSync(`cp -r ${src}/* ${dist}`);

const server = Ganache.server({
  db_path: dist,
  mnemonic: "polar velvet stereo oval echo senior cause cruel tube hobby exact angry",
  network_id: 5777,
  ws: false
});
server.on("listening", () => {
  beginTest();
})
server.on('error', (e: { code: string }) => {
  if (e.code === 'EADDRINUSE') {
    console.warn('Address in use, retrying...');
    server.close();
  }
});

console.warn("Starting server")
server.listen(unwrap(process.env.GANACHE_PORT, "Ganache port not specified"));


const beginTest = () => {
  console.warn("Done")
  server.close();
}

// test("Integration", async () => {


// })