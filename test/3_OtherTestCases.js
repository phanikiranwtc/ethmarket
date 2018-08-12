/**
$ truffle console --network ganache
truffle(ganache)> migrate --compile-all --reset

truffle(ganache)> MarketPlace.deployed().then(function(instance){app=instance;});
undefined

truffle(ganache)> var storeEvents = app.NewStore({}, {fromBlock:0, toBlock:'latest'}).watch(function(error, event){console.log(event);})
undefined

app.createAdminUser(web3.eth.accounts[1], {from:web3.eth.accounts[0]});

app.createStoreOwner(web3.eth.accounts[3], {from:web3.eth.accounts[1]});

app.createStoreFront("Store Acct3-1", "1st store of 4th account!", {from:web3.eth.accounts[3]});

*/
