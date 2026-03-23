"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, FileText, BarChart3, CheckCircle2,
  Smartphone, Shield, Zap, ArrowRight, Phone, Star,
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

const FEATURES = [
  {
    icon: Clock,
    tag: "Sledovanie času",
    title: "Smart Stundenzettel",
    desc: "Montéri logujú hodiny priamo z mobilu. Systém automaticky generuje právne platné nemecké výkazy s KW číslovaním a digitálnym podpisom podľa DSGVO.",
    bullets: [
      "Mobilná aplikácia pre terénnych pracovníkov",
      "Automatické KW číslovanie (nemecký štandard)",
      "PDF s kvalifikovaným digitálnym podpisom",
      "Real-time schvaľovací workflow",
      "Export pre mzdové účtovníctvo",
    ],
    color: "from-zinc-900 to-zinc-900",
    accent: "text-blue-400",
    border: "border-zinc-700/60",
  },
  {
    icon: FileText,
    tag: "Fakturácia",
    title: "Zero-Touch Fakturácia",
    desc: "Po schválení pracovného výkazu systém sám vygeneruje faktúru, priradí správne číslo, odošle zákazníkovi a zaúčtuje platbu — bez jediného kliknutia.",
    bullets: [
      "Automatické generovanie po schválení výkazu",
      "Striktné chronologické číslovanie (zákonná požiadavka)",
      "Presné priradenie kalendárnych týždňov (KW)",
      "Automatické odosielanie zákazníkom e-mailom",
      "Integrácia s DATEV a nemeckými ERP systémami",
    ],
    color: "from-zinc-900 to-zinc-900",
    accent: "text-amber-400",
    border: "border-zinc-700/60",
  },
  {
    icon: BarChart3,
    tag: "Analytika",
    title: "Live Finančný Dashboard",
    desc: "Kompletný prehľad vašej firmy v reálnom čase. Zaevidované, čakajúce a zaplatené faktúry, výkonnosť tímu a profitabilita projektov na jednej obrazovke.",
    bullets: [
      "Live cash flow a výhľad na nasledujúce týždne",
      "Prehľad rentability podľa projektu a zákazníka",
      "Automatické upozornenia na oneskorené platby",
      "Exporty pre daňové priznania (XML, CSV, PDF)",
      "Role-based prístupy pre manažérov a účtovníkov",
    ],
    color: "from-zinc-900 to-zinc-900",
    accent: "text-emerald-400",
    border: "border-zinc-700/60",
  },
];

const STEPS = [
  { num: "01", title: "Pracovník zaloguje hodiny", desc: "Montér otvorí mobilnú app, vyberie projekt a zadá odpracované hodiny — trvá 30 sekúnd." },
  { num: "02", title: "Automatický výkaz", desc: "Systém vygeneruje Stundenzettel s KW číslom, digitálnym podpisom a odošle manažérovi na schválenie." },
  { num: "03", title: "Schválenie a fakturácia", desc: "Manažér schváli jedným kliknutím. ZettelFlow okamžite vytvorí a odošle faktúru zákazníkovi." },
  { num: "04", title: "Dashboard sa aktualizuje", desc: "Platba príde, systém zaúčtuje, aktualizuje cash flow a odošle notifikáciu. Nulová manuálna práca." },
];

const STATS = [
  { value: "120+", label: "hodín ušetrených mesačne" },
  { value: "0", label: "chýb v účtovníctve" },
  { value: "2 týž.", label: "čas implementácie" },
  { value: "100%", label: "DACH compliance" },
];

const INTEGRATIONS   = ["DATEV", "SAP Business One", "Lexware", "sevDesk", "Xero", "Google Workspace"];
const INTEGRATIONS_2 = ["Microsoft 365", "Outlook", "Slack", "Stripe", "Zapier", "Make.com"];

const FEATURES_CZ = [
  {
    icon: Clock,
    tag: "Sledování času",
    title: "Smart Stundenzettel",
    desc: "Montéři logují hodiny přímo z mobilu. Systém automaticky generuje právně platné německé výkazy s KW číslovaním a digitálním podpisem podle DSGVO.",
    bullets: [
      "Mobilní aplikace pro terénní pracovníky",
      "Automatické KW číslovaní (německý standard)",
      "PDF s kvalifikovaným digitálním podpisem",
      "Schvalovací workflow v reálném čase",
      "Export pro mzdové účetnictví",
    ],
    color: "from-zinc-900 to-zinc-900",
    accent: "text-blue-400",
    border: "border-zinc-700/60",
  },
  {
    icon: FileText,
    tag: "Fakturace",
    title: "Zero-Touch Fakturace",
    desc: "Po schválení pracovního výkazu systém sám vygeneruje fakturu, přiřadí správné číslo, odešle zákazníkovi a zaúčtuje platbu — bez jediného kliknutí.",
    bullets: [
      "Automatické generování po schválení výkazu",
      "Strikt ní chronologické číslovaní (zákonný požadavek)",
      "Přesné přiřazení kalendářních týdnů (KW)",
      "Automatické zasílání zákazníkům e-mailem",
      "Integrace s DATEV a německými ERP systémy",
    ],
    color: "from-zinc-900 to-zinc-900",
    accent: "text-amber-400",
    border: "border-zinc-700/60",
  },
  {
    icon: BarChart3,
    tag: "Analytika",
    title: "Live Finanční Dashboard",
    desc: "Kompletní přehled vaší firmy v reálném čase. Zaevidentované, čekající a zaplacené faktury, výkonnost týmu a rentabilita projektů na jedné obrazovce.",
    bullets: [
      "Live cash flow a výhled na nadávající týdny",
      "Přehled rentability podle projektu a zákazníka",
      "Automatická upozornění na opožděné platby",
      "Exporty pro daňová přiznání (XML, CSV, PDF)",
      "Role-based přístupy pro manažery a účetní",
    ],
    color: "from-zinc-900 to-zinc-900",
    accent: "text-emerald-400",
    border: "border-zinc-700/60",
  },
];

const STEPS_CZ = [
  { num: "01", title: "Pracovník zaznamá hodiny", desc: "Montér otevře mobilní aplikaci, vybere projekt a zadá odpracované hodiny — trvá 30 sekund." },
  { num: "02", title: "Automatický výkaz", desc: "Systém vygeneruje Stundenzettel s KW číslem, digitálním podpisem a odešle manažerovi ke schválení." },
  { num: "03", title: "Schválení a fakturace", desc: "Manažer schválí jedním kliknutím. ZettelFlow okamžitě vytvoří a odešle fakturu zákazníkovi." },
  { num: "04", title: "Dashboard se aktualizuje", desc: "Platba dorazí, systém zaúčtuje, aktualizuje cash flow a odešle notifikaci. Nulová manuální práce." },
];

const STATS_CZ = [
  { value: "120+", label: "hodin ušetřených měsíčně" },
  { value: "0", label: "chyb v účetnictví" },
  { value: "2 týd.", label: "čas implementace" },
  { value: "100%", label: "DACH compliance" },
];

const CAPABILITIES_SK = [
  { icon: Smartphone, title: "Mobilná aplikácia", desc: "PWA pre iOS a Android. Pracovníci logujú hodiny, fotky a poznámky priamo z terénu." },
  { icon: Shield, title: "DSGVO & STB Compliance", desc: "Všetky dáta uložené v EU. Plná zhoda s nemeckou legislatívou, STB normami a DSGVO." },
  { icon: Zap, title: "Automatické notifikácie", desc: "Email a SMS upozornenia pri schválení výkazu, odoslaní faktúry alebo omeškanej platbe." },
  { icon: BarChart3, title: "Reporting & Export", desc: "Jedným kliknutím exportujte do DATEV, Lexware alebo ľubovolného CSV/XML formátu." },
  { icon: CheckCircle2, title: "Multi-tenantna architektúra", desc: "Jeden systém pre viacero firiem alebo divízií. Kompletná izolácia dát a role-based prístup." },
  { icon: FileText, title: "Zmluvy & Dokumenty", desc: "Generovanie a správa projektových zmlýv, objednávok a dodacích listov priamo v systéme." },
];

const CAPABILITIES_CZ = [
  { icon: Smartphone, title: "Mobilní aplikace", desc: "PWA pro iOS a Android. Pracovníci logují hodiny, fotky a poznámky přímo z terénu." },
  { icon: Shield, title: "DSGVO & STB Compliance", desc: "Veškerá data uložena v EU. Plná shoda s německou legislativou, STB normami a DSGVO." },
  { icon: Zap, title: "Automatická upozornění", desc: "E-mail a SMS upozornění při schválení výkazu, odeslání faktury nebo opožděné platbě." },
  { icon: BarChart3, title: "Reporting & Export", desc: "Jedním kliknutím exportujte do DATEV, Lexware nebo libovolného CSV/XML formátu." },
  { icon: CheckCircle2, title: "Multi-tenantní architektura", desc: "Jeden systém pro více firem nebo diviizí. Kompletní izolace dat a role-based přístup." },
  { icon: FileText, title: "Smlouvy & Dokumenty", desc: "Generování a správa projektových smluv, objednávek a dodacích listů přímo v systému." },
];

const SK_UI = {
  badge: "Produkt · B2B Portál",
  back: "Späť na hlavnú stránku",
  h1a: "Riadiace stredisko pre vaše",
  h1b: "stavby v DACH",
  sub: "Jeden systém pre sledovanie hodín, automatickú faktúráciu a live finančné reporty. Špeciálne navrhnutý pre stavebné a remeselnnícke firmy pôsobiáce v DACH regióne.",
  cta1: "Vyžiadovať demo",
  cta2: "Pozrieť prehľad",
  ds1: "Faktúry tento mes.", ds2: "Zaplacené", ds3: "Aktívne projekty",
  ra: "Schválené", rw: "Čaká", rp: "Zaplacené",
  df: "94\u00a0% faktúr zaplacených tento mesiac",
  fl: "Čo ZettelFlow rieši", fh: "Tri moduly. Jeden systém.",
  sl: "Proces", sh: "Ako to funguje", ss: "Od zalogovavaných hodín po zaplatené faktúry — celý cyklus prebehne bez manuálnej práce.",
  cl: "Viac než faktúrácia", ch: "Všetko čo stavebná firma potrebuje",
  il: "Integrácie",
  tq: "„ZettelFlow nám ušetril vyoše 120 hodín mesačne. Montéri logujú čas cez mobil a faktúry idú zákazníkom automaticky. Žiadna administratíva, žiadne chyby.“",
  tc: "Kováč Bau GmbH · Stavebná firma, DACH región",
  ctaL: "Bezplatné demo", ctaH: "Pripravený zefektívniť svoje stavby?",
  ctaD: "Naplánujte si 30-minútové demo. Ukážeme vám ZettelFlow na vašich reálnych dátach a navrhneme implementáciu.",
  ctaB: "Vyžiadovať bezplatné demo",
  ctaF: "30 minút · bez zäväzkov · s vašimi dátami",
};

const CZ_UI = {
  badge: "Produkt · B2B Portál",
  back: "Zpět na hlavní stránku",
  h1a: "Řídict centrum pro vaše",
  h1b: "stavby v DACH",
  sub: "Jeden systém pro sledování hodin, automatickou fakturaci a live finanční reporty. Speciálně navržený pro stavební a řemeslém firmy působící v DACH regionu.",
  cta1: "Vyžádat demo",
  cta2: "Zobrazit přehled",
  ds1: "Faktury tento měs.", ds2: "Zaplaceno", ds3: "Aktivní projekty",
  ra: "Schváleno", rw: "Čeká", rp: "Zaplaceno",
  df: "94\u00a0% faktur zaplaceno tento měsíc",
  fl: "Co ZettelFlow řeší", fh: "Tři moduly. Jeden systém.",
  sl: "Proces", sh: "Jak to funguje", ss: "Od zaznamenených hodin po zaplacené faktury — celý cyklus proběhne bez manuální práce.",
  cl: "Více než fakturace", ch: "Vše, co stavební firma potřebuje",
  il: "Integrace",
  tq: "„ZettelFlow nám ušetřil přes 120 hodin měsíčně. Montéři logují čas přes mobil a faktury jdou zákazníkům automaticky. Žádná administrativa, žádné chyby.“",
  tc: "Kováč Bau GmbH · Stavební firma, DACH region",
  ctaL: "Bezplatná ukázka", ctaH: "Připraven zefektivnit své stavby?",
  ctaD: "Naplánujte si 30minutovou ukázku. Ukážeme vám ZettelFlow na vašich reálných datech a navrhneme implementaci.",
  ctaB: "Vyžádat bezplatnou ukázku",
  ctaF: "30 minut · bez závazků · s vašimi daty",
};

export default function ZettelFlowPage() {
  const { lang } = useLanguage();
  const ui = lang === "cz" ? CZ_UI : SK_UI;
  const features = lang === "cz" ? FEATURES_CZ : FEATURES;
  const steps = lang === "cz" ? STEPS_CZ : STEPS;
  const stats = lang === "cz" ? STATS_CZ : STATS;
  const caps = lang === "cz" ? CAPABILITIES_CZ : CAPABILITIES_SK;
  const dashStats = lang === "cz"
    ? [{ val: "€48,200", label: ui.ds1 }, { val: "94%", label: ui.ds2 }, { val: "12", label: ui.ds3 }]
    : [{ val: "€48,200", label: ui.ds1 }, { val: "94%", label: ui.ds2 }, { val: "12", label: ui.ds3 }];
  const dashRows = [
    { name: "Kováč Bau GmbH", kw: "KW 11", status: ui.ra, color: "text-emerald-400 bg-emerald-950/50" },
    { name: "ProBau Systeme", kw: "KW 11", status: ui.rw, color: "text-yellow-400 bg-yellow-950/50" },
    { name: "BauTech Wien GmbH", kw: "KW 10", status: ui.rp, color: "text-blue-400 bg-blue-950/50" },
  ];
  return (
    <main className="min-h-screen bg-zinc-50">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-yellow-300/[0.12] blur-[120px]" />
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
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-yellow-400/80 hover:bg-yellow-400/95 backdrop-blur-md text-zinc-900 font-semibold text-sm border border-yellow-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(250,204,21,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_6px_28px_rgba(234,179,8,0.5)] transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  {ui.cta1}
                </motion.a>
                <motion.a
                  href="/#zettelflow"
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

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="hidden lg:block"
            >
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={900} scale={1.02} transitionSpeed={400} glareEnable={true} glareMaxOpacity={0.08} glareColor="#facc15" glarePosition="all">
              <div className="bg-zinc-900 rounded-3xl border border-zinc-700/60 shadow-[0_24px_80px_rgba(0,0,0,0.35)] p-6 space-y-4" style={{ transformStyle: "preserve-3d" }}>
                {/* Mini dashboard preview */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Live Dashboard</span>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {dashStats.map((s) => (
                    <div key={s.label} className="bg-zinc-800/60 rounded-2xl p-3 text-center border border-zinc-700/60">
                      <p className="font-calsans text-lg font-bold text-white">{s.val}</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5 leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[
                  ...dashRows
                  ].map((r) => (
                    <div key={r.name} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/50">
                      <div>
                        <p className="text-xs font-semibold text-zinc-200">{r.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">{r.kw}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.color}`}>{r.status}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <div className="h-[2px] w-full rounded-full bg-zinc-700/60 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "94%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-1.5 text-right">{ui.df}</p>
                </div>
              </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.07)} className="text-center">
              <p className="font-calsans text-3xl font-extrabold text-white">{s.value}</p>
              <p className="text-zinc-400 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Feature deep-dive ── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">{ui.fl}</p>
            <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              {ui.fh}
            </h2>
          </motion.div>

          <div className="space-y-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} {...fadeUp(i * 0.1)}>
                  <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} transitionSpeed={500} glareEnable={true} glareMaxOpacity={0.07} glareColor="#facc15" glarePosition="all">
                  <div className={`bg-gradient-to-br ${f.color} rounded-3xl border ${f.border} p-8 md:p-10 relative overflow-hidden`} style={{ transformStyle: "preserve-3d" }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-5" style={{ transform: "translateZ(8px)" }}>
                          <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                            <Icon className={`w-5 h-5 ${f.accent}`} />
                          </div>
                          <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${f.accent}`}>{f.tag}</span>
                        </div>
                        <h3 className="font-calsans text-2xl font-bold text-white mb-3" style={{ transform: "translateZ(6px)" }}>{f.title}</h3>
                        <p className="text-zinc-400 leading-relaxed" style={{ transform: "translateZ(4px)" }}>{f.desc}</p>
                      </div>
                      <ul className="space-y-3" style={{ transform: "translateZ(4px)" }}>
                        {f.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${f.accent}`} />
                            <span className="text-zinc-300 text-sm leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative py-24 px-6 bg-zinc-50 border-t border-zinc-100 overflow-hidden">
        {/* Ambient blobs — give backdrop-blur something to blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-yellow-300/[0.12] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-200/[0.14] blur-[80px] pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">{ui.sl}</p>
            <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              {ui.sh}
            </h2>
            <p className="mt-4 text-zinc-500 max-w-lg mx-auto">{ui.ss}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.num} {...fadeUp(i * 0.1)}>
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
                  {/* Inner specular shimmer — top-left corner */}
                  <div className="absolute top-0 left-0 w-3/4 h-px bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
                  <span className="font-calsans text-4xl font-extrabold text-zinc-200 leading-none select-none" style={{ transform: "translateZ(2px)" }}>{s.num}</span>
                  <h3 className="font-semibold text-zinc-900 text-sm mt-2 mb-2" style={{ transform: "translateZ(6px)" }}>{s.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed" style={{ transform: "translateZ(4px)" }}>{s.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-3 w-6 h-px bg-zinc-300/60" />
                  )}
                </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Additional capabilities ── */}
      <section className="py-24 px-6 bg-zinc-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/[0.05] to-transparent pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
          <motion.div {...fadeUp(0)} className="text-center mb-14 relative">
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">{ui.cl}</p>
            <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {ui.ch}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 relative">
            {caps.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.title} {...fadeUp(i * 0.07)}>
                  <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={800} scale={1.03} transitionSpeed={400} glareEnable={true} glareMaxOpacity={0.06} glareColor="#facc15" glarePosition="all" className="h-full">
                  <div className="bg-zinc-800/60 border border-zinc-700/60 rounded-2xl p-6 h-full hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300 relative overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
                    <div className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-4" style={{ transform: "translateZ(8px)" }}>
                      <Icon className="w-4 h-4 text-yellow-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-sm" style={{ transform: "translateZ(6px)" }}>{c.title}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed" style={{ transform: "translateZ(4px)" }}>{c.desc}</p>
                  </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="py-20 overflow-hidden bg-white border-t border-zinc-100/60">
        <motion.div {...fadeUp(0)} className="text-center mb-10 px-6">
          <p className="text-zinc-400 text-[10px] font-semibold tracking-[0.32em] uppercase">{ui.il}</p>
        </motion.div>

        {/* Dual-row infinite marquee */}
        <div className="relative [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
          {/* Row 1 — scrolls left */}
          <div className="flex overflow-hidden mb-3 hover:[&>div]:[animation-play-state:paused]">
            <div className="flex gap-3 shrink-0 animate-marquee">
              {[...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
                <span
                  key={i}
                  className="shrink-0 px-5 py-2 rounded-full bg-zinc-100/70 text-zinc-500 text-[13px] font-medium whitespace-nowrap select-none"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
          {/* Row 2 — scrolls right */}
          <div className="flex overflow-hidden hover:[&>div]:[animation-play-state:paused]">
            <div className="flex gap-3 shrink-0 animate-[marquee-reverse_32s_linear_infinite]">
              {[...INTEGRATIONS_2, ...INTEGRATIONS_2].map((name, i) => (
                <span
                  key={i}
                  className="shrink-0 px-5 py-2 rounded-full bg-zinc-100/70 text-zinc-500 text-[13px] font-medium whitespace-nowrap select-none"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-20 px-6 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} perspective={900} scale={1.02} transitionSpeed={400} glareEnable={true} glareMaxOpacity={0.06} glareColor="#facc15" glarePosition="all">
            <div className="bg-white rounded-3xl border border-zinc-100 shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-10 text-center relative overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
              <div className="flex justify-center gap-1 mb-5" style={{ transform: "translateZ(4px)" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-zinc-600 text-lg leading-relaxed mb-6 italic" style={{ transform: "translateZ(6px)" }}>
                {ui.tq}
              </blockquote>
              <div style={{ transform: "translateZ(3px)" }}>
                <p className="font-semibold text-zinc-900">Miroslav Kováč</p>
                <p className="text-sm text-zinc-500">{ui.tc}</p>
              </div>
            </div>
            </Tilt>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <div className="relative bg-zinc-900 rounded-3xl p-10 md:p-14 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/[0.08] to-transparent pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
              <p className="text-yellow-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4">{ui.ctaL}</p>
              <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                {ui.ctaH}
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                {ui.ctaD}
              </p>
              <motion.a
                href="/contact"
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ y: 1, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-yellow-400/80 hover:bg-yellow-400/95 backdrop-blur-md text-zinc-900 font-bold text-sm border border-yellow-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_28px_rgba(250,204,21,0.45)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_8px_32px_rgba(234,179,8,0.55)] transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                {ui.ctaB}
              </motion.a>
              <p className="text-zinc-500 text-xs mt-4">{ui.ctaF}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
