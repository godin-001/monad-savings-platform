// ─── Contract Addresses ───────────────────────────────────────────────────────
// Actualizar después del deploy en Monad Testnet

export const CONTRACT_ADDRESSES = {
  savingsVault: "0x95dDd45079B5646e545495C0E8abAD0d5CCf43F5" as `0x${string}`,
  mockUSDC: "0x438098d0d769e328F26A272b57Ad5d87AC8CC65E" as `0x${string}`,
};

// ─── SavingsVault ABI ─────────────────────────────────────────────────────────

export const SAVINGS_VAULT_ABI = [
  // View
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
          { name: "goalIndex", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "getGoals",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "name", type: "string" },
          { name: "targetAmount", type: "uint256" },
          { name: "savedAmount", type: "uint256" },
          { name: "active", type: "bool" },
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
    name: "calculateNetYield",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "lockPeriodDays", type: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "protocolFeeBps",
    type: "function",
    stateMutability: "view",
    inputs: [],
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
    name: "streak",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  // Write
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "lockPeriodDays", type: "uint256" },
      { name: "goalIndex", type: "uint256" },
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
  {
    name: "createGoal",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "name", type: "string" },
      { name: "targetAmount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256" }],
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
      { name: "goalIndex", type: "uint256", indexed: false },
    ],
  },
  {
    name: "Claimed",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "positionIndex", type: "uint256", indexed: true },
      { name: "principal", type: "uint256", indexed: false },
      { name: "yieldAmount", type: "uint256", indexed: false },
      { name: "protocolFee", type: "uint256", indexed: false },
    ],
  },
  {
    name: "GoalCreated",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "goalIndex", type: "uint256", indexed: true },
      { name: "name", type: "string", indexed: false },
      { name: "targetAmount", type: "uint256", indexed: false },
    ],
  },
  {
    name: "GoalCompleted",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "goalIndex", type: "uint256", indexed: true },
      { name: "name", type: "string", indexed: false },
    ],
  },
] as const;

// ─── ERC20 ABI ────────────────────────────────────────────────────────────────

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
  { days: 30,  apy: 5,  label: "1 Mes",    color: "text-green-400",  icon: "🌱" },
  { days: 60,  apy: 12, label: "2 Meses",  color: "text-yellow-400", icon: "🔥" },
  { days: 90,  apy: 20, label: "3 Meses",  color: "text-purple-400", icon: "💎" },
] as const;

// Comisión del protocolo (visible en UI)
export const PROTOCOL_FEE_PCT = 10; // 10% del yield
