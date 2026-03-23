"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft, Bot, Mail, FileText, BarChart3,
  MessageSquare, Clock, ArrowRight, Phone, CheckCircle2,
  Zap, Brain, Eye, Play, RefreshCw, Shield,
} from "lucide-react";
import dynamic from "next/dynamic";
const Tilt = dynamic(() => import("react-parallax-tilt"), { ssr: false });
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// RGB values matching each USE_CASE accent (amber, blue, violet, emerald, sky, rose)
const ACCENT_RGBS = [
  "251,191,36",
  "96,165,250",
  "167,139,250",
  "52,211,153",
  "56,189,248",
  "251,113,133",
];

function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);
  return <span ref={ref}>{count}</span>;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

const USE_CASES = [
  {
    icon: FileText,
    title: "Spracovanie faktúr",
    desc: "Agent automaticky číta prichádzajúce faktúry (PDF, email), extrahuje dáta, overuje voči objednávkam a zaúčtuje — bez ľudského zásahu.",
    saving: "~40 hod/mes",
    accent: "text-amber-400",
    bg: "bg-zinc-900",
    border: "border-amber-900/50",
  },
  {
    icon: Mail,
    title: "Emailová komunikácia",
    desc: "AI agent triedi, kategorizuje a odpovedá na rutinné emaily. Eskaluje iba to, čo skutočne vyžaduje ľudskú pozornosť.",
    saving: "~25 hod/mes",
    accent: "text-blue-400",
    bg: "bg-zinc-900",
    border: "border-blue-900/50",
  },
  {
    icon: BarChart3,
    title: "Automatické reporty",
    desc: "Každý pondelok ráno dostanete report s kľúčovými metrikami, anomáliami a odporúčaniami — zostavený agentom z vašich firemných dát.",
    saving: "~20 hod/mes",
    accent: "text-violet-400",
    bg: "bg-zinc-900",
    border: "border-violet-900/50",
  },
  {
    icon: MessageSquare,
    title: "Zákaznícka podpora",
    desc: "AI agent rieši 70–80 % rutinných zákazníckych požiadaviek — statusy objednávok, bežné otázky, zmeny v rezerváciách. Živý agent dostane iba to náročné.",
    saving: "~60 hod/mes",
    accent: "text-emerald-400",
    bg: "bg-zinc-900",
    border: "border-emerald-900/50",
  },
  {
    icon: RefreshCw,
    title: "Dátové integrácie",
    desc: "Agent synchronizuje dáta medzi ERP, CRM, účtovníctvom a ďalšími systémami. Viac manuálneho kopírovania a exportovania.",
    saving: "~15 hod/mes",
    accent: "text-sky-400",
    bg: "bg-zinc-900",
    border: "border-sky-900/50",
  },
  {
    icon: Clock,
    title: "Plánovanie a dispečing",
    desc: "Automatizácia plánovania kapacít, prideľovania úloh a notifikácií. Agent optimalizuje rozvrh podľa dostupnosti, priority a geografickej polohy.",
    saving: "~30 hod/mes",
    accent: "text-rose-400",
    bg: "bg-zinc-900",
    border: "border-rose-900/50",
  },
];

const AGENT_LOOP = [
  { icon: Eye, title: "Vníma", desc: "Agent sleduje emailový inbox, API endpointy, databázy alebo ľubovoľný zdroj dát v reálnom čase." },
  { icon: Brain, title: "Rozhoduje", desc: "Na základe kontextu a nakonfigurovaných pravidiel agent rozhodne, aký krok podniknúť." },
  { icon: Play, title: "Koná", desc: "Vykoná akciu — zaúčtuje, odošle email, vygeneruje dokument, zavolá API, vytvorí task." },
  { icon: BarChart3, title: "Reportuje", desc: "Zaznamená každú akciu s plným auditným logom. Vy viete čo, kedy a prečo agent urobil." },
];

const DIFFERENTIATORS = [
  {
    icon: Brain,
    title: "Nie ChatGPT wrapper",
    desc: "Neintegrujeme len ChatGPT do formulára. Staviame skutočných autonómnych agentov s dlhodobou pamäťou, plánovaním a schopnosťou orchestreácie viacerých nástrojov.",
  },
  {
    icon: Shield,
    title: "Auditovateľné rozhodnutia",
    desc: "Každé rozhodnutie agenta je zaznamenané s plným kontextom. Viete presne čo, prečo a na základe čoho agent konal — DSGVO compliant.",
  },
  {
    icon: Zap,
    title: "Integrácia s existujúcimi systémami",
    desc: "Agenti sa napoja na vaše existujúce nástroje — email, ERP, CRM, databázy. Nevyžadujeme výmenu systémov, len ich prepojenie.",
  },
  {
    icon: RefreshCw,
    title: "Kontinuálne zlepšovanie",
    desc: "Agenti sa učia z výnimiek a eskalácií. Každý mesiac sú presnejší a pokrývajú viac prípadov bez nutnosti reeditovať kód.",
  },
];

const STATS = [
  { value: "100+", label: "hodín ušetrených mesačne" },
  { value: "24/7", label: "Nepretržitá prevádzka" },
  { value: "70–80%", label: "rutinných úloh automatizovaných" },
  { value: "2 týž.", label: "priemerný čas nasadenia" },
];

const USE_CASES_CZ = [
  {
    icon: FileText,
    title: "Zpracování faktur",
    desc: "Agent automaticky čte příchozí faktury (PDF, email), extrahuje data, ověřuje vůči objednávkám a zaúčtuje — bez lidského zásahu.",
    saving: "~40 hod/měs",
    accent: "text-amber-400",
    bg: "bg-zinc-900",
    border: "border-amber-900/50",
  },
  {
    icon: Mail,
    title: "E-mailová komunikace",
    desc: "AI agent třídí, kategorizuje a odpovídá na rutinní e-maily. Eskaluje pouze to, co skutečně vyžaduje lidskou pozornost.",
    saving: "~25 hod/měs",
    accent: "text-blue-400",
    bg: "bg-zinc-900",
    border: "border-blue-900/50",
  },
  {
    icon: BarChart3,
    title: "Automatické reporty",
    desc: "Každé pondělí ráno dostanete report s klíčovými metrikami, anomáliemi a doporučeními — sestavený agentem z vašich firemních dat.",
    saving: "~20 hod/měs",
    accent: "text-violet-400",
    bg: "bg-zinc-900",
    border: "border-violet-900/50",
  },
  {
    icon: MessageSquare,
    title: "Zákaznická podpora",
    desc: "AI agent řeší 70–80 % rutinních zákaznických požadavků — stavy objednávek, běžné otázky, změny v rezervacích. Živý agent dostane pouze to náročné.",
    saving: "~60 hod/měs",
    accent: "text-emerald-400",
    bg: "bg-zinc-900",
    border: "border-emerald-900/50",
  },
  {
    icon: RefreshCw,
    title: "Datové integrace",
    desc: "Agent synchronizuje data mezi ERP, CRM, účetnictvím a dalšími systémy. Žádné manuální kopírování a exportování.",
    saving: "~15 hod/měs",
    accent: "text-sky-400",
    bg: "bg-zinc-900",
    border: "border-sky-900/50",
  },
  {
    icon: Clock,
    title: "Plánování a dispečink",
    desc: "Automatizace plánování kapacit, přidělování úkolů a notifikací. Agent optimalizuje rozvrh podle dostupnosti, priority a geografické polohy.",
    saving: "~30 hod/měs",
    accent: "text-rose-400",
    bg: "bg-zinc-900",
    border: "border-rose-900/50",
  },
];

const AGENT_LOOP_CZ = [
  { icon: Eye, title: "Vnímá", desc: "Agent sleduje e-mailový inbox, API endpointy, databáze nebo libovolný zdroj dat v reálném čase." },
  { icon: Brain, title: "Rozhoduje", desc: "Na základě kontextu a nakonfigurovaných pravidel agent rozhodne, jaký krok podniknout." },
  { icon: Play, title: "Jedná", desc: "Provede akci — zaúčtuje, odešle e-mail, vygeneruje dokument, zavolá API, vytvoří úkol." },
  { icon: BarChart3, title: "Reportuje", desc: "Zaznamená každou akci s plným auditním logem. Víte co, kdy a proč agent udělal." },
];

const DIFFERENTIATORS_CZ = [
  {
    icon: Brain,
    title: "Ne ChatGPT wrapper",
    desc: "Neintegrujeme jen ChatGPT do formuláře. Stavíme skutečné autonomní agenty s dlouhodobou pamětí, plánováním a schopností orchestrace desítek nástrojů.",
  },
  {
    icon: Shield,
    title: "Auditovatelná rozhodnutí",
    desc: "Každé rozhodnutí agenta je zaznamenáno s plným kontextem. Víte přesně co, proč a na základě čeho agent jednal — DSGVO compliant.",
  },
  {
    icon: Zap,
    title: "Integrace se stávajícími systémy",
    desc: "Agenti se napojí na vaše stávající nástroje — e-mail, ERP, CRM, databáze. Nevyžadujeme výměnu systémů, jen jejich propojení.",
  },
  {
    icon: RefreshCw,
    title: "Kontinuální zlepšování",
    desc: "Agenti se učí z výjimek a eskalací. Každý měsíc jsou přesnější a pokrývají více případů bez nutnosti přepisovat kód.",
  },
];

const STATS_CZ = [
  { value: "100+", label: "hodin ušetřených měsíčně" },
  { value: "24/7", label: "Nepřetržitý provoz" },
  { value: "70–80%", label: "rutinních úkolů automatizováno" },
  { value: "2 týd.", label: "průměrný čas nasazení" },
];

const SK_UI = {
  back: "Späť na hlavnú stránku",
  badge: "Služba · AI Automatizácia",
  h1a: "Autonómni AI agenti",
  h1b: "pracujú za vás",
  sub: "Nie chatoví asistenti. Nie jednoduché automatizácie. Skutočné autonómne AI systémy, ktoré vnímajú, rozhodujú a konajú — 24 hodín denne, 7 dní v týždni, bez dohľadu.",
  cta1: "Chcem AI agenta",
  cta2: "Príklady nasadenia",
  heroName: "AVAR Agent · Faktúry",
  heroActive: "Aktívny",
  heroLogs: [
    { time: "09:42", action: "Prijatá faktúra: Müller GmbH — €4,200", status: "ok" },
    { time: "09:42", action: "Overenie voči objednávke #2847 — zhoda 100%", status: "ok" },
    { time: "09:43", action: "Zaúčtovanie v DATEV — úspešné", status: "ok" },
    { time: "09:43", action: "Notifikácia odoslaná účtovníčke Marte", status: "ok" },
    { time: "09:51", action: "Prijatá faktúra: Bau AG — €11,800", status: "ok" },
    { time: "09:51", action: "Chýbajúca PO — eskalované na Martina K.", status: "warn" },
  ],
  heroFooterA: "Dnes spracovaných:",
  heroFooterB: "23 faktúr",
  heroFooterC: "Eskalácií:",
  diffLabel: "Prečo my",
  diffH2: "Nie len AI. Skutočná autonomia.",
  diffSub: "90 % \"AI riešení\" na trhu sú len formuláre s ChatGPT v pozadí. My staviame agentov s vlastným reasoning cyklom, pamäťou a schopnosťou orchestrovať desiatky nástrojov.",
  loopLabel: "Ako agenti fungujú",
  loopH2: "Reasoning cyklus agenta",
  loopSub: "Každý agent beží v nekonečnej slučke — vníma, premýšľa, koná, zaznamená.",
  ucLabel: "Príklady nasadenia",
  ucH2: "Čo agenti robia u našich klientov",
  ucUnit: "hod / mes",
  onbLabel: "Čo potrebujeme od vás",
  onbH2: "Nasadenie agenta trvá 2 týždne",
  onbSteps: [
    { step: "1.", title: "Úvodný hovor (1h)", desc: "Opíšete nám proces, ktorý chcete automatizovať. Aké sú vstupy, výstupy a výnimky." },
    { step: "2.", title: "Návrh agenta (3 dni)", desc: "Navrhneme architektúru agenta, toolset a pravidlá eskalácie. Odsúhlasíte pred vývojom." },
    { step: "3.", title: "Vývoj a nasadenie (7–10 dní)", desc: "Nastavíme, otestujeme a nasadíme agenta do vašej infraštruktúry. Dostanete plný auditný log." },
  ],
  reqs: ["Prístup k vášmu emailu / systému", "1 hodina na discovery", "Testovacia sada dát", "Schvaľovanie výnimiek počas pilotu"],
  ctaLabel: "Strategický hovor",
  ctaH2: "Ktorý proces chcete automatizovať?",
  ctaDesc: "Ukážte nám jeden manuálny proces, ktorý vám berie čas. Navrhneme agenta, odhadneme ROI a dohodneme sa na pilotnom projekte.",
  ctaBtn: "Chcem AI agenta — dohodneme sa",
  ctaFine: "30 minút · analýza procesu zadarmo · bez záväzkov",
};

const CZ_UI = {
  back: "Zpět na hlavní stránku",
  badge: "Služba · AI Automatizace",
  h1a: "Autonomní AI agenti",
  h1b: "pracují za vás",
  sub: "Ne chatovací asistenti. Ne jednoduché automatizace. Skutečné autonomní AI systémy, které vnímají, rozhodují a jednají — 24 hodin denně, 7 dní v týdnu, bez dohledu.",
  cta1: "Chci AI agenta",
  cta2: "Příklady nasazení",
  heroName: "AVAR Agent · Faktury",
  heroActive: "Aktivní",
  heroLogs: [
    { time: "09:42", action: "Přijatá faktura: Müller GmbH — €4,200", status: "ok" },
    { time: "09:42", action: "Ověření vůči objednávce #2847 — shoda 100%", status: "ok" },
    { time: "09:43", action: "Zaúčtování v DATEV — úspěšné", status: "ok" },
    { time: "09:43", action: "Notifikace odeslána účetní Martě", status: "ok" },
    { time: "09:51", action: "Přijatá faktura: Bau AG — €11,800", status: "ok" },
    { time: "09:51", action: "Chybějící PO — eskalováno na Martina K.", status: "warn" },
  ],
  heroFooterA: "Dnes zpracováno:",
  heroFooterB: "23 faktur",
  heroFooterC: "Eskalací:",
  diffLabel: "Proč my",
  diffH2: "Ne jen AI. Skutečná autonomie.",
  diffSub: "90 % \"AI řešení\" na trhu jsou jen formuláře s ChatGPT v pozadí. My stavíme agenty s vlastním reasoning cyklem, pamětí a schopností orchestrace desítek nástrojů.",
  loopLabel: "Jak agenti fungují",
  loopH2: "Reasoning cyklus agenta",
  loopSub: "Každý agent běží v nekonečné smyčce — vnímá, přemýšlí, jedná, zaznamená.",
  ucLabel: "Příklady nasazení",
  ucH2: "Co agenti dělají u našich klientů",
  ucUnit: "hod / měs",
  onbLabel: "Co potřebujeme od vás",
  onbH2: "Nasazení agenta trvá 2 týdny",
  onbSteps: [
    { step: "1.", title: "Úvodní hovor (1h)", desc: "Popíšete nám proces, který chcete automatizovat. Jaké jsou vstupy, výstupy a výjimky." },
    { step: "2.", title: "Návrh agenta (3 dny)", desc: "Navrhneme architekturu agenta, toolset a pravidla eskalace. Odsouhlasíte před vývojem." },
    { step: "3.", title: "Vývoj a nasazení (7–10 dní)", desc: "Nastavíme, otestujeme a nasadíme agenta do vaší infrastruktury. Dostanete plný auditní log." },
  ],
  reqs: ["Přístup k vašemu e-mailu / systému", "1 hodina na discovery", "Testovací sada dat", "Schvalování výjimek během pilotu"],
  ctaLabel: "Strategický hovor",
  ctaH2: "Který proces chcete automatizovat?",
  ctaDesc: "Ukažte nám jeden manuální proces, který vám bere čas. Navrhneme agenta, odhadneme ROI a dohodneme se na pilotním projektu.",
  ctaBtn: "Chci AI agenta — domluvíme se",
  ctaFine: "30 minut · analýza procesu zdarma · bez závazků",
};

export default function AIAgentsPage() {
  const { lang } = useLanguage();
  const ui = lang === "cz" ? CZ_UI : SK_UI;
  const useCases = lang === "cz" ? USE_CASES_CZ : USE_CASES;
  const agentLoop = lang === "cz" ? AGENT_LOOP_CZ : AGENT_LOOP;
  const differentiators = lang === "cz" ? DIFFERENTIATORS_CZ : DIFFERENTIATORS;
  const stats = lang === "cz" ? STATS_CZ : STATS;
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400/80 hover:bg-yellow-400/95 backdrop-blur-md text-zinc-900 font-semibold text-sm border border-yellow-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(250,204,21,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_6px_28px_rgba(234,179,8,0.5)] transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  {ui.cta1}
                </motion.a>
                <motion.a
                  href="#use-cases"
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

            {/* Hero visual — agent activity feed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="hidden lg:block"
            >
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={900} scale={1.02} transitionSpeed={400} glareEnable={true} glareMaxOpacity={0.08} glareColor="#facc15" glarePosition="all">
              <div className="bg-zinc-900 rounded-3xl border border-zinc-700/60 shadow-[0_24px_80px_rgba(0,0,0,0.35)] p-6" style={{ transformStyle: "preserve-3d" }}>
                <div className="flex items-center justify-between mb-4" style={{ transform: "translateZ(6px)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-yellow-400 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-zinc-900" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-200">{ui.heroName}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {ui.heroActive}
                  </span>
                </div>
                <div className="space-y-2.5">
                  {ui.heroLogs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: EASE }}
                      className="flex items-start gap-3 px-3 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/50"
                    >
                      <span className="text-[10px] font-mono text-zinc-500 mt-0.5 flex-shrink-0">{log.time}</span>
                      <span className={`text-xs leading-relaxed ${log.status === "warn" ? "text-amber-400" : "text-zinc-300"}`}>
                        {log.action}
                      </span>
                      <span className={`ml-auto text-[10px] font-semibold flex-shrink-0 ${log.status === "warn" ? "text-amber-500" : "text-emerald-500"}`}>
                        {log.status === "warn" ? "⚠" : "✓"}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-700/50 flex items-center justify-between" style={{ transform: "translateZ(4px)" }}>
                  <span className="text-xs text-zinc-400">{ui.heroFooterA} <strong className="text-zinc-200">{ui.heroFooterB}</strong></span>
                  <span className="text-xs text-zinc-400">{ui.heroFooterC} <strong className="text-amber-400">1</strong></span>
                </div>
              </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-zinc-800 bg-zinc-900 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.07)} className="text-center">
              <p className="font-calsans text-3xl font-extrabold text-white">{s.value}</p>
              <p className="text-zinc-400 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Why we're different ── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">{ui.diffLabel}</p>
            <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              {ui.diffH2}
            </h2>
            <p className="mt-4 text-zinc-500 max-w-lg mx-auto text-sm leading-relaxed">
              {ui.diffSub}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {differentiators.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div key={d.title} {...fadeUp(i * 0.08)}>
                  <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} perspective={900} scale={1.02} transitionSpeed={500} glareEnable={true} glareMaxOpacity={0.07} glareColor="#facc15" glarePosition="all" className="h-full">
                  <div className="bg-zinc-900 border border-zinc-700/60 rounded-3xl p-7 h-full relative overflow-hidden group" style={{ transformStyle: "preserve-3d" }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
                    <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-5 group-hover:bg-yellow-400/20 transition-colors duration-300" style={{ transform: "translateZ(8px)" }}>
                      <Icon className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h3 className="font-calsans font-bold text-white mb-3" style={{ transform: "translateZ(6px)" }}>{d.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed" style={{ transform: "translateZ(4px)" }}>{d.desc}</p>
                  </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Agent loop ── */}
      <section className="relative py-24 px-6 bg-zinc-50 border-t border-zinc-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-yellow-300/[0.12] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-200/[0.14] blur-[80px] pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">{ui.loopLabel}</p>
            <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              {ui.loopH2}
            </h2>
            <p className="mt-4 text-zinc-500 max-w-md mx-auto text-sm">{ui.loopSub}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {agentLoop.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} {...fadeUp(i * 0.1)}>
                  <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={800} scale={1.03} transitionSpeed={400} glareEnable={true} glareMaxOpacity={0.18} glareColor="#ffffff" glarePosition="top" className="h-full">
                  <div
                    className="relative rounded-2xl p-6 h-full text-center overflow-hidden"
                    style={{
                      transformStyle: "preserve-3d",
                      background: "linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.52) 100%)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      border: "1px solid rgba(255,255,255,0.75)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.07), 0 1.5px 6px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.03)",
                    }}
                  >
                    {/* Inner specular shimmer */}
                    <div className="absolute top-0 left-0 w-3/4 h-px bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
                    <motion.div
                      className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-4"
                      style={{ transform: "translateZ(8px)", boxShadow: "0 4px 16px rgba(250,204,21,0.45)" }}
                      animate={{ boxShadow: [
                        "0 4px 16px rgba(250,204,21,0.35)",
                        "0 4px 24px rgba(250,204,21,0.65)",
                        "0 4px 16px rgba(250,204,21,0.35)",
                      ]}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    >
                      <Icon className="w-5 h-5 text-zinc-900" />
                    </motion.div>
                    <h3 className="font-semibold text-zinc-900 text-sm mb-2" style={{ transform: "translateZ(6px)" }}>{step.title}</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed" style={{ transform: "translateZ(4px)" }}>{step.desc}</p>
                    {i < agentLoop.length - 1 && (
                      <div className="hidden lg:block absolute top-10 -right-2.5 w-5 h-px bg-zinc-300/60" />
                    )}
                  </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section id="use-cases" className="relative py-28 px-6 bg-zinc-950 border-t border-zinc-800 overflow-hidden">
        {/* Atmospheric glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-yellow-400/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-amber-500/[0.05] blur-[100px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">{ui.ucLabel}</p>
            <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {ui.ucH2}
            </h2>
          </motion.div>

          {/* Bento grid: row1 = [0:4col][1:2col], row2 = [2:2col][3:2col][4:2col], row3 = [5:6col] */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              const num = parseInt(uc.saving.replace(/[^0-9]/g, ""));
              const rgb = ACCENT_RGBS[i];
              const isLarge = i === 0;
              const isWide = i === 5;
              const colSpan = isLarge
                ? "col-span-2 md:col-span-4"
                : isWide
                ? "col-span-2 md:col-span-6"
                : "col-span-2 md:col-span-2";
              return (
                <motion.div key={uc.title} {...fadeUp(i * 0.08)} className={colSpan}>
                  <Tilt
                    tiltMaxAngleX={isLarge ? 5 : 9}
                    tiltMaxAngleY={isLarge ? 5 : 9}
                    perspective={900}
                    scale={1.02}
                    transitionSpeed={400}
                    glareEnable={true}
                    glareMaxOpacity={0.1}
                    glareColor={`rgb(${rgb})`}
                    glarePosition="all"
                    className="h-full"
                  >
                    <div
                      className="relative bg-zinc-900 border rounded-2xl h-full overflow-hidden"
                      style={{
                        transformStyle: "preserve-3d",
                        borderColor: `rgba(${rgb},0.30)`,
                        boxShadow: `0 4px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)`,
                      }}
                    >
                      {/* Accent top line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(to right, transparent, rgba(${rgb},0.7), transparent)` }}
                      />
                      {/* Accent inner glow */}
                      <div
                        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${rgb},0.10), transparent 70%)` }}
                      />

                      <div className={`p-6 flex h-full ${isWide ? "flex-col sm:flex-row sm:items-center sm:gap-8" : "flex-col"}`}>
                        {/* Pulsing LIVE badge */}
                        <div className="flex items-center gap-1.5 mb-4 self-start">
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: `rgb(${rgb})` }}
                            animate={{ scale: [1, 1.8, 1], opacity: [0.9, 0.4, 0.9] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
                          />
                          <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: `rgba(${rgb},0.7)` }}>LIVE</span>
                        </div>

                        {/* Floating icon */}
                        <motion.div
                          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                          style={{
                            backgroundColor: `rgba(${rgb},0.12)`,
                            border: `1px solid rgba(${rgb},0.3)`,
                            transform: "translateZ(8px)",
                          }}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.45 }}
                        >
                          <Icon className={`w-5 h-5 ${uc.accent}`} />
                        </motion.div>

                        {/* Title + desc */}
                        <div className={isWide ? "flex-1" : "flex-1"}>
                          <h3
                            className={`font-semibold text-white mb-2 ${isLarge ? "text-base" : "text-sm"}`}
                            style={{ transform: "translateZ(5px)" }}
                          >{uc.title}</h3>
                          <p className="text-zinc-400 text-xs leading-relaxed" style={{ transform: "translateZ(3px)" }}>{uc.desc}</p>
                        </div>

                        {/* Count-up savings */}
                        <div
                          className={`flex-shrink-0 ${isWide ? "sm:text-right" : "mt-4 pt-3 border-t border-zinc-800"}`}
                          style={{ transform: "translateZ(6px)" }}
                        >
                          <span
                            className={`font-calsans font-extrabold leading-none block ${isLarge ? "text-4xl" : "text-2xl"}`}
                            style={{ color: `rgb(${rgb})` }}
                          >~<CountUp to={num} /></span>
                          <span className="text-[10px] text-zinc-500 mt-0.5 block">{ui.ucUnit}</span>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What we need from you ── */}
      <section className="relative py-20 px-6 bg-zinc-50 border-t border-zinc-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-yellow-300/[0.12] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-200/[0.14] blur-[80px] pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">{ui.onbLabel}</p>
            <h2 className="font-calsans text-3xl font-extrabold text-zinc-900 tracking-tight">
              {ui.onbH2}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {ui.onbSteps.map((item, i) => (
              <motion.div key={item.title} {...fadeUp(i * 0.1)}>
                <Tilt tiltMaxAngleX={9} tiltMaxAngleY={9} perspective={800} scale={1.03} transitionSpeed={400} glareEnable={true} glareMaxOpacity={0.18} glareColor="#ffffff" glarePosition="top" className="h-full">
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
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
                  <div className="absolute top-0 left-0 w-3/4 h-px bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
                  <span className="font-calsans text-3xl font-extrabold text-zinc-200 block leading-none mb-3" style={{ transform: "translateZ(2px)" }}>{item.step}</span>
                  <h3 className="font-semibold text-zinc-900 mb-2 text-sm" style={{ transform: "translateZ(6px)" }}>{item.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed" style={{ transform: "translateZ(4px)" }}>{item.desc}</p>
                </div>
                </Tilt>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp(0.2)}
            className="mt-8 rounded-2xl p-5"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.52) 100%)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.75)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.07), 0 1.5px 6px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.03)",
            }}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {ui.reqs.map((req) => (
                <div key={req} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                  <span className="text-zinc-700 text-sm">{req}</span>
                </div>
              ))}
            </div>
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
