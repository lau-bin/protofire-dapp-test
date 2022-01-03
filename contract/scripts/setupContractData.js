// const web3 = require("web3")
const Register = artifacts.require("Register");

// send events
async function registerMatches() {
  let register = await Register.deployed()
  await register.registerMatch("0x40000000A")
  await register.registerMatch("0x400000008")
  await register.registerMatch("0x400000009")
  await register.registerMatch("0x9")
  await register.registerMatch("0xA")
  // console.log(emited)
}
async function deleteMatch() {
  let register = await Register.deployed()
  await register.deleteMatch(0, 4)
}
async function registerTorunaments() {
  let register = await Register.deployed()
  await register.registertournament("tourn 1")
  await register.registertournament("tourn 1")

}
async function registerTeams() {
  let register = await Register.deployed()
  await register.registerTeam("team 3")
  await register.registerTeam("team 2")
  await register.registerTeam("team 1")
}
// sets test data for integration tests
module.exports = async function(c){
  await registerTorunaments();
  await registerTeams();
  await registerMatches();
  await deleteMatch();
  c();
}