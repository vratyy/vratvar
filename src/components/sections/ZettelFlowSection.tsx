"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Timer, FileText, BarChart3, ArrowUpRight, ArrowRight } from "lucide-react";
import Tilt from "react-parallax-tilt";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: EASE, delay },
});

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const STATS = [
  { value: "120+", label: "hodín ušetrených mesačne" },
  { value: "0",    label: "chýb v účtovníctve" },
  { value: "2 týž.", label: "čas implementácie" },
  { value: "100%", label: "DACH compliance" },
];

const FEATURES = [
  {
    icon: Timer,
    tag: "Sledovanie času",
    title: "Smart Stundenzettel",
    desc: "Montéri logujú hodiny z mobilu. Systém generuje právne platné výkazy s KW číslovaním a digitálnym podpisom.",
    stat: "120+",
    statLabel: "hod / mesiac",
    accent: "text-blue-400",
    accentDot: "bg-blue-400",
    hover: "from-blue-400/[0.06] to-transparent",
    bullets: ["Mobilná app pre terén", "KW číslovanie (DE štandard)", "PDF s digitálnym podpisom"],
  },
  {
    icon: FileText,
    tag: "Fakturácia",
    title: "Zero-Touch Fakturácia",
    desc: "Po schválení výkazu systém vygeneruje faktúru, odošle zákazníkovi a zaúčtuje platbu — bez kliknutia.",
    stat: "0",
    statLabel: "chýb v účtoch",
    accent: "text-amber-400",
    accentDot: "bg-amber-400",
    hover: "from-amber-400/[0.06] to-transparent",
    bullets: ["Automatické generovanie", "Chronologické číslovanie", "Integrácia DATEV / SAP"],
  },
  {
    icon: BarChart3,
    tag: "Analytika",
    title: "Live Finančný Dashboard",
    desc: "Kompletný prehľad firmy v reálnom čase — faktúry, výkonnosť tímu a cash flow na jednej obrazovke.",
    stat: "94%",
    statLabel: "faktúr zaplatených",
    accent: "text-emerald-400",
    accentDot: "bg-emerald-400",
    hover: "from-emerald-400/[0.06] to-transparent",
    bullets: ["Live cash flow", "Rentabilita projektov", "Export XML / CSV / PDF"],
  },
];

export function ZettelFlowSection() {
  return (
    <section id="zettelflow" className="relative py-32 md:py-40 px-6 border-t border-zinc-100 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-yellow-300/[0.15] blur-[100px] pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="mb-12 md:mb-16">
          <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Náš produkt
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
            <h2 className="font-calsans text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight tracking-[-0.025em]">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">ZettelFlow:</span> Riadiace stredisko<br className="hidden sm:block" /> pre vaše stavby
            </h2>
            <Link
              href="/zettelflow"
              className="inline-flex items-center gap-1.5 text-sm text-yellow-600 hover:text-yellow-700 transition-colors duration-200 font-medium group flex-shrink-0"
            >
              Pozrieť detaily
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
          <p className="max-w-2xl text-zinc-600 text-lg leading-relaxed">
            Jeden systém. Všetky procesy. Od sledovania hodín cez automatickú fakturáciu až po
            live finančné reporty — ZettelFlow eliminuje manuálnu prácu.
          </p>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          {...fadeUp(0.1)}
          className="rounded-2xl bg-zinc-900 border border-zinc-800 px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
        >
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-calsans text-2xl md:text-3xl font-extrabold text-white">{s.value}</p>
              <p className="text-zinc-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Feature Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} variants={cardVariants} className="h-full">
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={900}
                  scale={1.02}
                  transitionSpeed={450}
                  glareEnable={true}
                  glareMaxOpacity={0.07}
                  glareColor="#facc15"
                  glarePosition="all"
                  className="h-full"
                >
                  <div
                    className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col h-full overflow-hidden group hover:border-zinc-700 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-500"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${f.hover} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className="absolute -bottom-4 -right-2 font-calsans text-[120px] leading-none font-extrabold text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.05] transition-colors duration-500" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center group-hover:border-zinc-600 transition-colors duration-300">
                        <Icon className={`w-5 h-5 ${f.accent}`} />
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-zinc-600 tracking-[0.2em] group-hover:text-zinc-500 transition-colors duration-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase mb-3 block ${f.accent}`}>{f.tag}</span>
                    <h3 className="font-calsans text-2xl text-white mb-3 leading-tight">{f.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{f.desc}</p>

                    <ul className="space-y-1.5 mb-6">
                      {f.bullets.map((b, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-zinc-500">
                          <span className={`w-1 h-1 rounded-full flex-shrink-0 ${f.accentDot}`} />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-zinc-800">
                      <span className={`font-calsans text-3xl font-extrabold ${f.accent}`}>{f.stat}</span>
                      <span className="text-zinc-500 text-xs ml-2">{f.statLabel}</span>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div {...fadeUp(0.2)} className="mt-10 flex justify-center">
          <Link
            href="/zettelflow"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-semibold text-sm transition-colors duration-200 shadow-sm"
          >
            Zistiť viac o ZettelFlow
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
