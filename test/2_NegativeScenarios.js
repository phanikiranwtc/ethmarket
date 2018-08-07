var MarketPlace = artifacts.require("MarketPlace");
var Store = artifacts.require("Store");

contract('MarketPlace', function(accounts){
  it("The second account must not be added in the Admin group at the time of contract deployment.", function() {
    return MarketPlace.deployed().then(function(instance) {
      assert(instance.checkAdmingAccess(accounts[1]), "The second account of the has been added to the Admin group by default!");
    });
  });

  it("A non-admin address shall not be allowed to create a store owner", function() {
    return MarketPlace.deployed().then(function(instance) {
       try {
         return instance.createStoreOwner(accounts[2], {from:accounts[3]});
       } catch (e) {
         console.log(e);
         return true;
       } 

    }).then(function(success){
      assert(!success, "The store owner was created by a non-admin account!");
    });
  });

});
