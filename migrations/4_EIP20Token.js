var SafeMath = artifacts.require("./library/SafeMath.sol");
var EIP20 = artifacts.require("./EIP20.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, EIP20);
  deployer.deploy(EIP20);
};
