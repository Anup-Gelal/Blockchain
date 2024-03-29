require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
//const SEPOLIA_URL = process.env.SEPOLIA_URL; // Replace with Sepolia testnet URL
const SEPOLIA_URL=process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Private key for  account

module.exports = {
  solidity: "0.8.8",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
