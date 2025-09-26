"use client"

import React from "react"
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { WagmiProvider } from "wagmi"
import type { Chain } from "viem/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const oninoChain = (() => {
  const idRaw = process.env.NEXT_PUBLIC_ONINO_CHAIN_ID
  const rpcUrl = process.env.NEXT_PUBLIC_ONINO_RPC_URL

  // Fallback to known ONINO testnet params if env vars are missing
  const id = Number(idRaw ?? 211223)
  const resolvedRpc = rpcUrl ?? "https://rpctestnet.onino.io/"
  const name = process.env.NEXT_PUBLIC_ONINO_NAME || "ONINO Testnet"
  const symbol = process.env.NEXT_PUBLIC_ONINO_SYMBOL || "ONI"
  const explorer = process.env.NEXT_PUBLIC_ONINO_EXPLORER || "https://testnet.explorer.onino.io/"
  const isTestnet = true

  const chain: Chain = {
    id,
    name,
    nativeCurrency: { name: symbol, symbol, decimals: 18 },
    rpcUrls: {
      default: { http: [resolvedRpc] },
      public: { http: [resolvedRpc] },
    },
    blockExplorers: { default: { name: "Explorer", url: explorer } },
    testnet: isTestnet,
  }

  return chain
})()

// Enforce ONINO-only: expose only the ONINO chain
const chains = oninoChain ? [oninoChain] : []

const wagmiConfig = getDefaultConfig({
  appName: "SylvanCap",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
  chains,
  ssr: true,
})

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={oninoChain?.id}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}



