const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deployer:", deployer.address)
  const balanceWei = await deployer.provider.getBalance(deployer.address)
  console.log("Balance (wei):", balanceWei.toString())
  console.log("Balance (tONINO):", ethers.formatEther(balanceWei))
  const feeData = await deployer.provider.getFeeData()
  console.log("Fee data:", {
    gasPrice: feeData.gasPrice ? feeData.gasPrice.toString() : null,
    maxFeePerGas: feeData.maxFeePerGas ? feeData.maxFeePerGas.toString() : null,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? feeData.maxPriorityFeePerGas.toString() : null,
  })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})



