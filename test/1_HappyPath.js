var MarketPlace = artifacts.require("MarketPlace");
var Store = artifacts.require("Store");

contract('MarketPlace', function(accounts){
  let myContract;

  describe("Report for the Admin Side of the Contracts", function(){
      MarketPlace.deployed().then(function(instance) {
        myContract = instance;
      });

      it("The first account pays for the deployment. Hence, the balance of the first account must be less than 100 Ether", async function() {
          let balance = await web3.eth.getBalance(web3.eth.accounts[0]);
          assert.isBelow(web3.fromWei(balance, "ether").toNumber(), 100, "The balance = " + balance + ", of the first account is not less than 100.");
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

      it("An admin shall be able to create one or more store owners!", async function(){
        // Above we already added 2nd account in the Admin group. So, let's create a store owner using that.
        let storeOwnerCreated = await myContract.createStoreOwner(accounts[3], {from:accounts[1]});
        assert.include(storeOwnerCreated.receipt.status, "0x1", "Store owner should have been created by the Admin user!");

        storeOwnerCreated = await myContract.createStoreOwner(accounts[4], {from:accounts[1]});
        assert.include(storeOwnerCreated.receipt.status, "0x1", "Store owner should have been created by the Admin user!");
      });

      it("A store owner shall be able to create one or more stores!", async function(){
          let storeCreated = await myContract.createStoreFront("Store Acct3-1", "1st store of 4th account!", {from:accounts[3]});
          console.log(storeCreated);
          assert.include(storeCreated.receipt.status, "0x1", "Store should have been created by the store owner!");

          //storeCreated = await myContract.createStoreFront("Store Acct3-2", "2nd store of 4th account!", {from:accounts[3]});
          // assert.include(storeCreated.receipt.status, "0x1", "Store should have been created by the store owner!");

      });


    });
});
