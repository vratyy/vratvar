"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { ComponentType } from "react";
import { ArrowUpRight, LayoutDashboard, Code2, Bot } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { useLanguage } from "@/context/LanguageContext";

const SPRING = [0.16, 1, 0.3, 1] as [number, number, number, number];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SPRING } },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: SPRING } },
};

const SERVICE_ICONS: ComponentType<{ className?: string }>[] = [LayoutDashboard, Code2, Bot];
const SERVICE_HREFS = ["/zettelflow", "/custom-applications", "/ai-agents"];
const SERVICE_NUMS = ["01", "02", "03"];

const CARD_ACCENTS = [
  { dot: "bg-emerald-400", ring: "border-emerald-400/20", glow: "from-emerald-400/[0.06]" },
  { dot: "bg-blue-400",    ring: "border-blue-400/20",    glow: "from-blue-400/[0.06]"    },
  { dot: "bg-yellow-400",  ring: "border-yellow-400/20",  glow: "from-yellow-400/[0.06]"  },
];

export function ServicesSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="services" className="pt-16 pb-24 px-6 border-t border-zinc-100">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={headerVariants}
          className="text-center mb-12 space-y-3"
        >
          <p className="text-yellow-600 text-[11px] font-semibold tracking-[0.25em] uppercase">
            {t.services.label}
          </p>
          <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            {t.services.heading}
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-lg leading-relaxed">
            {t.services.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {t.services.items.map((item, i) => {
            const Icon = SERVICE_ICONS[i];
            const href = SERVICE_HREFS[i];
            const num  = SERVICE_NUMS[i];
            const acc  = CARD_ACCENTS[i];

            return (
              <motion.div key={item.title} variants={cardVariants} className="h-full">
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={900}
                  scale={1.02}
                  transitionSpeed={500}
                  glareEnable={true}
                  glareMaxOpacity={0.06}
                  glareColor="#facc15"
                  glarePosition="all"
                  className="h-full"
                >
                  <Link
                    href={href}
                    className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col group text-left h-full overflow-hidden hover:border-zinc-700 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-500"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Ambient glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${acc.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />

                    {/* Top shimmer line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Large watermark number */}
                    <span
                      className="absolute -bottom-4 -right-2 font-calsans text-[120px] leading-none font-extrabold text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.05] transition-colors duration-500"
                      aria-hidden
                    >
                      {num}
                    </span>

                    {/* Icon + number row */}
                    <div className="flex items-center justify-between mb-10">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center group-hover:border-zinc-600 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-yellow-400" />
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-zinc-600 tracking-[0.2em] group-hover:text-zinc-500 transition-colors duration-300">
                        {num}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-calsans text-2xl text-white mb-3 leading-tight"
                      style={{ transform: "translateZ(6px)" }}
                    >
                      {item.title}
                    </h3>

                    {/* Single sentence */}
                    <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                      {item.desc}
                    </p>

                    {/* Status dot + CTA */}
                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${acc.dot} opacity-50`} />
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${acc.dot}`} />
                        </span>
                        <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200">
                          {lang === "cz" ? "Zjistit více" : "Zistiť viac"}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center group-hover:bg-yellow-400/10 group-hover:border-yellow-400/30 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-yellow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                      </div>
                    </div>
                  </Link>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
