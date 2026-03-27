"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { DepositForm } from "@/components/DepositForm";
import { PositionsTable } from "@/components/PositionsTable";
import { StatsRow } from "@/components/StatsRow";
import Link from "next/link";
import { useState } from "react";

export default function AppPage() {
  const { isConnected } = useAccount();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-[#0D0D1A] text-white">
      {/* Nav */}
      <nav className="border-b border-[#1E1E3F] px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-sm font-bold">
              M
            </div>
            <span className="font-semibold text-lg">Monad Savings</span>
          </Link>
          <ConnectButton />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {!isConnected ? (
          /* Not connected */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="text-3xl font-bold mb-3">Connect your wallet</h1>
            <p className="text-gray-400 mb-8 max-w-md">
              Connect to Monad Testnet to start depositing tokens and earning
              fixed yield.
            </p>
            <ConnectButton />
          </div>
        ) : (
          /* Connected */
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-gray-400">
                Manage your savings positions and earn yield.
              </p>
            </div>

            {/* Stats */}
            <StatsRow key={refreshKey} />

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Deposit Form */}
              <div className="lg:col-span-2">
                <div className="bg-[#13132A] border border-[#1E1E3F] rounded-2xl p-6">
                  <h2 className="text-lg font-semibold mb-5">New Deposit</h2>
                  <DepositForm onSuccess={() => setRefreshKey((k) => k + 1)} />
                </div>
              </div>

              {/* Positions */}
              <div className="lg:col-span-3">
                <PositionsTable key={refreshKey} />

                {/* APY info */}
                <div className="mt-4 bg-[#13132A] border border-[#1E1E3F] rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">
                    Current APY Rates
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { days: 30, apy: "5%", color: "text-green-400" },
                      { days: 60, apy: "12%", color: "text-yellow-400" },
                      { days: 90, apy: "20%", color: "text-purple-400" },
                    ].map((t) => (
                      <div
                        key={t.days}
                        className="bg-[#0D0D1A] rounded-lg p-3 text-center"
                      >
                        <div className="text-xs text-gray-500 mb-1">
                          {t.days} days
                        </div>
                        <div className={`text-xl font-bold ${t.color}`}>
                          {t.apy}
                        </div>
                        <div className="text-xs text-gray-600">APY</div>
                      </div>
                    ))}
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
