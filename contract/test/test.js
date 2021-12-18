// var Practice = artifacts.require("Practice");
var Register = artifacts.require("Register");



// contract("Practice", (accounts) => {
//   let instance
//   beforeEach(async () => {
//     instance = await Practice.new("HI")
//   });
//   afterEach(async () => {
//     await instance.kill();
//  });
  
//   it("should panic", async () => {
//       console.log(await instance.hello("lau"))
//   })
//   xit("should pass", async () => {
//   })

//   context("Greeting", async ()=>{
//     it("should get greeting", async ()=>{
//       let gret = await instance.hello(" lau")
//       console.log(gret)
//       assert(gret === "HI lau")
//     })
//   })
// })

contract("Register", (accounts) => {
  let instance
  beforeEach(async () => {
    instance = await Register.new()
  });
  afterEach(async () => {
    await instance.kill();
  });
  
  it("should register event", async () => {
      console.log(await instance.emitEventA("holaaa"))
  })
})