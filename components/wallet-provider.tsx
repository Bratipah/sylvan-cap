"use client"

import React from "react"
import {
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { WagmiProvider } from "wagmi"
import { mainnet, polygon, arbitrum, base, optimism } from "wagmi/chains"
import type { Chain } from "viem/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const oninoChain = (() => {
  const idRaw = process.env.NEXT_PUBLIC_ONINO_CHAIN_ID
  const rpcUrl = process.env.NEXT_PUBLIC_ONINO_RPC_URL

  if (!idRaw || !rpcUrl) return undefined

  const id = Number(idRaw)
  if (!Number.isFinite(id) || id <= 0) return undefined

  const name = process.env.NEXT_PUBLIC_ONINO_NAME || "ONINO"
  const symbol = process.env.NEXT_PUBLIC_ONINO_SYMBOL || "ONI"
  const explorer = process.env.NEXT_PUBLIC_ONINO_EXPLORER
  const isTestnet = (process.env.NEXT_PUBLIC_ONINO_TESTNET || "false").toLowerCase() === "true"

  const chain: Chain = {
    id,
    name,
    nativeCurrency: { name: symbol, symbol, decimals: 18 },
    rpcUrls: {
      default: { http: [rpcUrl] },
      public: { http: [rpcUrl] },
    },
    blockExplorers: explorer
      ? { default: { name: "Explorer", url: explorer } }
      : undefined,
    testnet: isTestnet,
  }

  return chain
})()

const chains = [mainnet, polygon, arbitrum, base, optimism, ...(oninoChain ? [oninoChain] : [])]

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
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}



