import Link from "next/link";

const apyTiers = [
  {
    days: 30, label: "1 mes",   apy: "5%",
    bg: "bg-green-50", border: "border-green-200", badge: "text-green-600",
    icon: "🌱", note: "Para empezar", featured: false,
  },
  {
    days: 60, label: "2 meses", apy: "12%",
    bg: "bg-violet-50", border: "border-violet-300", badge: "text-violet-600",
    icon: "🔥", note: "El más popular", featured: true,
  },
  {
    days: 90, label: "3 meses", apy: "20%",
    bg: "bg-purple-50", border: "border-purple-300", badge: "text-purple-700",
    icon: "💎", note: "Máximo rendimiento", featured: false,
  },
];

const painPoints = [
  { emoji: "😤", text: "Tu banco te da 3–4% al año. La inflación se come el 5%. Cada año ahorras y cada año pierdes." },
  { emoji: "📄", text: "Los seguros de ahorro te cobran el 30% en comisiones que aparecen en la letra pequeña del año 5." },
  { emoji: "🔒", text: "Si necesitas salir antes de tiempo: penalización, trámite, espera. Tu dinero, pero no tanto." },
];

const differentiators = [
  { icon: "📊", title: "Ves exactamente cuánto ganarás",      desc: "Antes de depositar un peso, la plataforma te muestra el desglose: cuánto recibes tú y cuánto va al protocolo. Sin sorpresas." },
  { icon: "🌎", title: "Sin banco, sin papelería, sin espera", desc: "Solo necesitas una wallet. Sin comprobante de domicilio, sin historial crediticio, sin cita en sucursal." },
  { icon: "⛓️", title: "Las reglas no pueden cambiar",        desc: "El contrato inteligente está publicado en la blockchain. Nadie — ni nosotros — puede modificar tu tasa o tus condiciones." },
  { icon: "🎯", title: "Ahorra para algo concreto",            desc: "Ponle nombre a tu ahorro: \"Fondo de emergencia\", \"Viaje\", \"MacBook\". Tu progreso queda registrado." },
  { icon: "🔥", title: "Tu racha vale algo",                   desc: "Cada depósito suma a tu historial on-chain. Constancia que se puede demostrar, no solo presumir." },
  { icon: "💬", title: "Sin letra pequeña",                    desc: "La comisión es del 10% sobre el rendimiento generado. Eso es todo. Está en el contrato y puedes verificarlo ahora mismo." },
];

const steps = [
  { step: "01", title: "Conecta tu wallet",      desc: "MetaMask o cualquier wallet compatible. Sin crear cuenta, sin correo, sin contraseña." },
  { step: "02", title: "Elige cuánto y por cuánto tiempo", desc: "Desde lo que tengas disponible. Elige 30, 60 o 90 días y ve exactamente cuánto recibirás al final." },
  { step: "03", title: "Cobra al vencer",         desc: "Cuando se cumple el plazo, reclamas en un clic. Capital + rendimiento, directo a tu wallet." },
];

const comparisons = [
  ["Comisiones del 15–40% ocultas hasta el año 5", "10% sobre el rendimiento, visible antes de firmar"],
  ["Contratos de 5 a 20 años con penalización",    "Plazos de 30, 60 o 90 días. Tú decides."],
  ["Te piden RFC, comprobante, historial",          "Solo necesitas una wallet. En serio."],
  ["La tasa puede cambiar sin avisarte",            "Tasa grabada en el contrato. Inmutable."],
  ["Tu banco te da 3–4% al año",                   "Hasta 20% APY. Fijo. Sin trampa."],
  ["Si algo falla, hablas con un asesor",           "El código no tiene asesores — ni los necesita."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F7FF] text-gray-900">

      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-50 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">M</div>
            <span className="font-semibold text-lg text-gray-900">Monad Savings</span>
          </div>
          <Link href="/app" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            Empieza a ahorrar →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(139,92,246,0.1),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-violet-100 border border-violet-200 rounded-full px-4 py-1.5 text-sm text-violet-700 mb-8 font-medium">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Para los que ya no confían en las instituciones
          </div>

          {/* Headline — 3 segundos */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight text-gray-900">
            Gana hasta{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              20% al año
            </span>
            .<br />
            Sin banco. Sin trampa.
          </h1>

          {/* Subheadline — qué hace, cómo funciona */}
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-4 leading-relaxed">
            Deposita, elige tu plazo y recibe tu dinero con rendimiento al vencer.
            Las reglas están en el contrato — públicas, inmutables, verificables.
          </p>

          {/* Trust micro-copy */}
          <p className="text-sm text-gray-400 mb-10">
            ✓ Sin comisiones ocultas &nbsp;·&nbsp; ✓ Sin historial crediticio &nbsp;·&nbsp; ✓ Sin mínimos de inversión
          </p>

          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/app"
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-violet-200">
              Empieza con lo que tengas →
            </Link>
            <a href="https://testnet.monadexplorer.com/address/0x95dDd45079B5646e545495C0E8abAD0d5CCf43F5"
              target="_blank"
              className="border border-gray-300 hover:border-violet-400 bg-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors text-gray-600 hover:text-violet-600">
              Ver el contrato
            </a>
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          ¿Te suena familiar?
        </h2>
        <p className="text-gray-400 text-center text-sm mb-8">
          Si dijiste "sí" a cualquiera de estos, esta plataforma es para ti.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {painPoints.map((p, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center">
              <div className="text-3xl mb-3">{p.emoji}</div>
              <p className="text-sm text-gray-500 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── APY TIERS ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
          Elige cuánto tiempo y cuánto ganas
        </h2>
        <p className="text-gray-400 text-center mb-3">
          La tasa es fija y está grabada en el contrato. Lo que ves es lo que recibes.
        </p>
        <p className="text-center text-xs text-gray-400 mb-10">
          (Se cobra 10% sobre el rendimiento generado — solo eso, visible antes de depositar)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apyTiers.map((tier) => (
            <div key={tier.days}
              className={`relative ${tier.bg} border-2 ${tier.border} rounded-2xl p-6 text-center ${
                tier.featured ? "scale-105 shadow-xl ring-2 ring-violet-300" : "shadow-sm"
              }`}>
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                  MÁS POPULAR
                </div>
              )}
              <div className="text-3xl mb-2">{tier.icon}</div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{tier.label}</div>
              <div className={`text-6xl font-extrabold ${tier.badge} my-2`}>{tier.apy}</div>
              <div className="text-sm text-gray-400 mb-3">rendimiento anual fijo</div>
              <div className="bg-white/70 border border-white rounded-lg px-3 py-2 text-xs text-gray-500 italic">
                "{tier.note}"
              </div>
            </div>
          ))}
        </div>

        {/* Ejemplo numérico concreto */}
        <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm max-w-2xl mx-auto">
          <p className="text-center text-sm font-semibold text-gray-700 mb-4">
            💡 ¿Cuánto recibirías con <span className="text-violet-600">$5,000 pesos</span> a 90 días?
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Tu depósito</span>
              <span className="font-medium text-gray-800">$5,000</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Rendimiento bruto (20% APY × 90d)</span>
              <span className="font-medium text-green-600">+$246.57</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Comisión del protocolo (10% del yield)</span>
              <span className="font-medium text-orange-500">−$24.65</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-base">
              <span className="text-gray-700">Recibes al vencer</span>
              <span className="text-violet-600">$5,221.92 ✅</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            Sin sorpresas. Este cálculo lo puedes verificar en el contrato antes de depositar.
          </p>
        </div>
      </section>

      {/* ── VS SEGURO COMERCIAL ── */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
          ¿Por qué no simplemente un seguro de ahorro?
        </h2>
        <p className="text-gray-400 text-center mb-10 text-sm">
          Buena pregunta. Aquí la respuesta honesta.
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-2 text-sm font-bold border-b border-gray-200">
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

      {/* ── DIFERENCIADORES ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">Lo que lo hace diferente</h2>
        <p className="text-gray-400 text-center text-sm mb-12">
          No es un banco digital. No es un seguro. Es un contrato que cumple lo que promete.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((d, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-violet-200 transition-all">
              <div className="text-3xl mb-3">{d.icon}</div>
              <h3 className="font-semibold mb-2 text-gray-900 text-sm">{d.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">Tres pasos. Sin papeleo.</h2>
        <p className="text-gray-400 text-center text-sm mb-12">
          La primera vez toma menos de 5 minutos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center mx-auto mb-4">
                <span className="text-violet-600 font-mono font-bold text-lg">{s.step}</span>
              </div>
              <h3 className="font-semibold text-base mb-2 text-gray-900">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-b from-violet-50 to-white border border-violet-200 rounded-3xl p-12 shadow-sm">
          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            Tu dinero puede crecer más.
          </h2>
          <p className="text-gray-500 mb-2">Sin banco. Sin asesores. Sin letra pequeña.</p>
          <p className="text-sm text-gray-400 mb-8">
            Empieza con lo que tengas — no hay monto mínimo.
          </p>
          <Link href="/app"
            className="inline-block bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-violet-200">
            Empieza con lo que tengas →
          </Link>
          <p className="text-xs text-gray-400 mt-5">
            Construido sobre Monad Testnet · Hackathon 2026 · El código es la ley.
          </p>
        </div>
      </section>

    </main>
  );
}
