"use client"

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ABIS, CONTRACTS, ONINO_TESTNET_CHAIN_ID } from "@/lib/contracts"
import { formatUnits, parseUnits } from "ethers"

export function DappPanel() {
  const { address, isConnected, chainId } = useAccount()
  const [mintUri, setMintUri] = useState("ipfs://tree-metadata-placeholder")
  const [distAmount, setDistAmount] = useState("")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [infoMsg, setInfoMsg] = useState<string>("")

  const { data: tstBalance } = useReadContract({
    address: CONTRACTS.TSTToken as `0x${string}`,
    abi: ABIS.TSTToken,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: ONINO_TESTNET_CHAIN_ID,
    query: { enabled: Boolean(address) },
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>Connected: {isConnected ? "Yes" : "No"}</div>
            <div>Address: {address || "-"}</div>
            <div>Chain ID: {chainId || "-"}</div>
            <div>
              TST Balance: {tstBalance !== undefined ? formatUnits(BigInt(tstBalance as any), 18) : "-"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mint Tree NFT</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input value={mintUri} onChange={(e) => setMintUri(e.target.value)} placeholder="tokenURI (ipfs://...)" />
            <Button
              disabled={!isConnected || isPending || isConfirming}
              onClick={() => {
                if (!address) return
                setErrorMsg("")
                try {
                  writeContract({
                    address: CONTRACTS.TreeNFT as `0x${string}`,
                    abi: ABIS.TreeNFT,
                    functionName: "mint",
                    args: [address, mintUri],
                  })
                } catch (e: any) {
                  setErrorMsg(e?.message || "Mint failed")
                }
              }}
            >
              {isPending || isConfirming ? "Minting..." : "Mint Tree NFT"}
            </Button>
            {hash && <div className="text-xs break-all">tx: {hash}</div>}
            {errorMsg && <div className="text-xs text-red-500 break-all">{errorMsg}</div>}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Treasury Test Distribution (MockUSDC)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground">
              This flow mints MockUSDC to your wallet, approves the Treasury, transfers to Treasury, then calls
              distribute(). For demonstration only.
            </div>
            <div className="flex gap-2 items-center">
              <Input value={distAmount} onChange={(e) => setDistAmount(e.target.value)} />
              <Button
                disabled={!isConnected || isPending || isConfirming}
                onClick={async () => {
                  if (!address) return
                  if (!distAmount || distAmount.trim() === "") {
                    setErrorMsg("Enter USDC amount")
                    return
                  }
                  const amount = BigInt(distAmount)
                  // 1) Mint MockUSDC to user (owner-only; on testnet our deployer is owner, so this will likely fail from other EOA)
                  // As a demo, we skip mint from UI; assume user holds MockUSDC or we transfer via script.
                  // 2) Transfer MockUSDC from user to Treasury requires approve + transferFrom, but Treasury pulls balance, so we'll send directly to Treasury.
                  // Simpler demo: user transfers MockUSDC to Treasury and then calls distribute() (requires user to have balance)
                  setErrorMsg("")
                  try {
                    await writeContract({
                      address: CONTRACTS.MockUSDC as `0x${string}`,
                      // Minimal ERC20 ABI for transfer
                      abi: [
                        { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }
                      ] as const,
                      functionName: "transfer",
                      args: [CONTRACTS.Treasury, amount],
                    })
                  } catch (e: any) {
                    setErrorMsg(e?.message || "USDC transfer failed")
                    return
                  }
                  try {
                    await writeContract({
                      address: CONTRACTS.Treasury as `0x${string}`,
                      abi: ABIS.Treasury,
                      functionName: "distribute",
                    })
                  } catch (e: any) {
                    setErrorMsg(e?.message || "Distribution failed")
                  }
                }}
              >
                {isPending || isConfirming ? "Processing..." : "Send & Distribute"}
              </Button>
            </div>
            {hash && <div className="text-xs break-all">tx: {hash}</div>}
            {infoMsg && <div className="text-xs text-green-600 break-all">{infoMsg}</div>}
            {errorMsg && <div className="text-xs text-red-500 break-all">{errorMsg}</div>}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>TST Faucet (Dev)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground">Mints 10 TST to the connected wallet (client-side demo).</div>
            <Button
              disabled={!isConnected || isPending || isConfirming}
              onClick={async () => {
                if (!address) return
                setErrorMsg("")
                try {
                  await writeContract({
                    address: CONTRACTS.TSTToken as `0x${string}`,
                    abi: ABIS.TSTToken,
                    functionName: "mint",
                    args: [address, parseUnits("10", 18)],
                  })
                } catch (e: any) {
                  setErrorMsg(e?.message || "TST mint failed")
                }
              }}
            >
              Mint 10 TST to Me
            </Button>
            
          </CardContent>
        </Card>
      </div>
    </section>
  )
}


