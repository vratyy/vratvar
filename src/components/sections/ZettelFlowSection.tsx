"use client";

import { motion, type Variants } from "framer-motion";
import { Timer, FileText, BarChart3, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Tilt from "react-parallax-tilt";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

// ─── Card Visuals ────────────────────────────────────────────────────────────

function TimeEntriesVisual() {
  const entries = [
    { range: "09:00 – 11:30", project: "ZettelFlow v2.1", h: "2.5h" },
    { range: "12:00 – 14:45", project: "VRATVAR onboarding", h: "2.75h" },
    { range: "15:00 – 17:00", project: "API integration", h: "2.0h" },
  ];
  return (
    <div className="mt-5 space-y-2">
      {entries.map((e, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.09, duration: 0.45, ease: EASE }}
          className="flex items-center gap-3 rounded-xl bg-zinc-50 border border-zinc-100 px-3 py-2.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
          <span className="text-[11px] text-zinc-500 font-mono w-24 flex-shrink-0">
            {e.range}
          </span>
          <span className="text-[11px] text-zinc-600 flex-1 truncate">{e.project}</span>
          <span className="text-[11px] font-mono text-yellow-600/90">{e.h}</span>
          <span className="text-[10px] text-yellow-600 font-semibold">✓ Auto</span>
        </motion.div>
      ))}
    </div>
  );
}

function InvoiceVisual() {
  return (
    <div className="mt-5">
      <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest">
            FAK-2025-087
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-[10px] text-yellow-600 font-medium">Odoslaná</span>
          </span>
        </div>
        <div className="h-px bg-zinc-100" />
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] text-zinc-600">Celková suma</span>
          <span className="text-xl font-bold text-zinc-900">€2,450.00</span>
        </div>
        <div className="text-[10px] text-zinc-600">BRATISLAVA SOLUTIONS s.r.o.</div>
        <div className="mt-1 w-full h-1 rounded-full bg-zinc-100 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
          />
        </div>
        <div className="text-[9px] text-zinc-500 text-right">Spracované automaticky</div>
      </div>
    </div>
  );
}

function DashboardVisual() {
  const bars = [38, 55, 44, 70, 52, 84, 66, 78, 61, 92, 73, 82];
  const labels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const max = Math.max(...bars);
  return (
    <div className="mt-5">
      <div className="flex items-end gap-1 h-28" aria-hidden>
        {bars.map((h, i) => {
          const isMax = h === max;
          return (
            <motion.div
              key={i}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.55, ease: EASE }}
              className="flex-1 rounded-t-md origin-bottom transition-all duration-300 hover:brightness-90"
              style={{
                height: `${h}%`,
                background: isMax
                  ? "linear-gradient(to top, #ca8a04, #fde047)"
                  : "linear-gradient(to top, #eab308, #fef08a)",
              }}
            />
          );
        })}
      </div>
      <div className="flex gap-1 mt-1.5">
        {labels.map((l, i) => (
          <span key={i} className="flex-1 text-center text-[8px] text-zinc-300 font-mono">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Feature Card Data ────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Timer,
    tag: "Sledovanie času",
    title: "Smart Stundenzettel",
    description:
      "Právne nepriestrelné nemecké výkazy. Montéri logujú hodiny cez mobil, systém generuje PDF s digitálnym podpisom.",
    visual: <TimeEntriesVisual />,
    gridClass: "md:col-span-2",
    minHeight: "min-h-[320px]",
  },
  {
    icon: FileText,
    tag: "Fakturácia",
    title: "Zero-Touch Fakturácia",
    description:
      "Automatické generovanie faktúr po schválení. Striktné chronologické číslovanie a presné priraďovanie kalendárnych týždňov (KW).",
    visual: <InvoiceVisual />,
    gridClass: "md:col-span-1",
    minHeight: "min-h-[320px]",
  },
  {
    icon: BarChart3,
    tag: "Analytika",
    title: "Live Finančný Dashboard",
    description:
      "Čísla, ktoré sedia na cent. Zaevidované, čakajúce a zaplatené financie v reálnom čase bez byrokratickej brzdy.",
    visual: <DashboardVisual />,
    gridClass: "md:col-span-3",
    minHeight: "min-h-[200px]",
  },
] as const;

// ─── Main Section ─────────────────────────────────────────────────────────────

export function ZettelFlowSection() {
  return (
    <section id="zettelflow" className="relative py-32 md:py-40 px-6 border-t border-zinc-100">
      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-yellow-300/[0.15] blur-[100px] pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-16 md:mb-20"
        >
          <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Náš produkt
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-calsans text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight tracking-[-0.025em]"
            >
              ZettelFlow: Riadiace stredisko pre vaše stavby
            </h2>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-sm text-yellow-600 hover:text-yellow-700 transition-colors duration-200 font-medium group flex-shrink-0"
            >
              Vyžiadať demo
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
          <p className="mt-5 max-w-2xl text-zinc-600 text-lg leading-relaxed">
            Jeden systém. Všetky procesy. Od sledovania hodín cez automatickú fakturáciu až po
            live finančné reporty — ZettelFlow eliminuje manuálnu prácu.
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className={cn(feature.gridClass)}
              >
                <Tilt
                  tiltMaxAngleX={9}
                  tiltMaxAngleY={9}
                  perspective={900}
                  scale={1.03}
                  transitionSpeed={450}
                  glareEnable={true}
                  glareMaxOpacity={0.06}
                  glareColor="#facc15"
                  glarePosition="all"
                  className="h-full"
                >
                  <div
                    className={cn(
                      "group relative rounded-3xl border border-zinc-700/60 bg-zinc-900",
                      "p-8 md:p-10 overflow-hidden h-full",
                      "hover:border-yellow-400/30",
                      "shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_24px_64px_rgb(0,0,0,0.45)]",
                      "transition-all duration-300",
                      feature.minHeight
                    )}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Top yellow accent stripe */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />

                    {/* Corner glow on hover */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-yellow-300/[0.4] blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Tag + Icon */}
                    <div
                      className="flex items-center justify-between mb-4"
                      style={{ transform: "translateZ(8px)" }}
                    >
                      <span className="text-xs text-emerald-400/80 font-semibold tracking-[0.2em] uppercase">
                        {feature.tag}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/25 flex items-center justify-center group-hover:bg-yellow-400/20 group-hover:border-yellow-400/40 transition-all duration-300">
                        <Icon className="w-4 h-4 text-yellow-400" />
                      </div>
                    </div>

                    {/* Title + Description */}
                    <h3
                      className="font-calsans text-xl md:text-2xl font-semibold text-white leading-snug tracking-tight"
                      style={{ transform: "translateZ(6px)" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-base text-zinc-400 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Visual */}
                    {feature.visual}
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
