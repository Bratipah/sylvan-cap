# Cohort Genesis Updates 

## Week 1 

#### Checklist
- [x] Set up Onino Testwallet
- [x] Complete Dev Profile form
- [x] Deploy Contract to Onino Testnet
- [x] Test contract interaction via rest api
- [x] Deploy your app's plan & Diagram

### Progress & Updates
- Metamask came in handy in setting up onino network through the custom network
     - As the chain grows I hope Onino will be added on chainlist.org to ease adding the network to most wallets
     - Find the connected metamask wallet with some Onino testnet tONI tokens from the Onino testnet
     - Deployed our first contract to Onino Testnet on this [contact address](https://testnet.explorer.onino.io/address/0xc2dFD5Cb92decB685787cEDC536046CBC251fe2A)

#### ![Onino TestWallet](https://github.com/Bratipah/sylvan-cap/blob/main/public/metamask-wallet.png)
#### ![Terminal Contract Deployment](https://github.com/Bratipah/sylvan-cap/blob/main/public/onino-contract-testnet.png)
#### ![Block Explorer Test Contract Deployment](https://github.com/Bratipah/sylvan-cap/blob/main/public/contract-onino-explorer2.png)
#### ![App's Plan](https://github.com/Bratipah/sylvan-cap/blob/main/public/Sylvan%20.png)
#### ![Apps Monetizing & Reward plan](https://github.com/Bratipah/sylvan-cap/blob/main/public/reward%20distribution.png)
#### 🧭 App User Journey

```mermaid
journey
  title SylvanCap dApp User Journey
  section Landing
    Open homepage: 5: User
    View product sections (How it works, Tech, Impact, FAQ): 3: User
  section Connect Wallet - ONINO only
    Click Connect in navbar: 4: User
    Approve wallet and/or switch to ONINO Testnet: 3: User
    Wallet connected (RainbowKit/Wagmi): 5: System
  section Wallet & Balances
    Display address and chainId in panel: 4: System
    Read TST balance via balanceOf: 4: System
  section On-chain Actions
    Mint Tree NFT: 4: User
    Treasury demo distribution: 3: User
    Dev faucet request: 2: User
  section Harvest, Burn, Revenue and Replanting
    Harvest event confirmed: 3: System
    Burn Tree NFT to retire harvested tree: 4: System
    Record timber sale revenue on chain: 4: System
    Distribute proceeds to TST holders: 4: System
    Payout tree owner revenue share: 4: System
    Allocate replanting fund: 3: System
    Mint replacement Tree NFTs: 3: System
    User monitors new cohort growth and portfolio: 3: User
  section Feedback & Errors
    Show tx pending/confirmed states and hash: 4: System
    Handle wrong network / insufficient MockUSDC gracefully: 3: System
```




## Week 2

#### Checklist
- [x] Provide Project plan to Onino
- [x] Attend Sub-Chain AMA
- [x] Provide progress report on github repo or screenshots or witten

### Progress & Updates

#### Frontend
- Wallet connection added using Wagmi + RainbowKit (Connect button in navbar).
- Removed demo "Investment Metrics" section.
- New `DappPanel` on the homepage with:
  - Connect/chain info and live `TST` balance of the connected wallet.
  - Mint Tree NFT (owner sets tokenURI; you can mint to your wallet).
  - Test Treasury distribution workflow (uses MockUSDC on testnet).
  - Dev Faucet: mint 10 `TST` to the connected wallet (server-side, owner-only).

  #### ![Frontend](https://github.com/Bratipah/sylvan-cap/blob/main/public/frontend1.png)

#### Smart Contracts (Solidity)
- `TreeNFT` (ERC-721), `TSTToken` (ERC-20, owner-mint), `Treasury` (payout shares), plus `MockUSDCToken` for testnet.
- Hardhat toolchain with deploy and utility scripts.

#### ![TreeNFT Contract](https://github.com/Bratipah/sylvan-cap/blob/main/public/tree-NFT.png)
#### ![USDC Stablecoin Contract](https://github.com/Bratipah/sylvan-cap/blob/main/public/USDC%20Stablecoin%20Contract.png) 

#### ONINO Testnet Deployment
- Chain: 211223 | RPC: `https://rpctestnet.onino.io/` | Explorer: `https://testnet.explorer.onino.io/`
- Addresses:
  - MockUSDC: `0xF45aa7AE79a8E8C86728B4fe4aC945F388699Ade`
  - TreeNFT: `0xfF6C1d445D8bB1d5dbbdCb05D6C5AFCEF5371423`
  - TSTToken: `0x681D672c55886fA32effbc8C6eC185e6E89C45d7`
  - Treasury: `0xF1C5d2Ef209149992A7604f7Cf9E60BAE971B378`
- Deployed addresses are saved to `deployed/onino-testnet.json` [0x842d803eB7d05D6Aa2DdB8c3Eb912e6d97ce31C4](https://testnet.explorer.onino.io/address/0x842d803eB7d05D6Aa2DdB8c3Eb912e6d97ce31C4?tab=index).

#### ![Sylvan Contract Deployed](https://github.com/Bratipah/sylvan-cap/blob/main/public/ContractDeployment.png)

#### Environment Setup

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

#### Commands
- Dev server: `npm run dev`
- Compile contracts: `npm run compile:contracts`
- Deploy to ONINO: `npm run deploy:onino`
- Check deployer balance: `npm run check:balance`
- Seed Treasury and distribute (testnet): `npm run seed:treasury`

#### API
- `POST /api/faucet` body `{ address, amount? }` — mints test `TST` to `address` from owner. Requires `ONINO_RPC_URL` and `DEPLOYER_PRIVATE_KEY` in server env.

#### Notes
- `TSTToken` is owner-mint only by design. Use the faucet (dev) to obtain test tokens.
- `MockUSDC` is for testnet only. Replace with the real payout token when ready.
- Hardhat currently warns on Node.js v18. Prefer Node.js v20 LTS for best compatibility.

  

## Week 3

#### Checklist
- [x] Finish prototype for Demo Day
- [x] Upload project to Github with basic README
- [x] Check-In submit Github repo + demo

### Progress & Updates

#### Prototype
- I was able to finish up both on frontend and backend and smart contracts deployed to Onino with the deployed link functioning properly
     - At first we had issues with our reown kit being able to detect Onino testnet network on connecting wallet but all was handled and it works perfectly
     - We had to abstract or find alternatives to some of the advanced strategies in smart contracts to be able to make it an MVP

#### ![MVP Prototype](https://github.com/Bratipah/sylvan-cap/blob/main/public/frontend1.png)

#### Project Upload
- The project has been uploaded to github succesfully with all the plans both technically and problem solution wise with a clear GTM strategy waiting to be actualized in the market with the waitlist
- find the project on our repo
- Find the Demo of our project in our links in the readme.md


## Demo Video

[Sylvan Demo](https://www.loom.com/share/e57eb39b637c4f4b952024fdce9a65de?sid=ed1b8e16-b649-4e4e-9c85-0a7d15343c56)
[Demo Continuation](https://www.loom.com/share/3fa5b3790f1f40adac9238b7dfeb7e14?sid=86fd82fa-1bd6-4f29-8010-38f557609ee8)

