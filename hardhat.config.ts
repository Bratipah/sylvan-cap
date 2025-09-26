const { config: dotenvConfig } = require("dotenv")
dotenvConfig()

require("@nomicfoundation/hardhat-ethers")

const ONINO_RPC_URL = process.env.ONINO_RPC_URL || ""
const ONINO_CHAIN_ID = process.env.ONINO_CHAIN_ID ? Number(process.env.ONINO_CHAIN_ID) : undefined
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || ""

/** @type {import('hardhat/config').HardhatUserConfig} */
const config = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    ...(ONINO_RPC_URL && ONINO_CHAIN_ID
      ? {
          onino: {
            url: ONINO_RPC_URL,
            chainId: ONINO_CHAIN_ID,
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
          },
        }
      : {}),
  },
}

module.exports = config



