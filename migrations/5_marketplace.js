var MarketPlace = artifacts.require("./MarketPlace.sol");
var Utils = artifacts.require("./library/Utils.sol");
var SafeMath = artifacts.require("./library/SafeMath.sol");

module.exports = function(deployer) {
  deployer.link(Utils, MarketPlace);
  deployer.link(Utils, SafeMath);
  deployer.deploy(MarketPlace);
};
