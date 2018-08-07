var MarketPlace = artifacts.require("MarketPlace");
var Store = artifacts.require("Store");

contract('MarketPlace', function(accounts){
  it("The first account pays for the deployment. Hence, the balance of the first account must be less than 100 Ether", function() {
    return MarketPlace.deployed().then(function(instance) {
      return web3.eth.getBalance(web3.eth.accounts[0]);
    }).then(function(balance) {
      assert.isBelow(web3.fromWei(balance, "ether").toNumber(), 100, "The balance = " + balance + ", of the first account is not less than 100.");
    });
  });

  it("The first account shall be added as an Admin by default!", function(){
    return MarketPlace.deployed().then(function(instance){
      assert(instance.checkAdmingAccess(accounts[0]), "The first account of the network must have been an Admin by default!");
    });
  });

  it("The Super Admin, i.e. the first account, shall be able to add one or more admin user!", function(){
    return MarketPlace.deployed().then(function(instance){
        instance.createAdminUser(accounts[1], {from:accounts[0]});
        return instance;
    }).then(function(updatedInstance){
      assert(updatedInstance.checkAdmingAccess(accounts[1]), "The createAdminUser invocation did not succeed!");
    });

  });
});
