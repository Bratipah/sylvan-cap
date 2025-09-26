import treeNftAbi from "@/abis/TreeNFT.json"
import tstTokenAbi from "@/abis/TSTToken.json"
import treasuryAbi from "@/abis/Treasury.json"

export const ONINO_TESTNET_CHAIN_ID = 211223

export const CONTRACTS = {
  TreeNFT: "0xfF6C1d445D8bB1d5dbbdCb05D6C5AFCEF5371423",
  TSTToken: "0x681D672c55886fA32effbc8C6eC185e6E89C45d7",
  Treasury: "0xF1C5d2Ef209149992A7604f7Cf9E60BAE971B378",
  MockUSDC: "0xF45aa7AE79a8E8C86728B4fe4aC945F388699Ade",
} as const

export const ABIS = {
  TreeNFT: treeNftAbi as const,
  TSTToken: tstTokenAbi as const,
  Treasury: treasuryAbi as const,
}


