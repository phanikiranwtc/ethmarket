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

## Login into the App
1. By default the first account in Ganache will be used as coinbase and this account is considered the SuperAdmin. Also, it gets added as Admin by default. So, you need to first copy this account address and use that for login. There is no password or security, so it will just take you inside the DAPP
2. After this you can add more Admin and Store owners
3. You can use the corresponding address to perform related actions
4. By default every account is a shopping account. 

# Troubleshooting
You may need to run the following command in the main project directory as well as the dapp directory:
```
npm install
```
## Block Gas Limit
Increase the block gas limit in Ganache. For example, I have set a value of 9998888890.

Also, refer to the network config options in the truffle.js file and adjust gas limit if needed.

## On Windows machine
On windows machine you may need to copy the truffle.js file into truffle-config.js file. 

## Real Ether Transfer through DAPP
During the purchase of the product, the ether transfer from shopper's account to the store contract's account work alright. However, when I am trying to do the same from the DAPP, it is still causing the issue. Comment out the transfer (myAddress.transfer( finalAmountToBePaid );) call in buyProductFromStore method to test the rest of the functionality. 
