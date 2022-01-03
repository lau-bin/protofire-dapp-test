// const web3 = require("web3")
const Register = artifacts.require("Register");


// get events
async function get() {
  let register = await Register.deployed()
  let events = await register.getPastEvents('RegisterMatch', {
    // filter: {index: "0x23cace000000000000000100000000000000000000000000000002"},
    fromBlock: 0,
    toBlock: 'latest'
  })
  events.forEach(e=>{
    console.log(JSON.stringify(e))
    console.log('\n')
  })
}
async function get2() {
  let register = await Register.deployed()
  let events = await register.getPastEvents('DeleteMatch', {
    // filter: {index: "0x23cace000000000000000100000000000000000000000000000002"},
    fromBlock: 0,
    toBlock: 'latest'
  })
  events.forEach(e=>{
    console.log(JSON.stringify(e))
    console.log('\n')
  })
}

async function getProp(name){
  let register = await Register.deployed()
  let prop = await register[name].call()
  console.log(prop.toString())
}

// send events
async function sendA() {
  let register = await Register.deployed()
  await register.registerMatch("17179869194")
  await register.registerMatch("17179869194")
  await register.registerMatch("17179869193")
  await register.registerMatch("17179869197")
  // console.log(emited)
}
async function sendD() {
  let register = await Register.deployed()
  let emited = await register.deleteMatch(0, 1)
  console.log(emited)
}
async function sendB() {
  let register = await Register.deployed()
  let emited = await register.registertournament("tourn 1")
  console.log(emited)
}
async function sendC() {
  let register = await Register.deployed()
  await register.registerTeam("team 3")
  await register.registerTeam("team 2")
  await register.registerTeam("team 1")

  // console.log(emited)
  // console.log(emited2)
}

async function getTeamNames(){
  let register = await Register.deployed()
  let names = await register.getTeamNames([0, 1])
  console.log(names["0"])
  console.log(names["1"].toString())

  // console.log(ids)

}


module.exports = async function(c){
  await get()
  // await getProp("deletionTimeframeMaxMinutes")
  // await sendC()
  // await sendB()
  // await sendA()
  // await sendD()
  // await getTeamNames()
  // await sendC()
  c()
}