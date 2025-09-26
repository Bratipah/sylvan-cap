const { ethers } = require("hardhat")

const ADDRS = {
  MockUSDC: "0xF45aa7AE79a8E8C86728B4fe4aC945F388699Ade",
  Treasury: "0xF1C5d2Ef209149992A7604f7Cf9E60BAE971B378",
}

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deployer:", deployer.address)

  const usdc = await ethers.getContractAt(
    [
      { inputs: [{ internalType: "address", name: "to", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }], name: "mint", outputs: [], stateMutability: "nonpayable", type: "function" },
      { inputs: [{ internalType: "address", name: "to", type: "address" }, { internalType: "uint256", name: "amount", type: "uint256" }], name: "transfer", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" },
      { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "balanceOf", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
      { inputs: [], name: "decimals", outputs: [{ internalType: "uint8", name: "", type: "uint8" }], stateMutability: "view", type: "function" },
    ],
    ADDRS.MockUSDC,
  )

  const decimals = await usdc.decimals()
  const amount = ethers.parseUnits("1000", decimals) // 1,000 USDC

  console.log("Minting", amount.toString(), "to deployer...")
  await (await usdc.mint(deployer.address, amount)).wait()

  console.log("Transferring to Treasury...")
  await (await usdc.transfer(ADDRS.Treasury, amount)).wait()

  const treasury = await ethers.getContractAt(
    [
      { inputs: [], name: "distribute", outputs: [], stateMutability: "nonpayable", type: "function" },
    ],
    ADDRS.Treasury,
  )

  console.log("Calling distribute()...")
  await (await treasury.distribute()).wait()

  console.log("Done.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


