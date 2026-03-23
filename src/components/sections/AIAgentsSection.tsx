"use client";

import { useState, useEffect, useRef } from "react";
import type { ComponentType } from "react";
import Link from "next/link";
import { motion, useAnimationFrame, useMotionValue, useTransform, AnimatePresence, type Variants } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Bot, FileText, Mail, BarChart3, Shield, Zap, Database, Clock, FileSearch, CalendarCheck, Receipt } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

// ─── Data ────────────────────────────────────────────────────────────────────

type FeatureCard = {
  icon: ComponentType<{ className?: string }>;
  color: string;
  stat: string;
  statLabel: string;
  title: string;
  sub: string;
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    icon: FileSearch,
    color: "#eab308",
    stat: "< 2s",
    statLabel: "vyhľadávanie",
    title: "Prehľadávanie zmlúv",
    sub: "AI indexuje a nájde akúkoľvek klauzulu v sekundách",
  },
  {
    icon: CalendarCheck,
    color: "#10b981",
    stat: "24/7",
    statLabel: "dostupnosť",
    title: "Automatizovaný booking",
    sub: "Rezervácie, pripomienky a správa kapacít kliniky",
  },
  {
    icon: Receipt,
    color: "#8b5cf6",
    stat: "99.9%",
    statLabel: "presnosť",
    title: "Predspracovanie faktúr",
    sub: "Nulová chybovosť pri extrakcii a kategorizácii dát",
  },
];

// ─── Orbit Data ──────────────────────────────────────────────────────────────

type NodeDef = { icon: ComponentType<{ className?: string }>; offset: number; color: string };

const OUTER_NODES: NodeDef[] = [
  { icon: FileText, offset: 0,                color: "#eab308" },
  { icon: Mail,     offset: Math.PI * 0.5,    color: "#10b981" },
  { icon: BarChart3,offset: Math.PI,          color: "#f59e0b" },
  { icon: Shield,   offset: Math.PI * 1.5,   color: "#8b5cf6" },
];

const INNER_NODES: NodeDef[] = [
  { icon: Zap,      offset: Math.PI * 0.25,  color: "#facc15" },
  { icon: Database, offset: Math.PI,         color: "#06b6d4" },
  { icon: Clock,    offset: Math.PI * 1.75,  color: "#6366f1" },
];

const ACTIVITY = [
  "Faktúra #1047 spracovaná",
  "KW výkaz vygenerovaný",
  "Email odoslaný klientovi",
  "Zmluva zarchivovaná",
];

// ─── OrbitNode ────────────────────────────────────────────────────────────────

interface OrbitNodeProps {
  icon: ComponentType<{ className?: string }>;
  speed: number;
  rx: number;
  ry: number;
  offset: number;
  color: string;
  size?: "sm" | "md";
}

function OrbitNode({ icon: Icon, speed, rx, ry, offset, color, size = "md" }: OrbitNodeProps) {
  const startRef = useRef<number | null>(null);
  const x = useMotionValue(Math.cos(offset) * rx);
  const y = useMotionValue(Math.sin(offset) * ry);
  const scale = useTransform(y, [-ry, ry], [0.68, 1.12]);
  const opacity = useTransform(y, [-ry, ry], [0.42, 1]);
  const zIndex = useTransform(y, [-ry, ry], [1, 25]);

  useAnimationFrame((t) => {
    if (startRef.current === null) startRef.current = t;
    const a = ((t - startRef.current) / 1000) * speed + offset;
    x.set(Math.cos(a) * rx);
    y.set(Math.sin(a) * ry);
  });

  const halfSz = size === "sm" ? -16 : -20;
  const sz = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const iconSz = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{ x, y, scale, opacity, zIndex }}
    >
      <div
        className={`${sz} rounded-2xl bg-zinc-900 flex items-center justify-center`}
        style={{
          marginLeft: halfSz,
          marginTop: halfSz,
          color,
          border: `1px solid rgba(255,255,255,0.07)`,
          boxShadow: `0 4px 14px rgba(0,0,0,0.45), 0 0 12px ${color}40`,
        }}
      >
        <Icon className={iconSz} />
      </div>
    </motion.div>
  );
}

// ─── Activity Badge ───────────────────────────────────────────────────────────

function ActivityBadge() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % ACTIVITY.length);
        setShow(true);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute bottom-3 left-0 right-0 flex justify-center z-30 pointer-events-none">
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700/60 rounded-full px-3 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-[10px] text-zinc-300 font-medium whitespace-nowrap">
              {ACTIVITY[idx]}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Radar Sweep ─────────────────────────────────────────────────────────────

function RadarSweep() {
  return (
    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 292deg, rgba(250,204,21,0.02) 308deg, rgba(250,204,21,0.1) 332deg, rgba(250,204,21,0.28) 354deg, rgba(250,204,21,0.05) 360deg)",
        }}
      />
    </div>
  );
}

// ─── Spin Ring ───────────────────────────────────────────────────────────────

function SpinRing({ r, alpha, dash, duration, ccw = false }: {
  r: number; alpha: number; dash: string; duration: number; ccw?: boolean;
}) {
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 420 420"
      fill="none"
      animate={{ rotate: ccw ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="210" cy="210" r={r} stroke={`rgba(250,204,21,${alpha})`} strokeWidth="1" strokeDasharray={dash} fill="none" />
    </motion.svg>
  );
}

// ─── AI Visual ───────────────────────────────────────────────────────────────

function AIVisual() {
  return (
    <div className="relative flex items-center justify-center w-full max-w-[420px] aspect-square mx-auto select-none">

      {/* ── Dot grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(250,204,21,0.55) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.09,
          maskImage: "radial-gradient(circle at center, black 35%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 72%)",
        }}
      />

      {/* ── Atmospheric glow layers ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.14, 0.32, 0.14], scale: [0.92, 1.07, 0.92] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle at 50% 56%, rgba(250,204,21,0.32) 0%, rgba(234,179,8,0.1) 48%, transparent 68%)",
        }}
      />
      <motion.div
        className="absolute inset-[18%] pointer-events-none"
        animate={{ opacity: [0.2, 0.58, 0.2], scale: [1, 1.24, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        style={{
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(234,179,8,0.42) 0%, transparent 65%)",
          filter: "blur(18px)",
        }}
      />

      {/* ── Radar sweep ── */}
      <RadarSweep />

      {/* ── Spinning decorative rings (4, alternating directions) ── */}
      <SpinRing r={168} alpha={0.1}  dash="3 14" duration={28} />
      <SpinRing r={152} alpha={0.16} dash="1 6"  duration={20} ccw />
      <SpinRing r={105} alpha={0.19} dash="5 9"  duration={22} />
      <SpinRing r={58}  alpha={0.3}  dash="2 5"  duration={11} ccw />

      {/* ── Static elliptical orbit guides + crosshair ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 420 420" fill="none" aria-hidden>
        <ellipse cx="210" cy="210" rx="155" ry="59" stroke="rgba(250,204,21,0.2)"  strokeWidth="1" strokeDasharray="5 8" />
        <ellipse cx="210" cy="210" rx="93"  ry="36" stroke="rgba(250,204,21,0.25)" strokeWidth="1" strokeDasharray="3 5" />
        <line x1="210" y1="148" x2="210" y2="272" stroke="rgba(250,204,21,0.05)" strokeWidth="1" />
        <line x1="148" y1="210" x2="272" y2="210" stroke="rgba(250,204,21,0.05)" strokeWidth="1" />
      </svg>

      {/* ── Orbit nodes ── */}
      {OUTER_NODES.map((n, i) => (
        <OrbitNode key={`o${i}`} icon={n.icon} speed={0.38} rx={155} ry={59} offset={n.offset} color={n.color} size="md" />
      ))}
      {INNER_NODES.map((n, i) => (
        <OrbitNode key={`i${i}`} icon={n.icon} speed={0.72} rx={93} ry={36} offset={n.offset} color={n.color} size="sm" />
      ))}

      {/* ── Sonar pulses — tighter easing, alternating weight ── */}
      {[0, 0.72, 1.44, 2.16, 2.88].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 112, height: 112,
            border: i % 2 === 0
              ? "1.5px solid rgba(250,204,21,0.55)"
              : "1px solid rgba(234,179,8,0.28)",
          }}
          animate={{ scale: [1, 4.6], opacity: [0.85, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: [0.15, 0, 0.86, 1], delay }}
        />
      ))}

      {/* ── Decorative dashed ring outside core ── */}
      <motion.svg
        className="absolute pointer-events-none"
        style={{ width: 152, height: 152, top: "50%", left: "50%", marginTop: -76, marginLeft: -76 }}
        viewBox="0 0 152 152"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="76" cy="76" r="72" stroke="rgba(250,204,21,0.22)" strokeWidth="1" strokeDasharray="6 11" fill="none" />
      </motion.svg>

      {/* ── Central core ── */}
      <Link href="/ai-agents" className="relative cursor-pointer" style={{ zIndex: 20 }}>
        {/* Primary rotating conic arc */}
        <motion.div
          className="absolute -inset-[5px] rounded-full pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          style={{
            background: "conic-gradient(from 0deg, transparent 28%, rgba(250,204,21,0.92) 48%, rgba(234,179,8,0.48) 60%, transparent 78%)",
            borderRadius: "50%",
          }}
        />
        {/* Counter-rotating secondary arc */}
        <motion.div
          className="absolute -inset-[5px] rounded-full pointer-events-none"
          animate={{ rotate: -360 }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
          style={{
            background: "conic-gradient(from 200deg, transparent 72%, rgba(250,204,21,0.32) 86%, transparent 96%)",
            borderRadius: "50%",
          }}
        />

        {/* Core sphere */}
        <motion.div
          className="relative w-28 h-28 rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden"
          animate={{
            boxShadow: [
              "0 0 0 1.5px rgba(250,204,21,0.45), 0 0 0 10px rgba(250,204,21,0.09), 0 8px 50px rgba(250,204,21,0.32), inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.7)",
              "0 0 0 1.5px rgba(250,204,21,0.8),  0 0 0 15px rgba(250,204,21,0.17), 0 8px 80px rgba(250,204,21,0.65), inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.7)",
              "0 0 0 1.5px rgba(250,204,21,0.45), 0 0 0 10px rgba(250,204,21,0.09), 0 8px 50px rgba(250,204,21,0.32), inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.7)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Scanning line sweep */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] pointer-events-none"
            animate={{ top: ["-8%", "108%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.8 }}
            style={{
              background: "linear-gradient(to right, transparent, rgba(250,204,21,0.5) 25%, rgba(250,204,21,0.72) 50%, rgba(250,204,21,0.5) 75%, transparent)",
            }}
          />
          {/* Specular highlight */}
          <div
            className="absolute top-3 left-3.5 w-8 h-3.5 pointer-events-none"
            style={{
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(255,255,255,0.11) 0%, transparent 70%)",
            }}
          />
          {/* Bot icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.88, 1, 0.88] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Bot
              className="w-14 h-14 text-yellow-400"
              style={{ filter: "drop-shadow(0 0 14px rgba(250,204,21,0.85))" }}
            />
          </motion.div>
        </motion.div>
      </Link>

      {/* ── Activity badge ── */}
      <ActivityBadge />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function AIAgentsSection() {
  return (
    <section
      id="ai-agents"
      className="relative py-32 md:py-40 px-6 border-t border-zinc-100 overflow-hidden"
    >
      {/* Off-axis glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-yellow-300/[0.18] blur-[120px] pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-7"
          >
            <motion.div variants={fadeUp}>
              <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Automatizácia
              </p>
              <h2
                className="font-calsans text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight tracking-[-0.025em]"
              >
                AI Zamestnanci:{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Vaši neúnavní kolegovia
                </span>
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-lg text-zinc-600 leading-relaxed"
            >
              Vytvárame a nasadzujeme autonómnych AI agentov pre{" "}
              <span className="text-zinc-700 font-medium">účtovníctvo, právo a zákaznícku podporu</span>.
              Pracujú 24/7, bez prestávky a s absolútnou,{" "}
              <span className="text-zinc-700 font-medium">algoritmickou presnosťou</span>.
            </motion.p>

            {/* Feature Cards — 2030 style */}
            <div className="flex flex-col gap-3 mt-1">
              {FEATURE_CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.1, duration: 0.55, ease: EASE }}
                  >
                    <Tilt
                      tiltMaxAngleX={6}
                      tiltMaxAngleY={6}
                      perspective={800}
                      scale={1.025}
                      transitionSpeed={400}
                      glareEnable={true}
                      glareMaxOpacity={0.05}
                      glareColor={card.color}
                      glarePosition="all"
                    >
                      <div
                        className="relative bg-zinc-900 border border-zinc-700/60 rounded-2xl px-4 py-3.5 flex items-center gap-4 overflow-hidden"
                        style={{
                          boxShadow: "0 4px 20px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.12)",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* Top gradient accent line */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[1.5px]"
                          style={{
                            background: `linear-gradient(to right, transparent, ${card.color}80, transparent)`,
                          }}
                        />

                        {/* Icon badge */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${card.color}18`,
                            border: `1px solid ${card.color}35`,
                            color: card.color,
                            transform: "translateZ(6px)",
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Title + subtitle */}
                        <div className="flex-1 min-w-0" style={{ transform: "translateZ(4px)" }}>
                          <p className="text-sm font-semibold text-white leading-snug">
                            {card.title}
                          </p>
                          <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{card.sub}</p>
                        </div>

                        {/* Metric */}
                        <div
                          className="flex-shrink-0 text-right"
                          style={{ transform: "translateZ(10px)" }}
                        >
                          <span
                            className="font-calsans text-xl font-bold leading-none block"
                            style={{ color: card.color }}
                          >
                            {card.stat}
                          </span>
                          <span className="text-[9px] text-zinc-400 uppercase tracking-[0.18em] mt-0.5 block">
                            {card.statLabel}
                          </span>
                        </div>
                      </div>
                    </Tilt>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom trust line */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mt-2">
              <span className="text-sm text-zinc-600">
                Implementácia do{" "}
                <span className="text-zinc-700 font-medium">2 týždňov</span>. Bez nutnosti IT tímu.
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: AI Visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="relative flex items-center justify-center"
          >
            <AIVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
