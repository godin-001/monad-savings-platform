"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { SAVINGS_VAULT_ABI, CONTRACT_ADDRESSES } from "@/lib/contracts";

type Goal = {
  name: string;
  targetAmount: bigint;
  savedAmount: bigint;
  active: boolean;
};

export function GoalsSection({ onGoalCreated }: { onGoalCreated?: () => void }) {
  const { address } = useAccount();
  const [showForm, setShowForm] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const { data: goals, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.savingsVault,
    abi: SAVINGS_VAULT_ABI,
    functionName: "getGoals",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  if (isSuccess) {
    refetch();
    onGoalCreated?.();
    setShowForm(false);
    setGoalName("");
    setTargetAmount("");
  }

  const handleCreate = () => {
    if (!goalName || !targetAmount) return;
    writeContract({
      address: CONTRACT_ADDRESSES.savingsVault,
      abi: SAVINGS_VAULT_ABI,
      functionName: "createGoal",
      args: [goalName, parseUnits(targetAmount, 18)],
    });
  };

  const goalsArr = (goals as unknown as Goal[]) ?? [];

  const GOAL_EMOJIS = ["🎯", "✈️", "🏠", "💻", "🚗", "🎓", "💍", "🌎", "🏋️", "🎵"];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">🎯 Mis Metas</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs bg-violet-100 hover:bg-violet-200 border border-violet-300 text-violet-700 px-3 py-1.5 rounded-lg transition-colors"
        >
          {showForm ? "Cancelar" : "+ Nueva meta"}
        </button>
      </div>

      {/* Formulario nueva meta */}
      {showForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Nombre de la meta</label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder='ej. "Viaje a Japón", "Fondo de emergencia"'
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Monto objetivo (tokens)</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="500"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={!goalName || !targetAmount || isPending}
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {isPending ? "Creando..." : "Crear meta on-chain"}
          </button>
        </div>
      )}

      {/* Lista de metas */}
      {goalsArr.length === 0 ? (
        <div className="text-center py-6 text-gray-400 text-sm">
          <p>No tienes metas aún.</p>
          <p className="text-xs mt-1">Las metas te ayudan a ahorrar con propósito.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {goalsArr.map((goal, i) => {
            const pct = Math.min(
              100,
              Number(goal.targetAmount) > 0
                ? (Number(goal.savedAmount) * 100) / Number(goal.targetAmount)
                : 0
            );
            const saved = Number(formatUnits(goal.savedAmount, 18));
            const target = Number(formatUnits(goal.targetAmount, 18));
            const completed = pct >= 100;
            const emoji = GOAL_EMOJIS[i % GOAL_EMOJIS.length];

            return (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{emoji}</span>
                    <div>
                      <div className="font-medium text-sm text-white">{goal.name}</div>
                      <div className="text-xs text-gray-500">
                        {saved.toFixed(2)} / {target.toFixed(2)} tokens
                      </div>
                    </div>
                  </div>
                  {completed ? (
                    <span className="text-xs bg-green-900/30 text-green-400 border border-green-800 px-2 py-0.5 rounded-full">
                      ✓ Lograda
                    </span>
                  ) : (
                    <span className="text-xs text-purple-400 font-bold">{pct.toFixed(0)}%</span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#1E1E3F] rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      completed ? "bg-green-500" : "bg-gradient-to-r from-violet-500 to-purple-400"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
