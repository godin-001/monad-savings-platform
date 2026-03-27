"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { SAVINGS_VAULT_ABI, ERC20_ABI, CONTRACT_ADDRESSES, APY_CONFIG } from "@/lib/contracts";

export function DepositForm({ onSuccess }: { onSuccess?: () => void }) {
  const { address } = useAccount();

  const [tokenAddress, setTokenAddress] = useState(CONTRACT_ADDRESSES.mockUSDC);
  const [amount, setAmount] = useState("");
  const [selectedDays, setSelectedDays] = useState<30 | 60 | 90>(30);
  const [step, setStep] = useState<"approve" | "deposit">("approve");

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Read current allowance
  const { data: allowance } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address ? [address, CONTRACT_ADDRESSES.savingsVault] : undefined,
    query: { enabled: !!address },
  });

  // Calculate preview yield
  const { data: previewYield } = useReadContract({
    address: CONTRACT_ADDRESSES.savingsVault,
    abi: SAVINGS_VAULT_ABI,
    functionName: "calculateYield",
    args: amount ? [parseUnits(amount, 18), BigInt(selectedDays)] : undefined,
    query: { enabled: !!amount && Number(amount) > 0 },
  });

  const selectedTier = APY_CONFIG.find((t) => t.days === selectedDays)!;

  const amountBigInt = amount ? parseUnits(amount, 18) : 0n;
  const needsApproval = allowance !== undefined && allowance < amountBigInt;

  const handleApprove = () => {
    writeContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [CONTRACT_ADDRESSES.savingsVault, amountBigInt],
    });
  };

  const handleDeposit = () => {
    writeContract({
      address: CONTRACT_ADDRESSES.savingsVault,
      abi: SAVINGS_VAULT_ABI,
      functionName: "deposit",
      args: [tokenAddress as `0x${string}`, amountBigInt, BigInt(selectedDays)],
    });
  };

  if (isSuccess) {
    onSuccess?.();
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold mb-2">Deposit Successful!</h3>
        <p className="text-gray-400 text-sm">
          Your tokens are now locked. Come back in {selectedDays} days to claim your yield.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Token Address */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">
          Token Address
        </label>
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value as `0x${string}`)}
          placeholder="0x..."
          className="w-full bg-[#0D0D1A] border border-[#1E1E3F] rounded-lg px-4 py-3 text-sm font-mono text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">
          Amount
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-[#0D0D1A] border border-[#1E1E3F] rounded-lg px-4 py-3 text-lg font-medium text-gray-200 focus:outline-none focus:border-purple-500 transition-colors pr-16"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            tokens
          </span>
        </div>
      </div>

      {/* Lock Period */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">
          Lock Period
        </label>
        <div className="grid grid-cols-3 gap-3">
          {APY_CONFIG.map((tier) => (
            <button
              key={tier.days}
              onClick={() => setSelectedDays(tier.days as 30 | 60 | 90)}
              className={`rounded-lg py-3 border text-center transition-all ${
                selectedDays === tier.days
                  ? "bg-purple-900/40 border-purple-500 text-white"
                  : "bg-[#0D0D1A] border-[#1E1E3F] text-gray-400 hover:border-purple-500/50"
              }`}
            >
              <div className="font-bold text-sm">{tier.days}d</div>
              <div className={`text-lg font-extrabold ${tier.color}`}>
                {tier.apy}%
              </div>
              <div className="text-xs text-gray-500">APY</div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      {amount && Number(amount) > 0 && (
        <div className="bg-[#0D0D1A] border border-[#1E1E3F] rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Principal</span>
            <span className="text-white font-medium">{amount} tokens</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Est. Yield ({selectedTier.apy}% APY)</span>
            <span className={`font-medium ${selectedTier.color}`}>
              +{previewYield ? formatUnits(previewYield, 18) : "..."} tokens
            </span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Maturity</span>
            <span className="text-white font-medium">
              {new Date(
                Date.now() + selectedDays * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}
            </span>
          </div>
          <div className="border-t border-[#1E1E3F] pt-2 flex justify-between font-semibold">
            <span className="text-gray-300">Total at Maturity</span>
            <span className="text-white">
              {previewYield
                ? (Number(amount) + Number(formatUnits(previewYield, 18))).toFixed(4)
                : "..."}{" "}
              tokens
            </span>
          </div>
        </div>
      )}

      {/* Action Button */}
      {needsApproval ? (
        <button
          onClick={handleApprove}
          disabled={!amount || Number(amount) <= 0 || isPending || isConfirming}
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed py-3.5 rounded-xl font-semibold transition-colors"
        >
          {isPending || isConfirming ? "Approving..." : "Approve Token"}
        </button>
      ) : (
        <button
          onClick={handleDeposit}
          disabled={!amount || Number(amount) <= 0 || isPending || isConfirming}
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed py-3.5 rounded-xl font-semibold transition-colors"
        >
          {isPending || isConfirming ? "Depositing..." : `Deposit & Lock for ${selectedDays} Days`}
        </button>
      )}
    </div>
  );
}
