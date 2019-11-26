const path = require("path");

const ethwallet = require('ethereumjs-wallet');
const HDWalletProvider = require("truffle-hdwallet-provider");

const wallet = ethwallet.fromPrivateKey(Buffer.from(process.env.ETH_DEPLOYER_KEY_IPFS, 'hex'));
const address = "0x" + wallet.getAddress().toString("hex");
const provider = new HDWalletProvider(process.env.ETH_DEPLOYER_KEY_IPFS, process.env.ETH_NODE_URL);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
     host: "127.0.0.1",
     port: 8545,
     network_id: 15,
     gas: 7000000,
    },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    rinkeby: {
      provider: provider,
      network_id: 4,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

    mainnet: {
      provider: provider,
      network_id: 1,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {
    solc: {
      version: "0.5.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
