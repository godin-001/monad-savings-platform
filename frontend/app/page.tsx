import Link from "next/link";

const apyTiers = [
  { days: 30, label: "1 Mes",   apy: "5%",  bg: "bg-green-50",  border: "border-green-200",  badge: "text-green-600",  icon: "🌱", featured: false },
  { days: 60, label: "2 Meses", apy: "12%", bg: "bg-violet-50", border: "border-violet-300", badge: "text-violet-600", icon: "🔥", featured: true },
  { days: 90, label: "3 Meses", apy: "20%", bg: "bg-purple-50", border: "border-purple-300", badge: "text-purple-700", icon: "💎", featured: false },
];

const differentiators = [
  { icon: "🔍", title: "Sin letra pequeña",       desc: "Reglas públicas e inmutables en el contrato. Cualquiera puede auditarlas. Cero sorpresas." },
  { icon: "🌎", title: "Sin KYC, sin banco",       desc: "Solo necesitas una wallet. Sin historial crediticio, sin documentación." },
  { icon: "🔒", title: "El contrato no puede mentir", desc: "Nadie puede cambiar los términos una vez deployado. Tu APY queda grabado on-chain." },
  { icon: "🎯", title: "Ahorro con propósito",    desc: "Crea metas: \"Viaje a Japón\", \"Fondo de emergencia\". Tu progreso vive on-chain." },
  { icon: "🔥", title: "Savings Streaks",         desc: "Deposita con regularidad y acumula racha. Tu disciplina queda registrada en la blockchain." },
  { icon: "💰", title: "Comisión 100% visible",   desc: "10% del rendimiento al claim. Lo ves en el contrato antes de depositar." },
];

const comparisons = [
  ["Comisiones ocultas 15–40%",       "10% del yield, visible on-chain"],
  ["Contratos de 5–20 años",          "Plazos de 30, 60 o 90 días"],
  ["Penalización por salir antes",    "Estructura predecible desde el inicio"],
  ["Requiere historial crediticio",   "Solo necesitas una wallet"],
  ["Solo en tu país/banco",           "Accesible desde cualquier lugar del mundo"],
  ["Pueden cambiar los términos",     "Contrato inmutable — nadie puede cambiarlo"],
];

const steps = [
  { step: "01", title: "Conecta tu wallet",  desc: "MetaMask o cualquier wallet compatible con Monad. Sin registro." },
  { step: "02", title: "Elige meta y plazo", desc: "Define para qué ahorras y cuánto tiempo. 30, 60 o 90 días." },
  { step: "03", title: "Reclama al vencer",  desc: "Capital + rendimiento en un clic. Sin trámites ni esperas." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F7FF] text-gray-900">

      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">M</div>
            <span className="font-semibold text-lg text-gray-900">Monad Savings</span>
          </div>
          <Link href="/app" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Lanzar app →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.12),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-100 border border-violet-200 rounded-full px-4 py-1.5 text-sm text-violet-700 mb-8">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Construido en Monad Testnet · Hackathon 2026
          </div>

          <h1 className="text-6xl font-extrabold tracking-tight mb-6 leading-tight text-gray-900">
            En un seguro confías en<br />
            <span className="line-through text-gray-300">una empresa</span>.<br />
            Aquí confías en el{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">código</span>.
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Ahorro a plazo fijo con rendimiento transparente. Sin comisiones ocultas, sin KYC, sin intermediarios.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/app" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-md shadow-violet-200">
              Empieza a ahorrar →
            </Link>
            <a href="https://testnet.monadexplorer.com/address/0x95dDd45079B5646e545495C0E8abAD0d5CCf43F5" target="_blank"
              className="border border-gray-300 hover:border-violet-400 bg-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors text-gray-600 hover:text-violet-600">
              Ver contrato
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-5">Para la generación de 20–35 años que no confía en las instituciones.</p>
        </div>
      </section>

      {/* APY Tiers */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">Rendimiento predecible</h2>
        <p className="text-gray-500 text-center mb-12">APY fijo grabado en el contrato. Sin cambios, sin sorpresas.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apyTiers.map((tier) => (
            <div key={tier.days} className={`relative ${tier.bg} border ${tier.border} rounded-2xl p-6 ${tier.featured ? "scale-105 shadow-lg ring-2 ring-violet-300" : "shadow-sm"}`}>
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">MÁS POPULAR</div>
              )}
              <div className="text-3xl mb-3">{tier.icon}</div>
              <div className="text-sm text-gray-500 mb-1">{tier.label} bloqueado</div>
              <div className={`text-5xl font-extrabold ${tier.badge} mb-1`}>{tier.apy}</div>
              <div className="text-sm text-gray-400 mb-4">APY Fijo</div>
              <div className="text-xs text-gray-400 bg-white/60 rounded-lg px-3 py-2 border border-white">
                10% del yield va al protocolo — visible antes de depositar
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* vs Seguro comercial */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">¿Por qué no un seguro comercial?</h2>
        <p className="text-gray-500 text-center mb-10">Porque el código no miente.</p>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-2 text-sm font-semibold border-b border-gray-200">
            <div className="px-5 py-3 text-red-500 bg-red-50">❌ Seguro comercial</div>
            <div className="px-5 py-3 text-green-600 bg-green-50">✅ Monad Savings</div>
          </div>
          {comparisons.map(([bad, good], i) => (
            <div key={i} className={`grid grid-cols-2 text-sm ${i < comparisons.length - 1 ? "border-b border-gray-100" : ""}`}>
              <div className="px-5 py-3.5 text-gray-400">{bad}</div>
              <div className="px-5 py-3.5 text-gray-700 font-medium">{good}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Diferenciadores */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">Lo que nos hace diferentes</h2>
        <p className="text-gray-500 text-center mb-12">Construido para la generación que desconfía de las instituciones.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((d, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-violet-200 transition-all">
              <div className="text-3xl mb-3">{d.icon}</div>
              <h3 className="font-semibold mb-2 text-gray-900">{d.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">Cómo funciona</h2>
        <p className="text-gray-500 text-center mb-12">Tres pasos. Sin papeleo.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center mx-auto mb-4">
                <span className="text-violet-600 font-mono font-bold text-lg">{s.step}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-b from-violet-50 to-white border border-violet-200 rounded-3xl p-12 shadow-sm">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">¿Listo para ahorrar?</h2>
          <p className="text-gray-500 mb-8">Conecta tu wallet y haz tu primer depósito en menos de 2 minutos. Sin banco. Sin trámites.</p>
          <Link href="/app" className="inline-block bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-md shadow-violet-200">
            Empieza a ahorrar →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-gray-400 text-sm bg-white">
        <p>Monad Savings Platform · Hackathon Monad 2026 · El código es la ley.</p>
      </footer>
    </main>
  );
}
