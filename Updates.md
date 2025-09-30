# Cohort Genesis Updates 

## Week 1 

## Week 2

### Frontend
- Wallet connection added using Wagmi + RainbowKit (Connect button in navbar).
- Removed demo "Investment Metrics" section.
- New `DappPanel` on the homepage with:
  - Connect/chain info and live `TST` balance of the connected wallet.
  - Mint Tree NFT (owner sets tokenURI; you can mint to your wallet).
  - Test Treasury distribution workflow (uses MockUSDC on testnet).
  - Dev Faucet: mint 10 `TST` to the connected wallet (server-side, owner-only).

### Smart Contracts (Solidity)
- `TreeNFT` (ERC-721), `TSTToken` (ERC-20, owner-mint), `Treasury` (payout shares), plus `MockUSDCToken` for testnet.
- Hardhat toolchain with deploy and utility scripts.

### ONINO Testnet Deployment
- Chain: 211223 | RPC: `https://rpctestnet.onino.io/` | Explorer: `https://testnet.explorer.onino.io/`
- Addresses:
  - MockUSDC: `0xF45aa7AE79a8E8C86728B4fe4aC945F388699Ade`
  - TreeNFT: `0xfF6C1d445D8bB1d5dbbdCb05D6C5AFCEF5371423`
  - TSTToken: `0x681D672c55886fA32effbc8C6eC185e6E89C45d7`
  - Treasury: `0xF1C5d2Ef209149992A7604f7Cf9E60BAE971B378`
- Deployed addresses are saved to `deployed/onino-testnet.json` [0x842d803eB7d05D6Aa2DdB8c3Eb912e6d97ce31C4](https://testnet.explorer.onino.io/address/0x842d803eB7d05D6Aa2DdB8c3Eb912e6d97ce31C4?tab=index).

### Environment Setup

Create `.env.local` (frontend):

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<your_wc_project_id>
NEXT_PUBLIC_ONINO_CHAIN_ID=211223
NEXT_PUBLIC_ONINO_RPC_URL=https://rpctestnet.onino.io/
NEXT_PUBLIC_ONINO_EXPLORER=https://testnet.explorer.onino.io/
NEXT_PUBLIC_ONINO_NAME=ONINO
NEXT_PUBLIC_ONINO_SYMBOL=ONI
NEXT_PUBLIC_ONINO_TESTNET=true
```

Create `.env` (server/deploy):

```
ONINO_RPC_URL=https://rpctestnet.onino.io/
ONINO_CHAIN_ID=211223
DEPLOYER_PRIVATE_KEY=0x<funded_testnet_private_key>
```

### Commands
- Dev server: `npm run dev`
- Compile contracts: `npm run compile:contracts`
- Deploy to ONINO: `npm run deploy:onino`
- Check deployer balance: `npm run check:balance`
- Seed Treasury and distribute (testnet): `npm run seed:treasury`

### API
- `POST /api/faucet` body `{ address, amount? }` — mints test `TST` to `address` from owner. Requires `ONINO_RPC_URL` and `DEPLOYER_PRIVATE_KEY` in server env.

### Notes
- `TSTToken` is owner-mint only by design. Use the faucet (dev) to obtain test tokens.
- `MockUSDC` is for testnet only. Replace with the real payout token when ready.
- Hardhat currently warns on Node.js v18. Prefer Node.js v20 LTS for best compatibility.
