"use client";

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { formatUnits } from "viem";
import { SAVINGS_VAULT_ABI, CONTRACT_ADDRESSES, APY_CONFIG } from "@/lib/contracts";
import { useState } from "react";

type Position = {
  token: `0x${string}`;
  amount: bigint;
  lockPeriodDays: bigint;
  startTime: bigint;
  maturityTime: bigint;
  claimed: boolean;
};

export function PositionsTable() {
  const { address } = useAccount();
  const [claimingIndex, setClaimingIndex] = useState<number | null>(null);

  const { data: positions, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.savingsVault,
    abi: SAVINGS_VAULT_ABI,
    functionName: "getPositions",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { writeContract, data: txHash } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  if (isSuccess) refetch();

  const handleClaim = (index: number) => {
    setClaimingIndex(index);
    writeContract({
      address: CONTRACT_ADDRESSES.savingsVault,
      abi: SAVINGS_VAULT_ABI,
      functionName: "claim",
      args: [BigInt(index)],
    });
  };

  const now = Math.floor(Date.now() / 1000);

  if (!positions || (positions as unknown as Position[]).length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500">
        <div className="text-4xl mb-3">📭</div>
        <p className="font-medium">No active positions</p>
        <p className="text-sm mt-1">Make your first deposit to start earning.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">Your Positions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-200">
              <th className="text-left px-4 py-3">Amount</th>
              <th className="text-left px-4 py-3">Period</th>
              <th className="text-left px-4 py-3">APY</th>
              <th className="text-left px-4 py-3">Matures</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(positions as unknown as Position[]).map((pos, i) => {
              const isMatured = now >= Number(pos.maturityTime);
              const tier = APY_CONFIG.find((t) => t.days === Number(pos.lockPeriodDays));
              const maturityDate = new Date(Number(pos.maturityTime) * 1000);
              const daysLeft = Math.ceil((Number(pos.maturityTime) - now) / 86400);

              return (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 font-medium text-white">
                    {parseFloat(formatUnits(pos.amount, 18)).toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-gray-300">
                    {Number(pos.lockPeriodDays)}d
                  </td>
                  <td className={`px-4 py-4 font-semibold ${tier?.color ?? "text-purple-400"}`}>
                    {tier?.apy ?? "?"}%
                  </td>
                  <td className="px-4 py-4 text-gray-400">
                    <div>{maturityDate.toLocaleDateString()}</div>
                    {!isMatured && (
                      <div className="text-xs text-gray-600">{daysLeft}d left</div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {pos.claimed ? (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">
                        ✓ Claimed
                      </span>
                    ) : isMatured ? (
                      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full border border-yellow-200">
                        ✨ Ready
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200">
                        🔒 Locked
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    {!pos.claimed && isMatured && (
                      <button
                        onClick={() => handleClaim(i)}
                        disabled={claimingIndex === i}
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        {claimingIndex === i ? "Claiming..." : "Claim"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
