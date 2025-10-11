export const runtime = "nodejs"
import { NextResponse } from "next/server"
import { ethers } from "ethers"
import { CONTRACTS } from "@/lib/contracts"

// Minimal ABI for MockUSDC mint(address,uint256)
const MockUsdcAbi = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const to: string | undefined = body?.address
    const amountStr: string | undefined = body?.amount // in USDC whole units, default 100

    if (!to || !ethers.isAddress(to)) {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 })
    }

    const rpcUrl = process.env.ONINO_RPC_URL
    const pk = process.env.DEPLOYER_PRIVATE_KEY
    if (!rpcUrl || !pk) {
      console.error("/api/faucet-usdc missing server env", { hasRpc: Boolean(rpcUrl), hasPk: Boolean(pk) })
      return NextResponse.json({ error: "Server not configured" }, { status: 500 })
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl)
    const wallet = new ethers.Wallet(pk.startsWith("0x") ? pk : `0x${pk}`, provider)

    // Default 100 USDC (6 decimals)
    const amount = ethers.parseUnits(amountStr || "100", 6)
    const contract = new ethers.Contract(CONTRACTS.MockUSDC, MockUsdcAbi as any, wallet)
    const tx = await contract.mint(to, amount)
    const receipt = await tx.wait()

    return NextResponse.json({ hash: tx.hash, status: receipt?.status ?? 0 })
  } catch (e: any) {
    console.error("/api/faucet-usdc error", e)
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}


