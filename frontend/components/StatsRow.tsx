"use client";

import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { SAVINGS_VAULT_ABI, CONTRACT_ADDRESSES, APY_CONFIG } from "@/lib/contracts";

type Position = {
  token: `0x${string}`;
  amount: bigint;
  lockPeriodDays: bigint;
  startTime: bigint;
  maturityTime: bigint;
  claimed: boolean;
};

export function StatsRow() {
  const { address } = useAccount();

  const { data: positions } = useReadContract({
    address: CONTRACT_ADDRESSES.savingsVault,
    abi: SAVINGS_VAULT_ABI,
    functionName: "getPositions",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const posArr = (positions as unknown as Position[]) ?? [];

  const totalDeposited = posArr
    .filter((p) => !p.claimed)
    .reduce((sum, p) => sum + Number(formatUnits(p.amount, 18)), 0);

  const totalEarned = posArr
    .filter((p) => p.claimed)
    .reduce((sum, p) => {
      const tier = APY_CONFIG.find((t) => t.days === Number(p.lockPeriodDays));
      const apy = (tier?.apy ?? 5) / 100;
      const yield_ = Number(formatUnits(p.amount, 18)) * apy * (Number(p.lockPeriodDays) / 365);
      return sum + yield_;
    }, 0);

  const activePositions = posArr.filter((p) => !p.claimed).length;

  const stats = [
    {
      label: "Total Locked",
      value: totalDeposited > 0 ? `${totalDeposited.toFixed(2)} tokens` : "—",
      icon: "🔒",
    },
    {
      label: "Active Positions",
      value: activePositions > 0 ? activePositions.toString() : "—",
      icon: "📊",
    },
    {
      label: "Total Earned",
      value: totalEarned > 0 ? `${totalEarned.toFixed(4)} tokens` : "—",
      icon: "💰",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3"
        >
          <span className="text-2xl">{s.icon}</span>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
            <div className="text-lg font-semibold text-white mt-0.5">{s.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
