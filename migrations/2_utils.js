var Utils = artifacts.require("./library/Utils.sol");

module.exports = function(deployer) {
  deployer.deploy(Utils);
};
