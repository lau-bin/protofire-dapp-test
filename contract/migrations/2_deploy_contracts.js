var register = artifacts.require("Register")
// var ownable = artifacts.require("Ownable")

module.exports = function(deployer) {
  // deployer.deploy(ownable)
  deployer.deploy(register)
};