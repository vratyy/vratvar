"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Phone, ArrowRight, Clock, Zap, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import Tilt from "react-parallax-tilt";

/* ─── Animation variants ──────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.15,
    },
  },
};

const statsContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.65,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const fadeUpStat = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
};

const STAT_ICONS: ComponentType<{ className?: string }>[] = [Clock, Zap, Bot];

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      {/* ═══════════════════════════════════════
          Ambient Background Glows
          ═══════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-[58%] w-[700px] h-[700px] rounded-full bg-yellow-300/[0.09] blur-[160px]" />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full bg-amber-300/[0.05] blur-[130px]" />
        <div className="absolute bottom-[15%] left-[8%] w-[250px] h-[250px] rounded-full bg-yellow-200/[0.07] blur-[110px]" />
      </div>

      {/* ═══════════════════════════════════════
          Dot Grid Texture
          ═══════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)",
        }}
      />

      {/* Bottom section fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-72 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none"
        aria-hidden
      />

      {/* ═══════════════════════════════════════
          Stacked Layout: centered text + full-width stats
          ═══════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-16 flex flex-col items-center gap-16">

        {/* ── CENTERED TEXT BLOCK ── */}
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center gap-7 max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-yellow-400/40 bg-yellow-400/[0.1] text-yellow-700 text-[11px] font-semibold tracking-[0.18em] uppercase">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-yellow-400" />
              </span>
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUp}
            className={cn(
              "font-calsans font-extrabold leading-[1.1] tracking-tighter",
              "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
            )}
          >
            <span className="text-zinc-900">{t.hero.h1Line1}</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent pb-1 inline-block">
              {t.hero.h1Line2}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="max-w-[580px] text-lg md:text-xl text-zinc-600 leading-relaxed"
          >
            {t.hero.subtitlePart1}{" "}
            <span className="text-zinc-700 font-semibold">{t.hero.dach}</span>{" "}
            {t.hero.subtitlePart2}{" "}
            <span className="text-zinc-700 font-semibold">{t.hero.control}</span>{" "}
            {t.hero.subtitlePart3}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <motion.a
              href="/contact"
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ y: 1, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-8 h-13 text-sm font-semibold tracking-wide",
                "text-zinc-900 bg-yellow-400/80 hover:bg-yellow-400/95 backdrop-blur-md",
                "border border-yellow-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_16px_rgba(250,204,21,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_6px_24px_rgba(234,179,8,0.5)]",
                "transition-all duration-300 gap-2"
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              {t.hero.primaryCta}
            </motion.a>

            <motion.a
              href="#zettelflow"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ y: 1, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "rounded-full px-8 h-13 text-sm font-medium",
                "text-zinc-500 hover:text-zinc-900",
                "bg-white/50 hover:bg-white/75 backdrop-blur-sm border border-zinc-200/60 hover:border-zinc-300/80",
                "transition-all duration-300 gap-2"
              )}
            >
              {t.hero.secondaryCta}
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── FULL-WIDTH STATS ROW ── */}
        <motion.div
          variants={statsContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full items-stretch"
        >
          {t.hero.stats.map(({ value, label }, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <motion.div key={i} variants={fadeUpStat} className="h-full">
                <Tilt
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={8}
                  perspective={900}
                  scale={1.03}
                  transitionSpeed={350}
                  className="w-full h-full"
                >
                  <div className="relative bg-zinc-900 rounded-2xl px-6 py-7 border border-zinc-700/60 shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_56px_rgba(0,0,0,0.35)] transition-all duration-300 flex flex-col items-center justify-center text-center gap-3 overflow-hidden group cursor-default h-full">
                    {/* Top yellow accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400/0 to-transparent group-hover:from-yellow-400/[0.07] transition-all duration-500 pointer-events-none" />

                    {/* Value + Label */}
                    <div className="relative flex flex-col items-center gap-1">
                      <span className="font-calsans text-4xl font-extrabold tracking-tighter bg-gradient-to-br from-yellow-400 to-amber-500 bg-clip-text text-transparent leading-none select-none">
                        {value}
                      </span>
                      <span className="text-[11px] text-zinc-400 uppercase tracking-[0.22em] font-medium">
                        {label}
                      </span>
                    </div>
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
