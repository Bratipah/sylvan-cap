const { ethers } = require("hardhat")
const fs = require("fs/promises")
const path = require("path")

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deployer:", deployer.address)

  const MockUSDC = await ethers.getContractFactory("MockUSDCToken")
  const usdc = await MockUSDC.deploy()
  await usdc.waitForDeployment()
  const usdcAddress = await usdc.getAddress()
  console.log("MockUSDC:", usdcAddress)

  const TreeNFT = await ethers.getContractFactory("TreeNFT")
  const tree = await TreeNFT.deploy()
  await tree.waitForDeployment()
  const treeAddress = await tree.getAddress()
  console.log("TreeNFT:", treeAddress)

  const TSTToken = await ethers.getContractFactory("TSTToken")
  const tst = await TSTToken.deploy()
  await tst.waitForDeployment()
  const tstAddress = await tst.getAddress()
  console.log("TSTToken:", tstAddress)

  const payoutToken = usdcAddress
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
  const treasuryAddress = await treasury.getAddress()
  console.log("Treasury:", treasuryAddress)

  const outDir = path.join(process.cwd(), "deployed")
  await fs.mkdir(outDir, { recursive: true })
  const outFile = path.join(outDir, "onino-testnet.json")
  const data = {
    network: "onino-testnet",
    chainId: process.env.ONINO_CHAIN_ID || null,
    deployer: deployer.address,
    contracts: {
      MockUSDC: usdcAddress,
      TreeNFT: treeAddress,
      TSTToken: tstAddress,
      Treasury: treasuryAddress,
    },
    timestamp: new Date().toISOString(),
  }
  await fs.writeFile(outFile, JSON.stringify(data, null, 2))
  console.log("Saved deployment addresses to:", outFile)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})



