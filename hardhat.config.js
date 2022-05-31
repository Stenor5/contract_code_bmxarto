require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const fs = require('fs');
const PRIVATE_KEY = fs.readFileSync(".secret").toString().trim() || "01234567890123456789";
const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";
const { ETHERSCAN_API_KEY_BSC, ROPSTEN_API_KEY } = process.env;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: "mainnet",
  networks: {
    mainnet: {
      url: `https://bsc-dataseed1.ninicoin.io`,
      accounts: [PRIVATE_KEY],
      chainId: 56,
      saveDeployments: true,
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${infuraId}`,
      accounts: [PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
      saveDeployments: true,
    },
    testnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [PRIVATE_KEY],
      chainId: 97,
      saveDeployments: true,
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY_BSC
  }
};

