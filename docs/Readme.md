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
Clone / Download the files in this repository: https://github.com/wtcalok/ethmarket.git

```
git clone https://github.com/wtcalok/ethmarket.git
```

## Compile and Deploy Contract
cd to the main project directory and run the following command to ensure that dependencies are installed
```
npm install
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

### Circuit Breaker
 emergencyFlag to true and run 1_HappyPath.js  test to see what happens when you use the circuit breaker pattern. 
 
 Reset this flag to false to test the scenarios in the regular case.

## Usage of EIP20 tokens
As part of this project I have also used EIP20 tokens to help with the discount functionality in the market place. While the front-end doesn't talk anything explicitly about this, you may need to transfer tokens explicitly to the store owners to see the functionality in actions.

Refer to unit test case to see how to transfer tokens from SuperAdmin to Store Owners. 

# Launching the DAPP
Go to the dapp directory and run the following command to install all the dependencies
```
npm install
```

Run the following command to run the http server:
```
ng serve
```
Open browser and open the APP by visiting the URL: http://localhost:4200/

## Login into the App
1. By default the first account in Ganache will be used as coinbase and this account is considered the SuperAdmin. Also, it gets added as Admin by default. So, you need to first copy this account address and use that for login. There is no password or security, so it will just take you inside the DAPP
2. After this you can add more Admin and Store owners
3. You can use the corresponding address to perform related actions
4. By default every account is a shopping account. 
5. Login with Metamask and choose localhost:8545 as the network. Make sure that your ganache runs on this port. 

# Avoiding Common Attacks
Steps taken to avoid common attacks are described in avoiding_common_attacks.md.
https://github.com/wtcalok/ethmarket/blob/master/docs/avoiding_common_attacks.md

# Design Patterns
The design patterns used in the project are described in design_pattern_descision.md.
https://github.com/wtcalok/ethmarket/blob/master/docs/design_pattern_desicions.md

# Deployed Contract on Rinkeby using Infura
Please visit below URL to see the deployed contract on Rinkeby
https://rinkeby.etherscan.io/address/0x257cceeaeca1f05eb66af7aa3571a322f2125fdd
Add following code on top of the truffle.js file
```
require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env["NEMONIC"];
var providerKey = process.env["ENDPOINT_KEY"];
```

You need to add the following network options in truffle.js file
```
rinkeby:{
      host: "localhost",
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/"+providerKey);
      },
      network_id:4
      , gas : 6700000
      , gasPrice : 10000000000
   }
```

Also, somehow the contract seems to be needing more gas, so please do use solc configuration as shown below:
```
solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
```

Also, create a .env file in the root folder of the project and add the following content in that file:
```
NEMONIC="orphan blur library flame donkey damp destroy shallow kind float warrior badge"
ENDPOINT_KEY="9f110b8c7a7a41febca9c060f2d90e53"
```

You may like to add your own nemonic and Infura endpoint key to avoid surprizes.  

For more details about INFURA deployment, please visit below URL:
https://truffleframework.com/tutorials/using-infura-custom-provider

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

## Nonce related issue
Sometimes Metamask gives nonce related issue. In such case, please clean up Metamask by following the below steps
1. Press the Metamask icon
2. reset Metamask by going into Settings > Reset Account
3. Logout 
4. Login again

If needed, do delete existing accounts and import the accounts corresponding to your Ganache. 
