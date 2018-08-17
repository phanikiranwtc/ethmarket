var Store = artifacts.require("./Store.sol");

module.exports = function(deployer) {
  deployer.deploy(Store, "SuperAdmin Store", "This shall never be used by anyone!", 0, "0xf928ac0ed0d0e91f51287a5f28dbdb1019fbba55");
};
