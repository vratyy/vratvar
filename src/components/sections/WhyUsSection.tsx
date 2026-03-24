"use client";

import { motion, type Variants } from "framer-motion";
import { Shield, BrainCircuit, Zap, Layers, Phone, Check, ArrowRight, Loader2 } from "lucide-react";
import type { ComponentType } from "react";
import Tilt from "react-parallax-tilt";
import { useLanguage } from "@/context/LanguageContext";

const SPRING = [0.16, 1, 0.3, 1] as [number, number, number, number];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SPRING } },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SPRING } },
};

const WHY_US_ICONS: ComponentType<{ className?: string }>[] = [Shield, BrainCircuit, Zap, Layers];

// ─── Mini Card Previews ────────────────────────────────────────────────────────────

function DACHPreview() {
  const items = ["KW Číslování", "STB Normy", "DSGVO Compliance", "Digitálny podpis"];
  return (
    <div className="mb-6 space-y-2.5">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: SPRING }}
          className="flex items-center gap-3"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-emerald-500" />
          </div>
          <span className="text-sm text-zinc-600">{item}</span>
        </motion.div>
      ))}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="text-[10px] font-semibold text-emerald-500 uppercase tracking-[0.2em] pt-1"
      >
        100% Compliance
      </motion.p>
    </div>
  );
}

function AIProcessPreview() {
  return (
    <div className="mb-6">
      <div className="flex items-end gap-5 mb-4">
        <div>
          <p className="text-[10px] text-zinc-400 mb-1 uppercase tracking-wide">Manuálne</p>
          <p className="font-calsans text-3xl font-bold text-zinc-300 leading-none">4 hod</p>
        </div>
        <ArrowRight className="w-4 h-4 text-zinc-300 mb-1.5 flex-shrink-0" />
        <div>
          <p className="text-[10px] text-zinc-400 mb-1 uppercase tracking-wide">AI Agent</p>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: SPRING }}
            className="font-calsans text-3xl font-bold text-yellow-500 leading-none"
          >
            12 min
          </motion.p>
        </div>
      </div>
      <div className="space-y-1.5">
        {[
          { label: "Manuálne", pct: "100%", bg: "bg-zinc-200" },
          { label: "AI Agent",  pct: "6%",  bg: "bg-yellow-400", animate: true },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="text-[10px] text-zinc-400 w-16 flex-shrink-0">{row.label}</span>
            <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              {row.animate ? (
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: row.pct }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: SPRING, delay: 0.4 }}
                  className={`h-full rounded-full ${row.bg}`}
                />
              ) : (
                <div className={`h-full rounded-full ${row.bg}`} style={{ width: row.pct }} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SavingsPreview() {
  const bars = [18, 32, 50, 65, 80, 100];
  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-2 mb-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: SPRING }}
          className="font-calsans text-5xl font-extrabold text-zinc-900 leading-none"
        >
          120+
        </motion.span>
        <span className="text-sm text-zinc-400">hodín / mesiac</span>
      </div>
      <div className="flex items-end gap-1 h-10">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.45, ease: SPRING }}
            className="flex-1 rounded-sm origin-bottom"
            style={{
              height: `${h}%`,
              background: i === bars.length - 1
                ? "linear-gradient(to top, #ca8a04, #fde047)"
                : `rgba(234,179,8,${0.25 + i * 0.1})`,
            }}
          />
        ))}
      </div>
      <p className="text-[10px] text-zinc-400 mt-1.5 uppercase tracking-[0.15em]">Zero-Touch úspory</p>
    </div>
  );
}

function StackPreview() {
  const layers = [
    { name: "Next.js 16 + shadcn/ui", tag: "UI",    color: "#6366f1" },
    { name: "AI Agents + ZettelFlow", tag: "Logic",  color: "#eab308" },
    { name: "Supabase + PostgreSQL",  tag: "Data",   color: "#10b981" },
  ];
  return (
    <div className="mb-6 space-y-2">
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4, ease: SPRING }}
          className="flex items-center gap-3 py-2 border-b border-zinc-100 last:border-0"
        >
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: layer.color }} />
          <p className="flex-1 text-sm text-zinc-600">{layer.name}</p>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ color: layer.color, background: `${layer.color}14`, border: `1px solid ${layer.color}30` }}
          >
            {layer.tag}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

const CARD_PREVIEWS = [DACHPreview, AIProcessPreview, SavingsPreview, StackPreview];

export function WhyUsSection() {
  const { t } = useLanguage();
  return (
    <section id="why-us" className="py-24 px-6 border-t border-zinc-100">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={headerVariants}
          className="text-center mb-12 space-y-3"
        >
          <p className="text-yellow-600 text-[11px] font-semibold tracking-[0.25em] uppercase">
            {t.whyUs.label}
          </p>
          <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            {t.whyUs.heading}
          </h2>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {t.whyUs.items.map((item, i) => {
            const Icon = WHY_US_ICONS[i];
            const Preview = CARD_PREVIEWS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: SPRING, delay: i * 0.1 }}
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
                    className="relative bg-white border border-zinc-100 rounded-3xl p-6 hover:shadow-[0_20px_60px_rgb(0,0,0,0.09)] transition-all duration-300 cursor-default h-full overflow-hidden group"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Top yellow accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
                    {/* Corner hover glow */}
                    <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-yellow-300/[0.4] blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <Preview />

                    <div className="flex items-start gap-3" style={{ transform: "translateZ(6px)" }}>
                      <div className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="font-calsans text-lg text-zinc-900 mb-1.5 leading-snug">{item.title}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── CTA Block ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: SPRING }}
          className="mt-14 flex justify-center"
        >
          <div className="relative bg-zinc-900 border border-zinc-700/60 rounded-3xl px-6 py-7 sm:px-10 sm:py-9 shadow-[0_8px_48px_rgba(0,0,0,0.35)] flex flex-col items-center gap-4 overflow-hidden max-w-xl w-full text-center">
            {/* Top accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/[0.08] to-transparent pointer-events-none" />

            <span className="text-[10px] font-semibold text-yellow-400 uppercase tracking-[0.25em]">
              Každý deň bez automatizácie = stratený zisk
            </span>
            <h3 className="font-calsans text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Prevezmite kontrolu nad svojou firmou.
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"> Dnes.</span>
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Rezervujte si 30-minútový stratégický hovor. Dostanete konkrétny plán
              automatizácie šitý na váš biznis — zadarmo, bez zäväzkov.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ y: 1, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-yellow-400/80 hover:bg-yellow-400/95 backdrop-blur-md text-zinc-900 font-semibold text-sm border border-yellow-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(250,204,21,0.45)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_6px_28px_rgba(234,179,8,0.55)] transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Rezervovať bezplatný hovor →
            </motion.a>
            <p className="text-[11px] text-zinc-500">30 minút · bez zäväzkov · konkrétny akčný plán</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
