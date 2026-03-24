"use client";

import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Bot, Check, ArrowUpRight, FileText, Mail, BarChart3, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "24/7", label: "Nepretržitá prevádzka" },
  { value: "10×",  label: "Rýchlejšie procesy"    },
  { value: "99.9%",label: "Presnosť výstupov"     },
];

const USE_CASES = [
  { icon: FileText,  label: "Fakturácia",            color: "#eab308" },
  { icon: Mail,      label: "Zákaznícka podpora",    color: "#10b981" },
  { icon: BarChart3, label: "Reporting",             color: "#8b5cf6" },
  { icon: Clock,     label: "Booking & plánovanie",  color: "#f59e0b" },
];

const FEED = [
  { time: "09:42", text: "Faktúra #1047 vygenerovaná a odoslaná",  done: true  },
  { time: "09:41", text: "KW 11 výkaz schválený manažérom",         done: true  },
  { time: "09:39", text: "Email — Kováč Bau GmbH odoslaný",         done: true  },
  { time: "09:37", text: "Zmluva #284 zarchivovaná",                done: true  },
  { time: "Teraz", text: "Spracúvam faktúry za apríl…",            done: false },
];

// ─── Agent Interface ──────────────────────────────────────────────────────────

function AgentInterface() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= FEED.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 380);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} perspective={900} scale={1.02} transitionSpeed={500} glareEnable={true} glareMaxOpacity={0.07} glareColor="#facc15" glarePosition="all">
    <div className="group relative bg-zinc-900 border border-zinc-700/60 hover:border-yellow-400/30 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_28px_70px_rgba(0,0,0,0.45)] transition-all duration-300" style={{ transformStyle: "preserve-3d" }}>
      {/* Yellow top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
      {/* Corner hover glow */}
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-yellow-300/[0.35] blur-[55px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-yellow-400/15 border border-yellow-400/25 flex items-center justify-center">
            <Bot className="w-4 h-4 text-yellow-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-200 leading-none">VRATVAR AI Agent</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">Fakturácia & Účtovníctvo</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-emerald-400 font-semibold">Live</span>
        </div>
      </div>

      {/* Feed */}
      <div className="px-5 py-5 space-y-3.5 min-h-[220px]">
        <AnimatePresence>
          {FEED.slice(0, visible).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex items-start gap-3"
            >
              <span className="text-[9px] font-mono text-zinc-600 mt-0.5 w-9 flex-shrink-0 pt-[1px]">
                {item.time}
              </span>
              <div className={`w-[18px] h-[18px] rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                item.done
                  ? "bg-emerald-500/15 border border-emerald-500/30"
                  : "bg-yellow-400/15 border border-yellow-400/30"
              }`}>
                {item.done ? (
                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                ) : (
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-yellow-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                  />
                )}
              </div>
              <p className={`text-xs leading-relaxed ${item.done ? "text-zinc-400" : "text-zinc-200"}`}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer stats */}
      <div className="grid grid-cols-3 border-t border-zinc-800">
        {[
          { val: "1 204", label: "Faktúry" },
          { val: "0",     label: "Chyby"   },
          { val: "320 h", label: "Ušetrené"},
        ].map((s, i) => (
          <div key={i} className={`px-4 py-3 text-center ${i < 2 ? "border-r border-zinc-800" : ""}`}>
            <p className="font-calsans text-sm font-bold text-white">{s.val}</p>
            <p className="text-[9px] text-zinc-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
    </Tilt>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function AIAgentsSection() {
  return (
    <section
      id="ai-agents"
      className="relative py-28 md:py-36 px-6 border-t border-zinc-100 overflow-hidden bg-white"
    >
      <div className="absolute top-0 right-0 w-[560px] h-[560px] rounded-full bg-yellow-300/[0.07] blur-[140px] pointer-events-none" aria-hidden />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-8"
          >
            <motion.div variants={fadeUp}>
              <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                AI Agenti
              </p>
              <h2 className="font-calsans text-4xl sm:text-5xl font-extrabold text-zinc-900 leading-[1.08] tracking-tight">
                Zamestnajte AI.<br />
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Ušetrite stovky hodín.</span>
              </h2>
            </motion.div>

            <motion.p variants={fadeUp} className="text-zinc-500 text-lg leading-relaxed max-w-lg">
              Nasadzujeme autonómnych AI agentov pre fakturáciu, zákaznícku
              podporu a reporting. Pracujú nepretržite — bez chýb, bez prestávky.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-calsans text-2xl font-extrabold text-zinc-900">{s.value}</p>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Use-case tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {USE_CASES.map((uc) => {
                const Icon = uc.icon;
                return (
                  <div
                    key={uc.label}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium hover:border-zinc-700 hover:text-zinc-300 transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: uc.color }} />
                    {uc.label}
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                href="/ai-agents"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-yellow-400/80 hover:bg-yellow-400/95 backdrop-blur-md text-zinc-900 font-semibold text-sm border border-yellow-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(250,204,21,0.35)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_6px_28px_rgba(234,179,8,0.45)] transition-all duration-200"
              >
                Zistiť viac o AI agentoch
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Right ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
          >
            <AgentInterface />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
