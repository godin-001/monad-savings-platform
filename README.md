# Monad Savings Platform 💎

> **Fixed-yield DeFi savings vault built on Monad.** Deposit tokens, choose a lock period, earn predictable APY.

Built for the **Monad Hackathon 2026**.

---

## What is it?

Monad Savings lets users:

1. **Deposit** ERC20 tokens into a vault
2. **Lock** them for 30, 60, or 90 days
3. **Earn** fixed APY (5% / 12% / 20%)
4. **Claim** principal + yield at maturity

No impermanent loss. No complexity. Just savings.

---

## APY Tiers

| Lock Period | APY  |
|-------------|------|
| 30 days     | 5%   |
| 60 days     | 12%  |
| 90 days     | 20%  |

---

## Architecture

```
monad-savings-platform/
├── contracts/          # Foundry project (Solidity 0.8.24)
│   ├── src/
│   │   ├── SavingsVault.sol    # Main vault contract
│   │   └── MockERC20.sol       # Test token
│   ├── test/
│   │   └── SavingsVault.t.sol  # Foundry tests
│   └── script/
│       └── Deploy.s.sol        # Deploy script
│
├── frontend/           # Next.js 14 + wagmi + RainbowKit
│   ├── app/
│   │   ├── page.tsx            # Landing page
│   │   └── app/page.tsx        # Main dashboard
│   ├── components/
│   │   ├── DepositForm.tsx
│   │   ├── PositionsTable.tsx
│   │   └── StatsRow.tsx
│   └── lib/
│       ├── wagmi.ts            # Chain + wagmi config
│       └── contracts.ts        # ABIs + addresses
│
└── scripts/
    └── deploy.sh               # One-command deploy
```

---

## Quick Start

### 1. Contracts

```bash
cd contracts

# Install dependencies
forge install foundry-rs/forge-std --no-commit

# Build
forge build

# Test
forge test -v

# Deploy to Monad Testnet
export PRIVATE_KEY=0x...
forge script script/Deploy.s.sol \
  --rpc-url https://testnet-rpc.monad.xyz \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --legacy
```

### 2. Frontend

```bash
cd frontend

# Install
npm install

# Configure (add deployed contract addresses)
# Edit lib/contracts.ts → update CONTRACT_ADDRESSES

# Run dev server
npm run dev
```

Open http://localhost:3000

---

## Monad Testnet

- **Chain ID:** 10143
- **RPC:** https://testnet-rpc.monad.xyz
- **Explorer:** https://testnet.monadexplorer.com
- **Faucet:** https://faucet.monad.xyz

---

## Smart Contract: SavingsVault

### Key Functions

| Function | Description |
|----------|-------------|
| `deposit(token, amount, lockPeriodDays)` | Deposit tokens, lock for 30/60/90 days |
| `claim(positionIndex)` | Claim principal + yield after maturity |
| `calculateYield(amount, lockPeriodDays)` | View estimated yield |
| `getPositions(user)` | Get all positions for a user |
| `fundYieldPool(token, amount)` | Owner: add yield pool liquidity |

### Yield Formula

```
yield = (amount × apyBps × lockDays) / (365 × 10000)
```

---

## Team

Built with ❤️ for Monad Hackathon 2026.
