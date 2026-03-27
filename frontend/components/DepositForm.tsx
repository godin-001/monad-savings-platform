"use client";

import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits, formatUnits } from "viem";
import {
  SAVINGS_VAULT_ABI,
  ERC20_ABI,
  CONTRACT_ADDRESSES,
  APY_CONFIG,
  PROTOCOL_FEE_PCT,
} from "@/lib/contracts";

type Goal = {
  name: string;
  targetAmount: bigint;
  savedAmount: bigint;
  active: boolean;
};

export function DepositForm({ onSuccess }: { onSuccess?: () => void }) {
  const { address } = useAccount();

  const [tokenAddress, setTokenAddress] = useState(CONTRACT_ADDRESSES.mockUSDC);
  const [amount, setAmount] = useState("");
  const [selectedDays, setSelectedDays] = useState<30 | 60 | 90>(30);
  const [selectedGoal, setSelectedGoal] = useState<number>(0);

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  const { data: allowance } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address ? [address, CONTRACT_ADDRESSES.savingsVault] : undefined,
    query: { enabled: !!address },
  });

  const { data: goals } = useReadContract({
    address: CONTRACT_ADDRESSES.savingsVault,
    abi: SAVINGS_VAULT_ABI,
    functionName: "getGoals",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: netYieldData } = useReadContract({
    address: CONTRACT_ADDRESSES.savingsVault,
    abi: SAVINGS_VAULT_ABI,
    functionName: "calculateNetYield",
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
      args: [
        tokenAddress as `0x${string}`,
        amountBigInt,
        BigInt(selectedDays),
        BigInt(selectedGoal),
      ],
    });
  };

  if (isSuccess) {
    onSuccess?.();
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold mb-2">¡Depósito exitoso!</h3>
        <p className="text-gray-400 text-sm">
          Tus tokens están bloqueados. Vuelve en {selectedDays} días a reclamar tu rendimiento.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Token */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">
          Token (dirección)
        </label>
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value as `0x${string}`)}
          placeholder="0x..."
          className="w-full bg-[#0D0D1A] border border-[#1E1E3F] rounded-lg px-4 py-3 text-sm font-mono text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Monto */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">
          Monto
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-[#0D0D1A] border border-[#1E1E3F] rounded-lg px-4 py-3 text-lg font-medium text-gray-200 focus:outline-none focus:border-purple-500 transition-colors pr-20"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            tokens
          </span>
        </div>
      </div>

      {/* Plazo */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">
          Plazo de ahorro
        </label>
        <div className="grid grid-cols-3 gap-2">
          {APY_CONFIG.map((tier) => (
            <button
              key={tier.days}
              onClick={() => setSelectedDays(tier.days as 30 | 60 | 90)}
              className={`rounded-xl py-3 border text-center transition-all ${
                selectedDays === tier.days
                  ? "bg-purple-900/40 border-purple-500 text-white"
                  : "bg-[#0D0D1A] border-[#1E1E3F] text-gray-400 hover:border-purple-500/40"
              }`}
            >
              <div className="text-lg">{tier.icon}</div>
              <div className="font-bold text-sm mt-0.5">{tier.days} días</div>
              <div className={`text-lg font-extrabold ${tier.color}`}>{tier.apy}%</div>
              <div className="text-xs text-gray-500">APY</div>
            </button>
          ))}
        </div>
      </div>

      {/* Meta (opcional) */}
      {goals && (goals as Goal[]).filter((g) => g.active).length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">
            Meta de ahorro (opcional)
          </label>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(Number(e.target.value))}
            className="w-full bg-[#0D0D1A] border border-[#1E1E3F] rounded-lg px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value={0}>Sin meta específica</option>
            {(goals as Goal[]).map((goal, i) =>
              goal.active ? (
                <option key={i} value={i + 1}>
                  {goal.name} ({formatUnits(goal.savedAmount, 18)}/
                  {formatUnits(goal.targetAmount, 18)} tokens)
                </option>
              ) : null
            )}
          </select>
        </div>
      )}

      {/* Preview */}
      {amount && Number(amount) > 0 && (
        <div className="bg-[#0D0D1A] border border-[#1E1E3F] rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Capital depositado</span>
            <span className="text-white font-medium">{amount} tokens</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Rendimiento bruto ({selectedTier.apy}% APY)</span>
            <span className={`font-medium ${selectedTier.color}`}>
              +{netYieldData
                ? (Number(formatUnits(netYieldData, 18)) / (1 - PROTOCOL_FEE_PCT / 100)).toFixed(4)
                : "..."} tokens
            </span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Comisión del protocolo ({PROTOCOL_FEE_PCT}% del yield)</span>
            <span className="text-orange-400">
              −{netYieldData
                ? (
                    (Number(formatUnits(netYieldData, 18)) / (1 - PROTOCOL_FEE_PCT / 100)) *
                    (PROTOCOL_FEE_PCT / 100)
                  ).toFixed(4)
                : "..."} tokens
            </span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Vencimiento</span>
            <span className="text-white font-medium">
              {new Date(Date.now() + selectedDays * 86400000).toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="border-t border-[#1E1E3F] pt-2.5 flex justify-between font-semibold text-base">
            <span className="text-gray-300">Recibirás al vencimiento</span>
            <span className="text-white">
              {netYieldData
                ? (Number(amount) + Number(formatUnits(netYieldData, 18))).toFixed(4)
                : "..."}{" "}
              tokens
            </span>
          </div>
          <p className="text-xs text-gray-600 pt-1">
            ✅ La comisión es pública e inmutable en el contrato. Sin letra pequeña.
          </p>
        </div>
      )}

      {/* CTA */}
      {needsApproval ? (
        <button
          onClick={handleApprove}
          disabled={!amount || Number(amount) <= 0 || isPending || isConfirming}
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed py-3.5 rounded-xl font-semibold transition-colors"
        >
          {isPending || isConfirming ? "Aprobando..." : "Aprobar token"}
        </button>
      ) : (
        <button
          onClick={handleDeposit}
          disabled={!amount || Number(amount) <= 0 || isPending || isConfirming}
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed py-3.5 rounded-xl font-semibold transition-colors"
        >
          {isPending || isConfirming
            ? "Depositando..."
            : `Depositar y bloquear ${selectedDays} días`}
        </button>
      )}
    </div>
  );
}
