/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env["NEMONIC"];
var providerKey = process.env["ENDPOINT_KEY"];

module.exports = {
  networks : {
    development: {
      host:'127.0.0.1',
      port: 8545,
      network_id: "*"
      , gas : 8000000
      , gasPrice : 10000000000
    },
    ganache: {
      host:'127.0.0.1',
      port: 8545,
      network_id: "5777"
      , gas : 8000000
      , gasPrice : 10000000000
    },
    localrinkeby: {
      host: "localhost",
      port: 8545,
      network_id:4,
      from : "0xC2Af844Af193B8094860727608bFd6B7b3b70A31",
      gas : 4700000
    },
    rinkeby:{
      host: "localhost",
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/"+providerKey);
      },
      network_id:4
      , gas : 6700000
      , gasPrice : 10000000000
    }
  },
  mocha:{
    // https://www.npmjs.com/package/eth-gas-reporter
    reporter:'eth-gas-reporter',
    reporterOptions:{
      currency:'USD',
      gasPrice: 21,
      showTimeSpent:true
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
