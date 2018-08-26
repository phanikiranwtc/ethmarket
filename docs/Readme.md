# market-place
Create an online marketplace that operates on the blockchain.
 
There are a list of stores on a central marketplace where shoppers can purchase goods posted by the store owners.
 
The central marketplace is managed by a group of administrators. Admins allow store owners to add stores to the marketplace. Store owners can manage their store’s inventory and funds. Shoppers can visit stores and purchase goods that are in stock using cryptocurrency.

Refer to the below URL for complete details about the requirement: https://github.com/wtcalok/ethmarket/blob/master/docs/Requirements.md

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
### Setting up Mocha
Run the following command to see the eth gas report
```
npm install --save-dev eth-gas-reporter
```

Refer to the truffle.js file for specific configuration.

### Testing
Go to the contract folder and run the following command to test the positive scenarios:
```
truffle test --network ganache ./test/1_HappyPath.js 
```

Also, run the following command, which specifies how to test the negative scenarios and exceptions:
```
truffle test --network ganache
```
## Usage of EIP20 tokens
As part of this project I have also used EIP20 tokens to help with the discount functionality in the market place. While the front-end doesn't talk anything explicitly about this, you may need to transfer tokens explicitly to the store owners to see the functionality in actions.

Refer to unit test case to see how to transfer tokens from SuperAdmin to Store Owners. 

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


