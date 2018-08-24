var MarketPlace = artifacts.require("./MarketPlace.sol");
var Utils = artifacts.require("./library/Utils.sol");

module.exports = function(deployer) {
  deployer.link(Utils, MarketPlace);
  deployer.deploy(MarketPlace);
};
