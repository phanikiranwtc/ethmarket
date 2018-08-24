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

module.exports = {
  networks : {
    development: {
      host:'127.0.0.1',
      port: 8545,
      network_id: "*"
    },
    ganache: {
      host:'127.0.0.1',
      port: 7545,
      network_id: "5777"
      , gas : 8000000
      , gasPrice : 10000000000
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id:4,
      gas : 4700000
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
  }
};
