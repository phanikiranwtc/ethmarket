var Store = artifacts.require("./Store.sol");

module.exports = function(deployer) {
  deployer.deploy(Store, "SuperAdmin Store", "This shall never be used by anyone!", 0, "", 0);
};
