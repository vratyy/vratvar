"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Layers, Globe, Smartphone, Database,
  Code2, Rocket, Users, ArrowRight, Phone, CheckCircle2,
  Gauge, Lock, RefreshCw, LifeBuoy,
} from "lucide-react";
import dynamic from "next/dynamic";
const Tilt = dynamic(() => import("react-parallax-tilt"), { ssr: false });
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

const SERVICE_TYPES = [
  {
    icon: Globe,
    title: "Webové aplikácie & SaaS",
    desc: "Komplexné webové platformy od interných nástrojov cez customer portály až po plnohodnotné SaaS produkty s multi-tenantnou architektúrou.",
    examples: ["B2B Customer Portál", "Správa zmlúv a dokumentov", "SaaS platforma na mieru", "Interné firemné nástroje"],
    accent: "text-violet-400",
    bg: "from-zinc-900 to-zinc-900",
    border: "border-zinc-700/60",
  },
  {
    icon: Smartphone,
    title: "Mobilné aplikácie",
    desc: "Cross-platform mobilné aplikácie pre iOS a Android. PWA alebo natívne — podľa vašich požiadaviek a rozpočtu.",
    examples: ["Terénne pracovné aplikácie", "Customer-facing mobilné appky", "Reporting z terénu", "Offline-first aplikácie"],
    accent: "text-sky-400",
    bg: "from-zinc-900 to-zinc-900",
    border: "border-zinc-700/60",
  },
  {
    icon: Layers,
    title: "B2B Portály & Dashboardy",
    desc: "Komplexné B2B systémy s role-based prístupmi, real-time dashboardmi a integráciami na existujúce ERP a účtovné systémy.",
    examples: ["Subdodávateľské portály", "Zákaznícke self-service portály", "Reporting a analytika", "Multi-company systémy"],
    accent: "text-amber-400",
    bg: "from-zinc-900 to-zinc-900",
    border: "border-zinc-700/60",
  },
  {
    icon: Database,
    title: "Backendové systémy & API",
    desc: "Škálovateľné backendové architektúry, REST a GraphQL API, dátové pipeline a integrácie medzi existujúcimi systémami.",
    examples: ["REST & GraphQL API", "Dátové integrácie (ETL)", "Webhook systémy", "Microservices architektúra"],
    accent: "text-emerald-400",
    bg: "from-zinc-900 to-zinc-900",
    border: "border-zinc-700/60",
  },
];

const PROCESS = [
  {
    num: "01",
    icon: Users,
    title: "Prieskum a požiadavky",
    duration: "2–3 dni",
    desc: "Hlboký ponor do vášho biznisu. Mapujeme procesy, definujeme požiadavky, identifikujeme technické riziká a vytvoríme detailný projektový plán.",
  },
  {
    num: "02",
    icon: Layers,
    title: "Návrh UI/UX",
    duration: "1–2 týždne",
    desc: "Kompletný design systém, wireframy a interaktívne prototypy v Figme. Testujeme UX pred napísaním jediného riadku kódu.",
  },
  {
    num: "03",
    icon: Code2,
    title: "Vývoj",
    duration: "4–12 týždňov",
    desc: "Iteratívny vývoj v 2-týždňových sprintoch. Pravidelné review, live preview pre každý sprint a priamy prístup k vývojárskemu tímu.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Spustenie a škálovanie",
    duration: "1 týždeň",
    desc: "Nasadenie do produkcie, automatizovaný CI/CD, monitoring a podpora po spustení. Vaša appka beží od prvého dňa bez problémov.",
  },
];

const TECH_STACK = [
  { category: "Frontend", items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion"] },
  { category: "Backend & DB", items: ["Supabase", "PostgreSQL", "Edge Functions", "Row-Level Security", "Realtime"] },
  { category: "DevOps", items: ["Vercel", "GitHub Actions", "Docker", "Sentry", "Uptime monitoring"] },
  { category: "Integrátory", items: ["Stripe", "SendGrid", "Twilio", "DATEV API", "SAP / REST APIs"] },
];

const PRINCIPLES = [
  { icon: Gauge, title: "Výkon od prvého dňa", desc: "Core Web Vitals 90+. Server components, edge caching, optimalizované bundles. Rýchlosť je feature." },
  { icon: Lock, title: "Bezpečnosť v DNA", desc: "Row-level security, šifrované dáta, DSGVO compliance, pravidelné security audity. Vaše dáta sú vaše." },
  { icon: RefreshCw, title: "Žiadny technický dlh", desc: "Píšeme kód, ktorý je čitateľný, testovaný a zdokumentovaný. Budúce zmeny sú lacné, nie drahé." },
  { icon: LifeBuoy, title: "Podpora po launchi", desc: "3 mesiace postlaunchovej podpory v cene. Bug fixes, drobné zmeny a monitoring sú štandard." },
];

const SERVICE_TYPES_CZ = [
  {
    icon: Globe,
    title: "Webové aplikace & SaaS",
    desc: "Komplexní webové platformy od interních nástrojů přes zákaznické portály až po plnohodnotné SaaS produkty s multi-tenantní architekturou.",
    examples: ["B2B Zákaznický Portál", "Správa smluv a dokumentů", "SaaS platforma na míru", "Interní firemní nástroje"],
    accent: "text-violet-400",
    bg: "from-zinc-900 to-zinc-900",
    border: "border-zinc-700/60",
  },
  {
    icon: Smartphone,
    title: "Mobilní aplikace",
    desc: "Cross-platform mobilní aplikace pro iOS a Android. PWA nebo nativní — podle vašich požadavků a rozpočtu.",
    examples: ["Terénní pracovní aplikace", "Zákaznické mobilní aplikace", "Reporting z terénu", "Offline-first aplikace"],
    accent: "text-sky-400",
    bg: "from-zinc-900 to-zinc-900",
    border: "border-zinc-700/60",
  },
  {
    icon: Layers,
    title: "B2B Portály & Dashboardy",
    desc: "Komplexní B2B systémy s role-based přístupy, real-time dashboardy a integracemi na stávající ERP a účetní systémy.",
    examples: ["Subdodavatelské portály", "Zákaznické self-service portály", "Reporting a analytika", "Multi-company systémy"],
    accent: "text-amber-400",
    bg: "from-zinc-900 to-zinc-900",
    border: "border-zinc-700/60",
  },
  {
    icon: Database,
    title: "Backendové systémy & API",
    desc: "Škálovatelné backendové architektury, REST a GraphQL API, datové pipeline a integrace mezi stávajícími systémy.",
    examples: ["REST & GraphQL API", "Datové integrace (ETL)", "Webhook systémy", "Microservices architektura"],
    accent: "text-emerald-400",
    bg: "from-zinc-900 to-zinc-900",
    border: "border-zinc-700/60",
  },
];

const PROCESS_CZ = [
  {
    num: "01",
    icon: Users,
    title: "Průzkum a požadavky",
    duration: "2–3 dny",
    desc: "Hluboký ponor do vašeho businessu. Mapujeme procesy, definujeme požadavky, identifikujeme technická rizika a vytvoříme podrobný projektový plán.",
  },
  {
    num: "02",
    icon: Layers,
    title: "Návrh UI/UX",
    duration: "1–2 týdny",
    desc: "Kompletní design systém, wireframy a interaktivní prototypy ve Figmě. Testujeme UX před napsáním jediného řádku kódu.",
  },
  {
    num: "03",
    icon: Code2,
    title: "Vývoj",
    duration: "4–12 týdnů",
    desc: "Iterativní vývoj ve 2týdenních sprintech. Pravidelné review, live preview pro každý sprint a přímý přístup k vývojářskému týmu.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Spuštění a škálování",
    duration: "1 týden",
    desc: "Nasazení do produkce, automatizovaný CI/CD, monitoring a podpora po spuštění. Vaše aplikace běží od prvního dne bez problémů.",
  },
];

const PRINCIPLES_CZ = [
  { icon: Gauge, title: "Výkon od prvního dne", desc: "Core Web Vitals 90+. Server components, edge caching, optimalizované bundles. Rychlost je feature." },
  { icon: Lock, title: "Bezpečnost v DNA", desc: "Row-level security, šifrovaná data, DSGVO compliance, pravidelné security audity. Vaše data jsou vaše." },
  { icon: RefreshCw, title: "Žádný technický dluh", desc: "Píšeme kód, který je čitelný, testovaný a zdokumentovaný. Budoucí změny jsou levné, ne drahé." },
  { icon: LifeBuoy, title: "Podpora po spuštění", desc: "3 měsíce postlaunchové podpory v ceně. Bug fixes, drobné změny a monitoring jsou standard." },
];

const SK_UI = {
  back: "Späť na hlavnú stránku",
  badge: "Služba · Vývoj na mieru",
  h1a: "Digitálne riešenia",
  h1b: "šité na mieru",
  sub: "Od komplexných B2B portálov po mobilné aplikácie. Navrhujeme a implementujeme škálovateľné digitálne produkty, ktoré riešia reálne biznis problémy — nie len technologické výzvy.",
  cta1: "Nezáväzná konzultácia",
  cta2: "Náš proces",
  statLbl: "Priemerná dodávka",
  svcLabel: "Čo stavíme",
  svcH2: "Štyri typy riešení",
  svcSub: "Od jednoduchých firemných nástrojov po komplexné multi-tenantné platformy — každé riešenie je navrhnuté pre rast bez technického dlhu.",
  procLabel: "Ako pracujeme",
  procH2: "Od nápadu k produkcii",
  procSub: "Predvídateľný proces. Žiadne prekvapenia, žiadne oneskorenia, žiadne skryté náklady.",
  princLabel: "Naše princípy",
  princH2: "Nie len kód — produkt",
  ctaLabel: "Nezáväzná konzultácia",
  ctaH2: "Máte projektovú ideu?",
  ctaDesc: "Porozprávajte sa s nami o vašom projekte. Posúdime reálnosť, odhadneme rozsah a navrhneme riešenie bez záväzkov.",
  ctaBtn: "Objednať konzultáciu zadarmo",
  ctaFine: "30 minút · bez záväzkov · aj pre early-stage nápady",
};

const CZ_UI = {
  back: "Zpět na hlavní stránku",
  badge: "Služba · Vývoj na míru",
  h1a: "Digitální řešení",
  h1b: "šitá na míru",
  sub: "Od komplexních B2B portálů po mobilní aplikace. Navrhujeme a implementujeme škálovatelné digitální produkty, které řeší reálné business problémy — ne jen technologické výzvy.",
  cta1: "Nezávazná konzultace",
  cta2: "Náš proces",
  statLbl: "Průměrná dodávka",
  svcLabel: "Co stavíme",
  svcH2: "Čtyři typy řešení",
  svcSub: "Od jednoduchých firemních nástrojů po komplexní multi-tenantní platformy — každé řešení je navrženo pro růst bez technického dluhu.",
  procLabel: "Jak pracujeme",
  procH2: "Od nápadu k produkci",
  procSub: "Předvídatelný proces. Žádné překvapení, žádné zpoždění, žádné skryté náklady.",
  princLabel: "Naše principy",
  princH2: "Nejen kód — produkt",
  ctaLabel: "Nezávazná konzultace",
  ctaH2: "Máte nápad na projekt?",
  ctaDesc: "Promluvte si s námi o vašem projektu. Posoudíme reálnost, odhadneme rozsah a navrhneme řešení bez závazků.",
  ctaBtn: "Objednat konzultaci zdarma",
  ctaFine: "30 minut · bez závazků · i pro early-stage nápady",
};

export default function CustomApplicationsPage() {
  const { lang } = useLanguage();
  const ui = lang === "cz" ? CZ_UI : SK_UI;
  const serviceTypes = lang === "cz" ? SERVICE_TYPES_CZ : SERVICE_TYPES;
  const process = lang === "cz" ? PROCESS_CZ : PROCESS;
  const principles = lang === "cz" ? PRINCIPLES_CZ : PRINCIPLES;
  return (
    <main className="min-h-screen bg-zinc-50">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-violet-300/[0.1] blur-[140px]" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800 transition-colors duration-200 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              {ui.back}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div {...fadeUp(0.05)}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/15 border border-yellow-400/30 text-yellow-700 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                  {ui.badge}
                </span>
              </motion.div>

              <motion.h1 {...fadeUp(0.1)} className="font-calsans text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-900 leading-[1.05] tracking-tight mb-6">
                {ui.h1a}{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  {ui.h1b}
                </span>
              </motion.h1>

              <motion.p {...fadeUp(0.15)} className="text-zinc-500 text-lg leading-relaxed mb-10 max-w-lg">
                {ui.sub}
              </motion.p>

              <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-3">
                <motion.a
                  href="/#contact"
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ y: 1, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400/80 hover:bg-yellow-400/95 backdrop-blur-md text-zinc-900 font-semibold text-sm border border-yellow-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(250,204,21,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_6px_28px_rgba(234,179,8,0.5)] transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  {ui.cta1}
                </motion.a>
                <motion.a
                  href="#process"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ y: 1, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-semibold text-sm transition-colors duration-200"
                >
                  {ui.cta2}
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </div>

            {/* Hero visual — tech stack pill cloud */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="hidden lg:flex flex-col gap-3"
            >
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={900} scale={1.02} transitionSpeed={400} glareEnable={true} glareMaxOpacity={0.08} glareColor="#facc15" glarePosition="all">
              <div className="bg-zinc-900 rounded-2xl border border-zinc-700/60 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-5" style={{ transformStyle: "preserve-3d" }}>
                <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mb-3" style={{ transform: "translateZ(4px)" }}>Tech Stack</p>
                {TECH_STACK.map((t) => (
                  <div key={t.category} className="mb-3 last:mb-0">
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-1.5">{t.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.items.map((item) => (
                        <span key={item} className="px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700/60 text-zinc-300 text-[11px] font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              </Tilt>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "4–12 týž.", label: ui.statLbl },
                  { val: "90+", label: "Core Web Vitals" },
                ].map((s) => (
                  <Tilt key={s.label} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={700} scale={1.04} transitionSpeed={400} glareEnable={true} glareMaxOpacity={0.08} glareColor="#facc15" glarePosition="all">
                  <div className="bg-zinc-900 rounded-2xl border border-zinc-700/60 shadow-[0_4px_16px_rgba(0,0,0,0.2)] p-4 text-center" style={{ transformStyle: "preserve-3d" }}>
                    <p className="font-calsans text-2xl font-bold text-white" style={{ transform: "translateZ(8px)" }}>{s.val}</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5" style={{ transform: "translateZ(4px)" }}>{s.label}</p>
                  </div>
                  </Tilt>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Service types ── */}
      <section className="py-28 px-6 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">{ui.svcLabel}</p>
            <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              {ui.svcH2}
            </h2>
            <p className="mt-4 text-zinc-500 max-w-lg mx-auto text-sm leading-relaxed">
              {ui.svcSub}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {serviceTypes.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} {...fadeUp(i * 0.08)}>
                  <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} perspective={1000} scale={1.02} transitionSpeed={500} glareEnable={true} glareMaxOpacity={0.07} glareColor="#facc15" glarePosition="all" className="h-full">
                  <div className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-3xl p-7 h-full relative overflow-hidden`} style={{ transformStyle: "preserve-3d" }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
                    <div className="flex items-center gap-3 mb-5" style={{ transform: "translateZ(8px)" }}>
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${s.accent}`} />
                      </div>
                      <h3 className="font-calsans font-bold text-white">{s.title}</h3>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-5" style={{ transform: "translateZ(4px)" }}>{s.desc}</p>
                    <ul className="space-y-2" style={{ transform: "translateZ(4px)" }}>
                      {s.examples.map((ex) => (
                        <li key={ex} className="flex items-center gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${s.accent}`} />
                          <span className="text-zinc-300 text-xs">{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" className="relative py-24 px-6 bg-zinc-50 border-t border-zinc-100 overflow-hidden">
        {/* Ambient blobs — give backdrop-blur something to refract */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-yellow-300/[0.12] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-200/[0.14] blur-[80px] pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">{ui.procLabel}</p>
            <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              {ui.procH2}
            </h2>
            <p className="mt-4 text-zinc-500 max-w-md mx-auto text-sm">{ui.procSub}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.num} {...fadeUp(i * 0.1)}>
                  <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={800} scale={1.03} transitionSpeed={400} glareEnable={true} glareMaxOpacity={0.18} glareColor="#ffffff" glarePosition="top" className="h-full">
                  <div
                    className="relative rounded-2xl p-6 h-full overflow-hidden"
                    style={{
                      transformStyle: "preserve-3d",
                      background: "linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.52) 100%)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      border: "1px solid rgba(255,255,255,0.75)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.07), 0 1.5px 6px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.03)",
                    }}
                  >
                    {/* Yellow top accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
                    {/* Inner specular shimmer */}
                    <div className="absolute top-0 left-0 w-3/4 h-px bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
                    <div className="flex items-start justify-between mb-4" style={{ transform: "translateZ(4px)" }}>
                      <span className="font-calsans text-3xl font-extrabold text-zinc-200 leading-none">{step.num}</span>
                      <span className="text-[10px] text-zinc-500 bg-white/60 border border-zinc-200/70 rounded-full px-2.5 py-1 font-medium">{step.duration}</span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-yellow-400/15 border border-yellow-400/30 flex items-center justify-center mb-3" style={{ transform: "translateZ(8px)" }}>
                      <Icon className="w-4 h-4 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-zinc-900 text-sm mb-2" style={{ transform: "translateZ(6px)" }}>{step.title}</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed" style={{ transform: "translateZ(4px)" }}>{step.desc}</p>
                    {i < process.length - 1 && (
                      <div className="hidden lg:block absolute top-10 -right-3.5 w-7 h-px bg-zinc-300/60" />
                    )}
                  </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="relative py-24 px-6 border-t border-zinc-100 overflow-hidden">
        {/* Drifting ambient blobs */}
        <motion.div
          className="absolute top-[-80px] left-[-80px] w-[360px] h-[360px] rounded-full bg-yellow-300/[0.10] blur-[90px] pointer-events-none"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-amber-400/[0.10] blur-[80px] pointer-events-none"
          animate={{ x: [0, -35, 0], y: [0, -25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-yellow-400/[0.06] blur-[60px] pointer-events-none"
          animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">{ui.princLabel}</p>
            <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              {ui.princH2}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} {...fadeUp(i * 0.07)}>
                  <Tilt tiltMaxAngleX={9} tiltMaxAngleY={9} perspective={800} scale={1.03} transitionSpeed={400} glareEnable={true} glareMaxOpacity={0.06} glareColor="#facc15" glarePosition="all" className="h-full">
                  <div className="bg-zinc-900 border border-zinc-700/60 rounded-2xl p-6 h-full relative overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
                    {/* Subtle card inner glow — breathes */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      animate={{ opacity: [0, 0.06, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                      style={{ background: "radial-gradient(circle at 50% 0%, rgba(250,204,21,0.5), transparent 70%)" }}
                    />
                    {/* Floating icon badge */}
                    <motion.div
                      className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/25 flex items-center justify-center mb-4"
                      style={{ transform: "translateZ(8px)" }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    >
                      <Icon className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                    <h3 className="font-semibold text-white text-sm mb-2" style={{ transform: "translateZ(6px)" }}>{p.title}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed" style={{ transform: "translateZ(4px)" }}>{p.desc}</p>
                  </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <div className="relative bg-zinc-900 rounded-3xl p-10 md:p-14 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/[0.08] to-transparent pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
              <p className="text-yellow-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4">{ui.ctaLabel}</p>
              <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                {ui.ctaH2}
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                {ui.ctaDesc}
              </p>
              <motion.a
                href="/contact"
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ y: 1, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-yellow-400/80 hover:bg-yellow-400/95 backdrop-blur-md text-zinc-900 font-bold text-sm border border-yellow-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_28px_rgba(250,204,21,0.45)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_8px_32px_rgba(234,179,8,0.55)] transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                {ui.ctaBtn}
              </motion.a>
              <p className="text-zinc-500 text-xs mt-4">{ui.ctaFine}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
