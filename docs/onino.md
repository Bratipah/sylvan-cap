# ONINO Testnet Setup (SylvanCap)

## Chain Parameters (Testnet)
- Chain ID: `211223`
- RPC URL: `https://rpctestnet.onino.io/`
- Explorer: `https://testnet.explorer.onino.io/`
- Native token: tONINO (for gas)

## Frontend env (.env.local)
```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=c0c1d40574c57d6e2b415701b5dc9ab8
NEXT_PUBLIC_ONINO_CHAIN_ID=211223
NEXT_PUBLIC_ONINO_RPC_URL=https://rpctestnet.onino.io/
NEXT_PUBLIC_ONINO_EXPLORER=https://testnet.explorer.onino.io/
NEXT_PUBLIC_ONINO_NAME=ONINO
NEXT_PUBLIC_ONINO_SYMBOL=ONI
NEXT_PUBLIC_ONINO_TESTNET=true
```

## Hardhat env (.env)
```
ONINO_RPC_URL=https://rpctestnet.onino.io/
ONINO_CHAIN_ID=211223
# WARNING: test-only key; rotate frequently and never use in production
DEPLOYER_PRIVATE_KEY=0x<your_private_key>
```

## Contracts
- `contracts/TreeNFT.sol` (ERC-721)
- `contracts/TSTToken.sol` (ERC-20)
- `contracts/Treasury.sol` (shares distribution)
- `contracts/MockUSDCToken.sol` (test-only)

## Commands
- Compile: `npm run compile:contracts`
- Deploy to ONINO testnet:
```
ONINO_RPC_URL=https://rpctestnet.onino.io/ \
ONINO_CHAIN_ID=211223 \
DEPLOYER_PRIVATE_KEY=0x<your_private_key> \
npm run deploy:onino
```

Deployment writes addresses to `deployed/onino-testnet.json`.

## Notes
- Ensure the deployer address has sufficient tONINO for gas.
- Replace `MockUSDCToken` with the real USDC-equivalent on ONINO when available.
- Rotate or revoke test keys after use.

