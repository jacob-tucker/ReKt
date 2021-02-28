require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    "ropsten-infura": { //this is just used to deploy the smart contracts (it uses the first address of the mneomonic phrase)
      provider: () => new HDWalletProvider(process.env.TEST_MNEMONIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_KEY, 0),
      network_id: 3, // ropsten is always 3
      gas: 4700000,
      gasPrice: 100000000000
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}