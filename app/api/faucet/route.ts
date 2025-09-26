import { NextResponse } from "next/server"
import { ethers } from "ethers"
import TSTTokenAbi from "@/abis/TSTToken.json"
import { CONTRACTS } from "@/lib/contracts"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const to: string | undefined = body?.address
    const amountStr: string | undefined = body?.amount

    if (!to || !ethers.isAddress(to)) {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 })
    }

    const rpcUrl = process.env.ONINO_RPC_URL
    const pk = process.env.DEPLOYER_PRIVATE_KEY
    if (!rpcUrl || !pk) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 })
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl)
    const wallet = new ethers.Wallet(pk.startsWith("0x") ? pk : `0x${pk}`, provider)

    const amount = ethers.parseUnits(amountStr || "10", 18)
    const contract = new ethers.Contract(CONTRACTS.TSTToken, TSTTokenAbi as any, wallet)
    const tx = await contract.mint(to, amount)
    const receipt = await tx.wait()

    return NextResponse.json({ hash: tx.hash, status: receipt?.status ?? 0 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}


