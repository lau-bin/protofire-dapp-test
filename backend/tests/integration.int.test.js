"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ganache_core_1 = __importDefault(require("ganache-core"));
var util_1 = require("../src/util");
var child_process_1 = require("child_process");
var path = __importStar(require("path"));
// import { test, expect, jest, beforeEach } from "@jest/globals";
var src = path.join("tests", "ganacheDB");
var dist = path.join("tests", "copy_ganacheDB");
// copy blockchain test env to prevent modifications
console.warn("Copying DB");
(0, child_process_1.execSync)("rm -rf ".concat(dist));
(0, child_process_1.execSync)("mkdir ".concat(dist));
(0, child_process_1.execSync)("cp -r ".concat(src, "/* ").concat(dist));
var server = ganache_core_1["default"].server({
    db_path: dist,
    mnemonic: "polar velvet stereo oval echo senior cause cruel tube hobby exact angry",
    network_id: 5777,
    ws: false
});
server.on("listening", function () {
    beginTest();
});
server.on('error', function (e) {
    if (e.code === 'EADDRINUSE') {
        console.warn('Address in use, retrying...');
        server.close();
    }
});
console.warn("Starting server");
server.listen((0, util_1.unwrap)(process.env.GANACHE_PORT, "Ganache port not specified"));
var beginTest = function () {
    console.warn("Done");
    server.close();
};
// test("Integration", async () => {
// })
