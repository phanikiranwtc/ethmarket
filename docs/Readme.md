# market-place
Create an online marketplace that operates on the blockchain.
 
There are a list of stores on a central marketplace where shoppers can purchase goods posted by the store owners.
 
The central marketplace is managed by a group of administrators. Admins allow store owners to add stores to the marketplace. Store owners can manage their store’s inventory and funds. Shoppers can visit stores and purchase goods that are in stock using cryptocurrency.

# Project Setup 

## Creating a project
> mkdir marketplace
> cd marketplace/

Use the following command to create the project:
> truffle init

You shall get something like this:
![Truffle Init](https://github.com/wtcalok/market-place/blob/master/Images/TruffleInit.png)

## Create contracts
Launch _atom_ editor from your project directory. 

Create the following files in the **contract** directory:
- MarketPlace.sol
- Store.sol

Also, create a directory for the library in the contract directory:
> mkdir library

Create the following file in that:
- Utils.sol

Refer to the source files for the exact code. 

## Compile and Deploy Contract
### Add network details in truffle.js file
```
module.exports = {
  networks : {
    ganache: {
      host:'127.0.0.1',
      port: 7545,
      network_id: "5777",
      gas : 4500000,
      gasPrice : 10000000000 // in Wei
    }
  }
};
```

Use the following command to deploy / redeploy the contract in the test environment:
```
truffle migrate --reset --compile-all --network ganache
```

## Unit Testing
1. Go to the contract folder

Run the following command:
```
truffle test --network ganache ./test/1_HappyPath.js 
```

# Using IPFS
## Getting Started
Follow the document on the below URL: https://ipfs.io/docs/getting-started/

# Angular Project
## Create a new project
In the marketplace directory, run the following command:
```
$ng new webapp
```

Install Angular dependencies:
```
npm install --save @angular/material @angular/cdk @angular/animations
npm install @angular/flex-layout --save
```


