import treeNftAbi from "@/abis/TreeNFT.json"
import tstTokenAbi from "@/abis/TSTToken.json"
import treasuryAbi from "@/abis/Treasury.json"

export const ONINO_TESTNET_CHAIN_ID = 211223

export const CONTRACTS = {
  TreeNFT: "0x350eBe9e8030B5C2e70f831b82b92E44569736fF",
  TSTToken: "0xfd4b87006cAa562322050bC4b9cB61FA58E2B8DA",
  Treasury: "0x00F09a0896975e32CB5B4832A1913cb0F6f2841D",
  MockUSDC: "0x31058580845A8ed67F404fF5863b30f1b8CF7412",
} as const

export const ABIS = {
  TreeNFT: treeNftAbi as const,
  TSTToken: tstTokenAbi as const,
  Treasury: treasuryAbi as const,
}


