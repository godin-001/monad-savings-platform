import Link from "next/link";

const apyTiers = [
  {
    days: 30, label: "1 Mes", apy: "5%",
    gradient: "from-green-500/20 to-green-500/5",
    border: "border-green-500/30", badge: "text-green-400", icon: "🌱",
  },
  {
    days: 60, label: "2 Meses", apy: "12%",
    gradient: "from-yellow-500/20 to-yellow-500/5",
    border: "border-yellow-500/30", badge: "text-yellow-400", icon: "🔥",
    featured: true,
  },
  {
    days: 90, label: "3 Meses", apy: "20%",
    gradient: "from-purple-500/20 to-purple-500/5",
    border: "border-purple-500/30", badge: "text-purple-400", icon: "💎",
  },
];

const differentiators = [
  {
    icon: "🔍",
    title: "Sin letra pequeña",
    desc: "Las reglas del contrato son públicas e inmutables. Cualquiera puede auditarlas en el explorer. Cero sorpresas.",
  },
  {
    icon: "🌎",
    title: "Sin KYC, sin banco",
    desc: "Solo necesitas una wallet. Sin historial crediticio, sin documentación, sin pedir permiso a ninguna institución.",
  },
  {
    icon: "🔒",
    title: "El contrato no puede mentir",
    desc: "Una vez deployado, nadie puede cambiar los términos. Ni nosotros. Tu APY y plazo quedan grabados on-chain.",
  },
  {
    icon: "🎯",
    title: "Ahorro con propósito",
    desc: "Crea metas concretas: \"Viaje a Japón\", \"Fondo de emergencia\". Tu progreso vive on-chain, transparente.",
  },
  {
    icon: "🔥",
    title: "Savings Streaks",
    desc: "Deposita con regularidad y acumula una racha. Tu disciplina queda registrada en la blockchain.",
  },
  {
    icon: "💰",
    title: "Comisión 100% visible",
    desc: "Cobramos 10% del rendimiento generado, al momento del claim. Lo ves en el contrato antes de depositar.",
  },
];

const steps = [
  { step: "01", title: "Conecta tu wallet", desc: "MetaMask, WalletConnect o cualquier wallet compatible con Monad Testnet. Sin registro." },
  { step: "02", title: "Elige tu meta y plazo", desc: "Define para qué estás ahorrando y cuánto tiempo puedes dejar los fondos bloqueados. 30, 60 o 90 días." },
  { step: "03", title: "Reclama al vencimiento", desc: "Cuando maduré el plazo, reclama tu capital + rendimiento en un clic. Sin trámites, sin esperas." },
];

const comparisons = [
  ["Comisiones ocultas 15–40%", "10% del yield, visible on-chain"],
  ["Contratos de 5–20 años", "Plazos de 30, 60 o 90 días"],
  ["Penalización por salir antes", "Estructura predecible desde el inicio"],
  ["Requiere historial crediticio", "Solo necesitas una wallet"],
  ["Solo en tu país/banco", "Accesible desde cualquier lugar del mundo"],
  ["Pueden cambiar los términos", "Contrato inmutable, nadie puede cambiarlo"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0D1A] text-white">
      {/* Nav */}
      <nav className="border-b border-[#1E1E3F] px-6 py-4 sticky top-0 z-50 bg-[#0D0D1A]/90 backdrop-blur">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-sm font-bold">
              M
            </div>
            <span className="font-semibold text-lg">Monad Savings</span>
          </div>
          <Link href="/app" className="bg-[#7C3AED] hover:bg-[#6D28D9] px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Lanzar app →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.25),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Construido en Monad Testnet · Hackathon 2026
          </div>

          <h1 className="text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            En un seguro comercial<br />
            confías en{" "}
            <span className="line-through text-gray-600">una empresa</span>.<br />
            Aquí confías en el{" "}
            <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
              código
            </span>
            .
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Ahorro a plazo fijo con rendimiento transparente. Deposita tokens,
            define tu meta, bloquea el plazo y reclama al vencimiento.
            Sin comisiones ocultas, sin KYC, sin intermediarios.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/app"
              className="bg-[#7C3AED] hover:bg-[#6D28D9] px-8 py-3.5 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-purple-900/40"
            >
              Empieza a ahorrar →
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              className="border border-[#1E1E3F] hover:border-purple-500/50 px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors text-gray-300"
            >
              Ver contrato
            </a>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Para la generación que no confía en las instituciones. 20–35 años.
          </p>
        </div>
      </section>

      {/* APY Tiers */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3">Rendimiento predecible</h2>
        <p className="text-gray-400 text-center mb-12">
          Elige tu plazo. El APY es fijo y está grabado en el contrato.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apyTiers.map((tier) => (
            <div
              key={tier.days}
              className={`relative bg-gradient-to-b ${tier.gradient} border ${tier.border} rounded-2xl p-6 ${
                tier.featured ? "scale-105 shadow-xl shadow-yellow-900/20 ring-1 ring-yellow-500/30" : ""
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  MÁS POPULAR
                </div>
              )}
              <div className="text-3xl mb-3">{tier.icon}</div>
              <div className="text-sm text-gray-400 mb-1">{tier.label} bloqueado</div>
              <div className={`text-5xl font-extrabold ${tier.badge} mb-1`}>{tier.apy}</div>
              <div className="text-sm text-gray-500 mb-4">APY Fijo</div>
              <div className="text-xs text-gray-600 bg-black/20 rounded-lg px-3 py-2">
                10% del yield va al protocolo — visible antes de depositar
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* vs Seguro comercial */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3">
          ¿Por qué no simplemente un seguro comercial?
        </h2>
        <p className="text-gray-400 text-center mb-10">
          Porque el código no miente.
        </p>
        <div className="bg-[#13132A] border border-[#1E1E3F] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 text-sm font-semibold border-b border-[#1E1E3F]">
            <div className="px-5 py-3 text-red-400 bg-red-900/10">❌ Seguro comercial</div>
            <div className="px-5 py-3 text-green-400 bg-green-900/10">✅ Monad Savings</div>
          </div>
          {comparisons.map(([bad, good], i) => (
            <div
              key={i}
              className={`grid grid-cols-2 text-sm ${
                i < comparisons.length - 1 ? "border-b border-[#1E1E3F]" : ""
              }`}
            >
              <div className="px-5 py-3.5 text-gray-500">{bad}</div>
              <div className="px-5 py-3.5 text-gray-200">{good}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Diferenciadores */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3">Lo que nos hace diferentes</h2>
        <p className="text-gray-400 text-center mb-12">
          Construido para la generación que creció desconfiando de las instituciones.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((d, i) => (
            <div key={i} className="bg-[#13132A] border border-[#1E1E3F] rounded-2xl p-5">
              <div className="text-3xl mb-3">{d.icon}</div>
              <h3 className="font-semibold mb-2">{d.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3">Cómo funciona</h2>
        <p className="text-gray-400 text-center mb-12">Tres pasos. Sin papeleo.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-300 font-mono font-bold text-lg">{s.step}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-b from-purple-900/30 to-transparent border border-purple-500/20 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para ahorrar?</h2>
          <p className="text-gray-400 mb-8">
            Conecta tu wallet y haz tu primer depósito en menos de 2 minutos.
            Sin cuenta bancaria. Sin trámites.
          </p>
          <Link
            href="/app"
            className="inline-block bg-[#7C3AED] hover:bg-[#6D28D9] px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
          >
            Empieza a ahorrar →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1E1E3F] py-8 text-center text-gray-600 text-sm">
        <p>Monad Savings Platform · Hackathon Monad 2026 · El código es la ley.</p>
      </footer>
    </main>
  );
}
