// ─── Contract Addresses ───────────────────────────────────────────────────────
// Update after deploying to Monad Testnet

export const CONTRACT_ADDRESSES = {
  savingsVault: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  mockUSDC: "0x0000000000000000000000000000000000000000" as `0x${string}`,
};

// ─── SavingsVault ABI ─────────────────────────────────────────────────────────

export const SAVINGS_VAULT_ABI = [
  // Read functions
  {
    name: "getPositions",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "token", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "lockPeriodDays", type: "uint256" },
          { name: "startTime", type: "uint256" },
          { name: "maturityTime", type: "uint256" },
          { name: "claimed", type: "bool" },
        ],
      },
    ],
  },
  {
    name: "calculateYield",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "lockPeriodDays", type: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "yieldPool",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "token", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "apyBps",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "lockPeriodDays", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  // Write functions
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "lockPeriodDays", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "claim",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "positionIndex", type: "uint256" }],
    outputs: [],
  },
  // Events
  {
    name: "Deposited",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "token", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "lockPeriodDays", type: "uint256", indexed: false },
      { name: "maturityTime", type: "uint256", indexed: false },
    ],
  },
  {
    name: "Claimed",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "positionIndex", type: "uint256", indexed: true },
      { name: "principal", type: "uint256", indexed: false },
      { name: "yield", type: "uint256", indexed: false },
    ],
  },
] as const;

// ─── ERC20 ABI (minimal) ──────────────────────────────────────────────────────

export const ERC20_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
  {
    name: "symbol",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
] as const;

// ─── APY Config ───────────────────────────────────────────────────────────────

export const APY_CONFIG = [
  { days: 30, apy: 5, label: "1 Month", color: "text-green-400" },
  { days: 60, apy: 12, label: "2 Months", color: "text-yellow-400" },
  { days: 90, apy: 20, label: "3 Months", color: "text-purple-400" },
] as const;
