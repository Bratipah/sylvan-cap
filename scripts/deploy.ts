import { ethers } from "hardhat"

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deployer:", deployer.address)

  // Mock USDC for testnet distribution flows
  const MockUSDC = await ethers.getContractFactory("MockUSDCToken")
  const usdc = await MockUSDC.deploy()
  await usdc.waitForDeployment()
  console.log("MockUSDC:", await usdc.getAddress())

  const TreeNFT = await ethers.getContractFactory("TreeNFT")
  const tree = await TreeNFT.deploy()
  await tree.waitForDeployment()
  console.log("TreeNFT:", await tree.getAddress())

  const TSTToken = await ethers.getContractFactory("TSTToken")
  const tst = await TSTToken.deploy()
  await tst.waitForDeployment()
  console.log("TSTToken:", await tst.getAddress())

  const payoutToken = await usdc.getAddress()
  const dummy = deployer.address

  const Treasury = await ethers.getContractFactory("Treasury")
  const treasury = await Treasury.deploy(
    payoutToken,
    dummy,
    dummy,
    dummy,
    dummy,
    { toTSTHoldersBps: 7000, toForestMgmtBps: 2000, toOpsBps: 700, toInsuranceBps: 300 },
  )
  await treasury.waitForDeployment()
  console.log("Treasury:", await treasury.getAddress())
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


