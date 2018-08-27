# market-place
Create an online marketplace that operates on the blockchain.
 
There are a list of stores on a central marketplace where shoppers can purchase goods posted by the store owners.
 
The central marketplace is managed by a group of administrators. Admins allow store owners to add stores to the marketplace. Store owners can manage their store’s inventory and funds. Shoppers can visit stores and purchase goods that are in stock using cryptocurrency.

Refer to the below URL for complete details about the requirement: https://github.com/wtcalok/ethmarket/blob/master/docs/Requirements.md

# Project Setup 

## Creating a project
```
$ mkdir marketplace
$ cd marketplace/
```
Clone / Download the files in this repository:
https://github.com/wtcalok/ethmarket.git

## Compile and Deploy Contract
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

# Launching the DAPP
Go to the dapp directory and run the following command
```
ng serve
```
Open browser and open the APP by visiting the URL: http://localhost:4200/

# Troubleshooting
You may need to run the following command in the main project directory as well as the dapp directory:
```
npm install
```



