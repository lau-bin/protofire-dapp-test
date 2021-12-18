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

// send events
async function sendA() {
  let register = await Register.deployed()
  let emited = await register.registerMatch(17180131338)
  console.log(emited)
}


module.exports = async function(c){
  // await sendA()
  await get()


  c()
}