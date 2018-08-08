
contract('MarketPlace', async function(accounts){
    let myContract;
    let owner    = accounts[0];
    let nonOwner = accounts[1];
    let tryCatch = require("./exceptions.js").tryCatch;
    let errTypes = require("./exceptions.js").errTypes;

    describe("Basic Negative Scenarios that must be tested!", function() {
      before(async function() {
            myContract = await artifacts.require("../contracts/MarketPlace.sol").new();
        });

        it("The second account must not be added in the Admin group at the time of contract deployment.", function() {
            assert(myContract.checkAdmingAccess(accounts[1]), "The second account of the has been added to the Admin group by default!");
        });

        it("An admin, who is not a super admin, shall not be able to create another admin.", async function() {
            await myContract.createAdminUser(accounts[1], {from:accounts[0]});
            assert(myContract.checkAdmingAccess(accounts[1]), "The second account on the network must have been added into the Admin group!");

            await tryCatch(myContract.createAdminUser(accounts[3], {from:accounts[1]}), errTypes.revert);
        });

        it("A non-admin address shall not be allowed to create a store owner", async function() {
            await tryCatch(myContract.createStoreOwner(accounts[2], {from:accounts[3]}), errTypes.revert);
        });

        it("An address without store owner privilege shall not be able to create a store!", async function() {
            await tryCatch(myContract.createStoreFront(
                  "Test Store",
                  "This store should never get created!",
                  {from:accounts[3]}),
                errTypes.revert);
        });

    });

});
