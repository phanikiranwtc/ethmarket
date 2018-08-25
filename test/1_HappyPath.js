var MarketPlace = artifacts.require("MarketPlace");
var Store = artifacts.require("Store");

contract('MarketPlace', function(accounts){
  let tryCatch = require("./exceptions.js").tryCatch;
  let errTypes = require("./exceptions.js").errTypes;
  let myContract;
  let currentStore;
  let currentProductId = -1;

  MarketPlace.deployed().then(function(instance) {
    myContract = instance;
  });

  describe("1. Test Report for the Admin Side of the Contracts", function(){

      it("The first account pays for the deployment. Hence, the balance of the first account must be less than 100 Ether", async function() {
          let balance = await web3.eth.getBalance(web3.eth.accounts[0]);
          assert.isBelow(web3.fromWei(balance, "ether").toNumber(), 100, "The balance = " + balance + ", of the first account is not less than 100.");
        });

      it("The first account shall be added as an Admin by default!", async function(){
        let accessFlags = await myContract.checkAccess(accounts[0]);
        assert(accessFlags[1], "The first account of the network must have been an Admin by default!");
      });

      it("The Super Admin, i.e. the first account, shall be able to add one or more admin user!", async function(){
            await myContract.createAdminUser(accounts[1], {from:accounts[0]});
            let accessFlags = await myContract.checkAccess(accounts[1]);
            assert(accessFlags[1], "The createAdminUser invocation did not succeed!");
        });

      it("An admin shall be able to create one or more store owners!", async function(){
        // Above we already added 2nd account in the Admin group. So, let's create a store owner using that.
        let storeOwnerCreated = await myContract.createStoreOwner(accounts[3], {from:accounts[1]});
        // console.log(storeOwnerCreated);
        assert.include(storeOwnerCreated.receipt.status, "1", "Store owner should have been created by the Admin user!");

        storeOwnerCreated = await myContract.createStoreOwner(accounts[4], {from:accounts[1]});
        assert.include(storeOwnerCreated.receipt.status, "1", "Store owner should have been created by the Admin user!");

        storeOwnerCreated = await myContract.createStoreOwner(accounts[5], {from:accounts[1]});
        assert.include(storeOwnerCreated.receipt.status, "1", "Store owner should have been created by the Admin user!");
      });

      it("The super administrator shall be able to transfer tokens to the store owners!", async function() {
        let tokenReceipt = await myContract.allocateNewTokens(accounts[3], 1000000, {from:accounts[0]});
        assert.include(tokenReceipt.receipt.status, "1", "The token allocation failed!");

        tokenReceipt = await myContract.allocateNewTokens(accounts[4], 1000000, {from:accounts[0]});
        assert.include(tokenReceipt.receipt.status, "1", "The token allocation failed!");
      });

      it("The super administrator shall be able to transfer tokens to the store owners!", async function() {
        let tokenCount = await myContract.getTokenBalance(accounts[3]);
        let tokenReceipt = await myContract.allocateNewTokens(accounts[3], 500000, {from:accounts[0]});
        let increasedTokenCount = await myContract.getTokenBalance(accounts[3]);
        assert.equal(increasedTokenCount.toNumber(), tokenCount.toNumber() + 500000, "The token balance did not increase!");
      });

  });

  describe("2. Test Report for the Store Side of the Contract", function(){

    it("A store owner shall be able to create one or more stores!", async function(){
        let storeCreated = await myContract.createStoreFront("Store Acct3-1", "1st store of 4th account!", {from:accounts[3]});
        assert.include(storeCreated.receipt.status, "1", "Store should have been created by the store owner!");

        storeCreated = await myContract.createStoreFront("Store Acct3-2", "2nd store of 4th account!", {from:accounts[3]});
        assert.include(storeCreated.receipt.status, "1", "Store should have been created by the store owner!");
    });

    it("After successful creation of a store, a new store event shall be fired!", async function(){
        let storeCreatedTx = await myContract.createStoreFront("Store Acct3-1", "1st store of 4th account!", {from:accounts[3]});
        assert.equal(storeCreatedTx.receipt.logs.length, 1, "Store creation function should have created an event as well!");
    });

    it("Get all the stores for a given store owner!", async function() {
        let stores = await myContract.getStores(accounts[3]);
        assert(stores.length == 3, "Two stores were expected!");
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

      assert.include(productReceipt.receipt.status, "1", "The success code must be 1!");
    });

    it("For a given store owner, you shall be able to retrieve all of their products!", async function(){
      let stores = await myContract.getStores(accounts[3]);

      // Create products for the first accounts
      currentStore = Store.at(stores[0]);

      let productReceipt = await currentStore.addProductToTheStore(
                              "iPhone X",
                              "Latest version of iPhone",
                              1000000000000000,
                              3000,
                              {from:accounts[3]});

      let products = await currentStore.getProducts(false);
      productIdForDetails = products[0].toNumber();
      assert.isAtLeast(products.length, 2, "By this time, this product must have at least two products!");
    });

    it ("For a given Product ID, it shall return the corresponding product details", async function(){
      let productDetails = await currentStore.getProductDetails(productIdForDetails);
      assert.include(productDetails[1], "Samsung", "The product description does not match!");
    });

  });

  describe("4. Test Report for the Shoppers!", function(){

    it("A shopper shall be able to access all the stores available in the market place", async function() {
      // Add one more store for a different store owner than the earlier owners e.g.
      let storeCreated = await myContract.createStoreFront("Store Acct4-1", "1st store of 5th account!", {from:accounts[4]});
      assert.include(storeCreated.receipt.status, "1", "Store should have been created by the store owner!");

      let stores = await myContract.getStores("");
      assert.isAtLeast(stores.length, 4, "By now at least 4-stores should be in the market place.");
      assert.notInclude(stores[3], "0x000000000", "The address of the stores doesn't seem to be correct.");

      currentStore = Store.at(stores[3]);
    });


    it("For a given store id, the shopper shall be able to see the corresponding store details!", async function(){
        let storeDetails = await currentStore.getStoreDetails();
        assert.include(storeDetails[1], "Acct4", "This store is expected to be associated with account[4]!");
    });

    it("The shoppers shall be able to see all the products of a given store", async function() {
      let productReceipt = await currentStore.addProductToTheStore(
                              "iPhone X",
                              "Latest version of iPhone",
                              500000000000000,
                              300,
                              {from:accounts[4]});

      productReceipt = await currentStore.addProductToTheStore(
                              "iPhone 6 Plus",
                              "The previous best version of iPhone",
                              500000000000000,
                              300,
                              {from:accounts[4]});

      // By now we should have 3-products in the market Place
      let productIds = await currentStore.getProducts(false);

      assert.isAtLeast(productIds.length, 2, "At this stage, there must be at least two products associated with this store!");

      currentProductId = productIds[0].toNumber();
    });

    it("The shopper shall be able to see the product details of a given product", async function(){
        let productDetais = await currentStore.getProductDetails(currentProductId);
        assert.include(productDetais[0], "iPhone X", "The first product should be iPhone X");
    });

    it("The shopper shall be able to buy a certain quantity of the product!", async function() {
      /*
        currentStore.PurchaseOfProduct({}, {fromBlock: 0, toBlock: 'latest' }).watch ( (err, response) => {
          if (err != null && !err.empty()){
            console.log(err);
          } else {
            console.log(response);
          }
        });
     */

        let productDetails = await currentStore.getProductDetails(currentProductId);
        await currentStore.buyProductFromStore(currentProductId, 10, {from:accounts[7], gas: 2200000, value: 10 * productDetails[2]});
        let updatedProductDetails = await currentStore.getProductDetails(currentProductId);

        assert.isAtMost(updatedProductDetails[3].toNumber(), productDetails[3]-5, "After the successful purchase, the quantity of the product shall reduce by 5.");
    });

    it("The shopper shall be able to earn tokens as per the discount percentage configured for a given product", async function(){
      let productDetails = await currentStore.getProductDetails(currentProductId);
      await currentStore.buyProductFromStore(currentProductId, 20, {from:accounts[8], gas: 2200000, value: 20 * productDetails[2]});
      let tokenBalance = await myContract.getTokenBalance(accounts[8]);
      let tokenPriceInWei = 10000000000000;
      let expectedNewTokens = 20 * productDetails[2] * .1 / tokenPriceInWei;

      assert.isAtLeast(tokenBalance.toNumber(), expectedNewTokens, "The number of tokens must have been greater than zero");
    });

    it("A shopper shall be able to buy even when the store owner does not have enough token balances!", async function() {
      // Add one more store for a different store owner than the earlier owners e.g.
      let storeCreated = await myContract.createStoreFront("Store Acct4-1", "1st store of 5th account!", {from:accounts[5]});
      assert.include(storeCreated.receipt.status, "1", "Store should have been created by the store owner!");

      let stores = await myContract.getStores(accounts[5]);
      assert.isAtLeast(stores.length, 1, "By now at least 1-stores should be in the market place for this account.");

      let acct5Store = Store.at(stores[0]);
      await acct5Store.addProductToTheStore(
                              "iPhone 6 Plus",
                              "The previous best version of iPhone",
                              500000000000000,
                              300,
                              {from:accounts[5]});

      let products = await acct5Store.getProducts(1);

      let productDetails = await acct5Store.getProductDetails(products[0].toNumber());
      await acct5Store.buyProductFromStore(currentProductId, 20, {from:accounts[8], gas: 2200000, value: 20 * productDetails[2]});
      let updatedProductDetails = await acct5Store.getProductDetails(products[0].toNumber());

      assert.equal(updatedProductDetails[3].toNumber(), productDetails[3].toNumber()-20, "After the successful purchase, the quantity of the product shall reduce by 20.");

    });

    it("The Owner of the store shall be able to withdraw fund from the store!", async function() {
      let currentBalance = await currentStore.getBalanceOfStore();
      await currentStore.withdrawFund( 500000000000000, {from:accounts[4]});

      let updatedBalance = await currentStore.getBalanceOfStore();
      assert.equal(currentBalance - 500000000000000, updatedBalance, "The updated balance is not correct!");
    });

    it("The Owner of the store shall not be able to withdraw zero amount from the store!", async function() {

      await tryCatch(currentStore.withdrawFund(
            0,
            {from:accounts[4]}),
          errTypes.revert);
    });

  });

  describe("5. Test Report for Managing the store by the store owner!", function() {
    it("The store owner shall be able to update the details of the product", async function() {
      let productDetails = await currentStore.getProductDetails(currentProductId);

      await currentStore.updateProduct(
            currentProductId,
            productDetails[0],
            productDetails[1],
            500000000000000,
            600,
            { from:accounts[4], gas: 2200000 });

      productDetails = await currentStore.getProductDetails(currentProductId);
      assert.equal(productDetails[3].toNumber(), 600, "The quantity of the updated product details is wrong.");
    });

    it("The store owner shall be able to remove a product from a given store!", async function(){
      await currentStore.removeProduct(currentProductId, {from:accounts[4], gas: 2200000});
      let productDetails = await currentStore.getProductDetails(currentProductId);
      assert.equal(productDetails[4].toNumber(), 1, "The product must have been in REMOVED status!");
    });

    it("The store owner shall be able to reactivate a removed product of a given store!", async function(){
      await currentStore.reActivateProduct(currentProductId, {from:accounts[4], gas: 2200000});
      let productDetails = await currentStore.getProductDetails(currentProductId);
      assert.equal(productDetails[4].toNumber(), 0, "The product must have been in ACTIVE status!");
    });

  })

  describe("6. The remaining test cases of the market place!", function(){

    it("The super store owner account need not be an Admin or Super Admin!", async function(){
      let accessFlags = await myContract.checkAccess(accounts[4]);
      assert(!accessFlags[1], "This store owner should not have an admin access!");
    });

    it("We shall be able to retrieve all the admins in the network!", async function(){
      let adminUsers = await myContract.getAdminUsers();
      assert.equal(adminUsers.length, 2, "This store owner should not have an admin access!");
    });

  });

});
