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
    bg: "bg-orange-50", border: "border-orange-300", badge: "text-orange-500",
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

/** Mockup de la app — CSS puro, sin imágenes externas */
function AppMockup() {
  return (
    <div className="relative w-full max-w-xs mx-auto select-none">
      {/* Glow detrás */}
      <div className="absolute -inset-4 bg-gradient-to-br from-orange-300/30 to-violet-400/20 rounded-3xl blur-2xl" />

      {/* Teléfono */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
        {/* Barra de estado */}
        <div className="bg-gradient-to-r from-orange-500 to-violet-600 px-5 pt-5 pb-8 text-white">
          <div className="flex justify-between items-center text-xs mb-4 opacity-80">
            <span className="font-semibold">Monad Savings</span>
            <span>🔋 92%</span>
          </div>
          <p className="text-xs opacity-70 mb-1">Balance disponible</p>
          <p className="text-4xl font-extrabold tracking-tight">$5,221.92</p>
          <p className="text-xs opacity-70 mt-1">+$221.92 esta semana 📈</p>
        </div>

        {/* Tarjetas APY */}
        <div className="px-4 -mt-4">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-3 space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Rendimientos activos</p>
            {[
              { icon: "🌱", label: "30 días", apy: "5%",  color: "text-green-500",  bg: "bg-green-50" },
              { icon: "🔥", label: "60 días", apy: "12%", color: "text-violet-500", bg: "bg-violet-50" },
              { icon: "💎", label: "90 días", apy: "20%", color: "text-orange-500", bg: "bg-orange-50" },
            ].map((t) => (
              <div key={t.label} className={`flex items-center justify-between ${t.bg} rounded-xl px-3 py-2`}>
                <div className="flex items-center gap-2">
                  <span className="text-base">{t.icon}</span>
                  <span className="text-xs font-medium text-gray-600">{t.label}</span>
                </div>
                <span className={`text-sm font-extrabold ${t.color}`}>{t.apy}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Racha + CTA */}
        <div className="px-4 py-4 space-y-3">
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2">
            <span className="text-base">🔥</span>
            <span className="text-xs font-semibold text-orange-600">Racha: 7 depósitos seguidos</span>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-sm font-bold text-center py-3 rounded-xl shadow-md shadow-orange-100">
            Depositar ahora →
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-3">
          <div className="w-16 h-1 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F7FF] text-gray-900">

      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-50 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-violet-600 flex items-center justify-center text-sm font-bold text-white">M</div>
            <span className="font-semibold text-lg text-gray-900">Monad Savings</span>
          </div>
          <Link href="/app" className="bg-[#F97316] hover:bg-[#EA6A0A] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm shadow-orange-200">
            Empieza a ahorrar →
          </Link>
        </div>
      </nav>

      {/* ── HERO — split layout ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-orange-200/20 rounded-full blur-3xl -translate-x-1/4" />
          <div className="absolute top-20 right-0 w-[500px] h-[400px] bg-violet-300/15 rounded-full blur-3xl translate-x-1/4" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Columna izquierda — texto */}
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 text-sm text-orange-600 mb-8 font-medium">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                Para los que ya no confían en las instituciones
              </div>

              <h1 className="text-[3.4rem] md:text-[5rem] font-extrabold tracking-tight mb-6 leading-[1.0] text-gray-900">
                Gana hasta{" "}
                <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                  20%
                </span>{" "}
                al año.<br />
                <span className="text-gray-400 text-[2.4rem] md:text-[3.8rem]">
                  Sin banco. Sin trampa.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-500 mb-4 leading-relaxed">
                Deposita, elige tu plazo y recibe tu dinero con rendimiento al vencer.
                Las reglas están en el contrato — públicas, inmutables, verificables.
              </p>

              <p className="text-sm text-gray-400 mb-8">
                ✓ Sin comisiones ocultas &nbsp;·&nbsp; ✓ Sin historial crediticio &nbsp;·&nbsp; ✓ Sin mínimos
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link href="/app"
                  className="bg-[#F97316] hover:bg-[#EA6A0A] text-white px-7 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-orange-200">
                  Empieza con lo que tengas →
                </Link>
                <a href="https://testnet.monadexplorer.com/address/0x95dDd45079B5646e545495C0E8abAD0d5CCf43F5"
                  target="_blank"
                  className="border border-gray-300 hover:border-violet-400 bg-white px-7 py-4 rounded-xl font-semibold text-lg transition-colors text-gray-600 hover:text-violet-600">
                  Ver el contrato
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 flex-wrap">
                {[
                  { val: "20%", label: "APY máximo" },
                  { val: "100K", label: "mUSDC en pool" },
                  { val: "0", label: "comisiones ocultas" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold text-orange-500">{s.val}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna derecha — mockup de la app */}
            <div className="flex justify-center lg:justify-end">
              <AppMockup />
            </div>

          </div>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          ¿Te suena familiar?
        </h2>
        <p className="text-gray-400 text-center text-sm mb-8">
          Si dijiste "sí" a cualquiera de estos, esta plataforma es para ti.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {painPoints.map((p, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center hover:border-orange-200 transition-colors">
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
              {tier.days === 90 && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                  MÁX. RENDIMIENTO
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

        {/* Ejemplo numérico */}
        <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm max-w-2xl mx-auto">
          <p className="text-center text-sm font-semibold text-gray-700 mb-4">
            💡 ¿Cuánto recibirías con <span className="text-orange-500">$5,000 pesos</span> a 90 días?
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

      {/* ── VS SEGURO COMERCIAL — con imagen ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
          ¿Por qué no simplemente un seguro de ahorro?
        </h2>
        <p className="text-gray-400 text-center mb-10 text-sm">
          Buena pregunta. Aquí la respuesta honesta.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Tabla comparativa */}
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

          {/* Imagen de contexto */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-80 lg:h-full min-h-[20rem]">
            {/* Foto: persona joven con teléfono / finanzas */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&w=700&q=80"
              alt="Finanzas digitales"
              className="w-full h-full object-cover"
            />
            {/* Overlay con texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
              <p className="text-white font-bold text-lg leading-tight">
                "En un seguro comercial confías en una empresa."
              </p>
              <p className="text-orange-300 font-bold text-lg mt-1">
                "Aquí confías en el código — y el código no miente."
              </p>
            </div>
          </div>
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
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all">
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
              <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-500 font-mono font-bold text-lg">{s.step}</span>
              </div>
              <h3 className="font-semibold text-base mb-2 text-gray-900">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL — con imagen de fondo ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="relative rounded-3xl overflow-hidden shadow-xl">
          {/* Imagen de fondo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&w=1200&q=80"
            alt="Ahorro y crecimiento"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay naranja-violeta */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/85 via-violet-700/80 to-violet-900/90" />

          {/* Contenido */}
          <div className="relative text-center px-8 py-16 text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Tu dinero puede crecer más.
            </h2>
            <p className="text-orange-100 mb-2 text-xl">Sin banco. Sin asesores. Sin letra pequeña.</p>
            <p className="text-white/70 text-sm mb-10">
              Empieza con lo que tengas — no hay monto mínimo.
            </p>
            <Link href="/app"
              className="inline-block bg-white text-orange-600 hover:bg-orange-50 px-10 py-4 rounded-xl font-bold text-xl transition-all hover:scale-105 shadow-xl">
              Empieza con lo que tengas →
            </Link>
            <p className="text-white/50 text-xs mt-6">
              Construido sobre Monad Testnet · Hackathon 2026 · El código es la ley.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
