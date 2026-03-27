"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract } from "wagmi";
import { DepositForm } from "@/components/DepositForm";
import { PositionsTable } from "@/components/PositionsTable";
import { StatsRow } from "@/components/StatsRow";
import { GoalsSection } from "@/components/GoalsSection";
import Link from "next/link";
import { useState } from "react";
import { SAVINGS_VAULT_ABI, CONTRACT_ADDRESSES } from "@/lib/contracts";

export default function AppPage() {
  const { isConnected, address } = useAccount();
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: streak } = useReadContract({
    address: CONTRACT_ADDRESSES.savingsVault,
    abi: SAVINGS_VAULT_ABI,
    functionName: "streak",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  return (
    <div className="min-h-screen bg-[#0D0D1A] text-white">
      {/* Nav */}
      <nav className="border-b border-[#1E1E3F] px-6 py-4 sticky top-0 z-50 bg-[#0D0D1A]/90 backdrop-blur">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-sm font-bold">
              M
            </div>
            <span className="font-semibold text-lg">Monad Savings</span>
          </Link>

          <div className="flex items-center gap-4">
            {isConnected && streak !== undefined && Number(streak) > 0 && (
              <div className="flex items-center gap-1.5 bg-orange-900/20 border border-orange-500/30 text-orange-400 text-sm px-3 py-1.5 rounded-full">
                🔥 Racha: {Number(streak)} depósito{Number(streak) > 1 ? "s" : ""}
              </div>
            )}
            <ConnectButton />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {!isConnected ? (
          /* No conectado */
          <div className="flex flex-col items-center justify-center min-h-[65vh] text-center">
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="text-3xl font-bold mb-3">Conecta tu wallet para ahorrar</h1>
            <p className="text-gray-400 mb-2 max-w-md">
              Sin cuenta bancaria, sin KYC, sin trámites. Solo tu wallet y tu voluntad de ahorrar.
            </p>
            <p className="text-sm text-purple-400 mb-8">
              Red: Monad Testnet (Chain ID 10143)
            </p>
            <ConnectButton />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">Mi Ahorro</h1>
                <p className="text-gray-400 text-sm">
                  Transparente, inmutable y tuyo. El código no miente.
                </p>
              </div>
              {streak !== undefined && Number(streak) > 0 && (
                <div className="bg-orange-900/10 border border-orange-500/20 rounded-2xl px-5 py-3 text-center">
                  <div className="text-2xl mb-0.5">🔥</div>
                  <div className="text-xl font-bold text-orange-400">{Number(streak)}</div>
                  <div className="text-xs text-gray-500">racha</div>
                </div>
              )}
            </div>

            {/* Stats */}
            <StatsRow key={refreshKey} />

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Columna izquierda: Depósito + Metas */}
              <div className="lg:col-span-2 space-y-5">
                <div className="bg-[#13132A] border border-[#1E1E3F] rounded-2xl p-6">
                  <h2 className="text-lg font-semibold mb-5">Nuevo depósito</h2>
                  <DepositForm onSuccess={handleRefresh} />
                </div>

                <GoalsSection onGoalCreated={handleRefresh} />
              </div>

              {/* Columna derecha: Posiciones + APY info */}
              <div className="lg:col-span-3 space-y-5">
                <PositionsTable key={refreshKey} />

                {/* Transparencia del protocolo */}
                <div className="bg-[#13132A] border border-[#1E1E3F] rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-gray-300 mb-4">
                    📊 Tasas y comisión — todo público
                  </h3>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { days: 30, apy: "5%", color: "text-green-400" },
                      { days: 60, apy: "12%", color: "text-yellow-400" },
                      { days: 90, apy: "20%", color: "text-purple-400" },
                    ].map((t) => (
                      <div key={t.days} className="bg-[#0D0D1A] rounded-xl p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">{t.days} días</div>
                        <div className={`text-2xl font-bold ${t.color}`}>{t.apy}</div>
                        <div className="text-xs text-gray-600">APY bruto</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-orange-900/10 border border-orange-500/20 rounded-xl px-4 py-3 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Comisión del protocolo</span>
                      <span className="text-orange-400 font-semibold">10% del yield</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1.5">
                      Se cobra al momento del claim y es visible en el contrato. Sin sorpresas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
