#!/bin/bash
# ─── Monad Savings Platform — Deploy Script ────────────────────────────────
# Deploys SavingsVault + MockERC20 to Monad Testnet
# Usage: bash scripts/deploy.sh

set -e

echo "🚀 Deploying Monad Savings Platform to Monad Testnet..."
echo ""

# Check required env vars
if [ -z "$PRIVATE_KEY" ]; then
  echo "❌ Error: PRIVATE_KEY env var not set"
  echo "   export PRIVATE_KEY=0x..."
  exit 1
fi

# Move to contracts directory
cd "$(dirname "$0")/../contracts"

# Install forge dependencies (if needed)
if [ ! -d "lib/forge-std" ]; then
  echo "📦 Installing forge-std..."
  forge install foundry-rs/forge-std --no-commit
fi

# Build
echo "🔨 Building contracts..."
forge build

# Run tests
echo "🧪 Running tests..."
forge test -v

# Deploy
echo ""
echo "📡 Deploying to Monad Testnet (chainId: 10143)..."
echo ""

forge script script/Deploy.s.sol \
  --rpc-url https://testnet-rpc.monad.xyz \
  --private-key "$PRIVATE_KEY" \
  --broadcast \
  --legacy \
  -vvv

echo ""
echo "✅ Deployment complete!"
echo "📋 Update CONTRACT_ADDRESSES in frontend/lib/contracts.ts with the deployed addresses."
