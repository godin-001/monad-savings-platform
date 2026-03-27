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
    <div className="min-h-screen bg-[#F8F7FF] text-gray-900">

      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">M</div>
            <span className="font-semibold text-lg text-gray-900">Monad Savings</span>
          </Link>
          <div className="flex items-center gap-4">
            {isConnected && streak !== undefined && Number(streak) > 0 && (
              <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-600 text-sm px-3 py-1.5 rounded-full font-medium">
                🔥 Racha: {Number(streak)}
              </div>
            )}
            <ConnectButton />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[65vh] text-center">
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="text-3xl font-bold mb-3 text-gray-900">Conecta tu wallet para ahorrar</h1>
            <p className="text-gray-500 mb-2 max-w-md">Sin cuenta bancaria, sin KYC, sin trámites. Solo tu wallet.</p>
            <p className="text-sm text-violet-600 font-medium mb-8">Red: Monad Testnet (Chain ID 10143)</p>
            <ConnectButton />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-1 text-gray-900">Mi Ahorro</h1>
                <p className="text-gray-500 text-sm">Transparente, inmutable y tuyo. El código no miente.</p>
              </div>
              {streak !== undefined && Number(streak) > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-2xl px-5 py-3 text-center">
                  <div className="text-2xl mb-0.5">🔥</div>
                  <div className="text-xl font-bold text-orange-500">{Number(streak)}</div>
                  <div className="text-xs text-gray-400">racha</div>
                </div>
              )}
            </div>

            <StatsRow key={refreshKey} />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Izquierda: Depósito + Metas */}
              <div className="lg:col-span-2 space-y-5">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-5 text-gray-900">Nuevo depósito</h2>
                  <DepositForm onSuccess={handleRefresh} />
                </div>
                <GoalsSection onGoalCreated={handleRefresh} />
              </div>

              {/* Derecha: Posiciones + Info */}
              <div className="lg:col-span-3 space-y-5">
                <PositionsTable key={refreshKey} />

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">📊 Tasas y comisión — todo público</h3>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { days: 30, apy: "5%",  color: "text-green-600",  bg: "bg-green-50",  border: "border-green-200" },
                      { days: 60, apy: "12%", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200" },
                      { days: 90, apy: "20%", color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
                    ].map((t) => (
                      <div key={t.days} className={`${t.bg} border ${t.border} rounded-xl p-3 text-center`}>
                        <div className="text-xs text-gray-400 mb-1">{t.days} días</div>
                        <div className={`text-2xl font-bold ${t.color}`}>{t.apy}</div>
                        <div className="text-xs text-gray-400">APY bruto</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Comisión del protocolo</span>
                      <span className="text-orange-600 font-semibold">10% del yield</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">Visible en el contrato antes de depositar. Sin sorpresas.</p>
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
