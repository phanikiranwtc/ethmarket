var MarketPlace = artifacts.require("MarketPlace");
var Store = artifacts.require("Store");

contract('MarketPlace', function(accounts){
  let myContract;
  let currentStore;

  MarketPlace.deployed().then(function(instance) {
    myContract = instance;
  });

  describe("1. Test Report for the Admin Side of the Contracts", function(){

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

  });

  describe("2. Test Report for the Store Side of the Contract", function(){

    it("A store owner shall be able to create one or more stores!", async function(){
        let storeCreated = await myContract.createStoreFront("Store Acct3-1", "1st store of 4th account!", {from:accounts[3]});
        assert.include(storeCreated.receipt.status, "0x1", "Store should have been created by the store owner!");

        storeCreated = await myContract.createStoreFront("Store Acct3-2", "2nd store of 4th account!", {from:accounts[3]});
        assert.include(storeCreated.receipt.status, "0x1", "Store should have been created by the store owner!");
    });

    it("After successful creation of a store, a new store event shall be fired!", async function(){
        let storeCreatedTx = await myContract.createStoreFront("Store Acct3-1", "1st store of 4th account!", {from:accounts[3]});
        assert.equal(storeCreatedTx.receipt.logs.length, 1, "Store creation function should have created an event as well!");
    });

    it("Get all the stores for a given store owner!", async function() {
        let stores = await myContract.getStores(accounts[3]);
        assert(stores.length == 3, "Two stores were expected!");
        // console.log(stores);
    });
  });

  describe("3. Test Report for the Products of a given store!", function(){
    let productIdForDetails;

    it("A store owner shall be able to create a product in a store!", async function(){
      let stores = await myContract.getStores(accounts[3]);

      // Create products for the first accounts
      currentStore = Store.at(stores[0]);
      let productReceipt = await currentStore.addProductToTheStore(
                              "Galaxy Note9",
                              "One of the latest Samsung phones",
                              10000000000000000,
                              3000,
                              {from:accounts[3]});

      assert.equal(productReceipt.receipt.status, "0x1", "The success code must be 1!");
    });

    it("For a given store owner, you shall be able to retrieve all of thheir products!", async function(){
      let stores = await myContract.getStores(accounts[3]);

      // Create products for the first accounts
      currentStore = Store.at(stores[0]);

      let productReceipt = await currentStore.addProductToTheStore(
                              "iPhone X",
                              "Latest version of iPhone",
                              1000000000000000,
                              3000,
                              {from:accounts[3]});

      let products = await currentStore.getProducts();
      productIdForDetails = products[0].toNumber();
      assert.isAtLeast(products.length, 2, "By this time, this product must have at least two products!");
    });

    it ("For a given Product ID, it shall return the corresponding product details", async function(){
      let productDetails = await currentStore.getProductDetails(productIdForDetails);
      console.log(productDetails);
      assert.include(productDetails[1], "Samsung", "The product description does not match!");
    });

  });


});
