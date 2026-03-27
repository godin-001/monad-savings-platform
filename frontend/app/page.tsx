import Link from "next/link";

const apyTiers = [
  {
    days: 30,
    label: "1 Month",
    apy: "5%",
    color: "from-green-500/20 to-green-500/5",
    border: "border-green-500/30",
    badge: "text-green-400",
    icon: "🌱",
  },
  {
    days: 60,
    label: "2 Months",
    apy: "12%",
    color: "from-yellow-500/20 to-yellow-500/5",
    border: "border-yellow-500/30",
    badge: "text-yellow-400",
    icon: "🔥",
    featured: true,
  },
  {
    days: 90,
    label: "3 Months",
    apy: "20%",
    color: "from-purple-500/20 to-purple-500/5",
    border: "border-purple-500/30",
    badge: "text-purple-400",
    icon: "💎",
  },
];

const steps = [
  {
    step: "01",
    title: "Connect Wallet",
    desc: "Connect your wallet to Monad Testnet. We support MetaMask, WalletConnect, and more.",
  },
  {
    step: "02",
    title: "Deposit & Lock",
    desc: "Choose your token, amount, and lock period (30, 60, or 90 days). Approve and deposit in one click.",
  },
  {
    step: "03",
    title: "Claim Yield",
    desc: "At maturity, claim your principal plus the earned yield. No surprises, no impermanent loss.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0D1A] text-white">
      {/* Nav */}
      <nav className="border-b border-[#1E1E3F] px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-sm font-bold">
              M
            </div>
            <span className="font-semibold text-lg">Monad Savings</span>
          </div>
          <Link
            href="/app"
            className="bg-[#7C3AED] hover:bg-[#6D28D9] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Launch App →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Built on Monad Testnet
          </div>

          <h1 className="text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Save.{" "}
            <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
              Lock.
            </span>{" "}
            Earn.
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Fixed-yield savings vault powered by Monad&apos;s high-speed EVM.
            Deposit your tokens, set your lock period, and earn predictable
            returns — no impermanent loss, no complexity.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/app"
              className="bg-[#7C3AED] hover:bg-[#6D28D9] px-8 py-3.5 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-purple-900/50"
            >
              Start Saving →
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              className="border border-[#1E1E3F] hover:border-purple-500/50 px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors text-gray-300 hover:text-white"
            >
              View Contracts
            </a>
          </div>
        </div>
      </section>

      {/* APY Tiers */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Predictable Returns
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Choose your timeframe. The longer you save, the more you earn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apyTiers.map((tier) => (
            <div
              key={tier.days}
              className={`relative bg-gradient-to-b ${tier.color} border ${tier.border} rounded-2xl p-6 ${
                tier.featured ? "scale-105 shadow-xl shadow-yellow-900/20" : ""
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="text-3xl mb-3">{tier.icon}</div>
              <div className="text-sm text-gray-400 mb-1">{tier.label}</div>
              <div className={`text-5xl font-extrabold ${tier.badge} mb-1`}>
                {tier.apy}
              </div>
              <div className="text-sm text-gray-500">Annual Percentage Yield</div>
              <div className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-400">
                Lock for <span className="text-white font-medium">{tier.days} days</span> •{" "}
                <span className="text-white font-medium">Fixed rate</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
        <p className="text-gray-400 text-center mb-12">
          Three simple steps to start earning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-300 font-mono font-bold text-lg">
                  {s.step}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-b from-purple-900/30 to-transparent border border-purple-500/20 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to earn?</h2>
          <p className="text-gray-400 mb-8">
            Connect your wallet and make your first deposit in under 2 minutes.
          </p>
          <Link
            href="/app"
            className="inline-block bg-[#7C3AED] hover:bg-[#6D28D9] px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
          >
            Launch App →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1E1E3F] py-8 text-center text-gray-600 text-sm">
        <p>Monad Savings Platform · Built for Monad Hackathon 2026</p>
      </footer>
    </main>
  );
}
