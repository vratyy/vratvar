"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import type { ComponentType } from "react";
import { ArrowUpRight, LayoutDashboard, Code2, Bot, CheckCircle2, Loader2 } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { useLanguage } from "@/context/LanguageContext";

const SPRING = [0.16, 1, 0.3, 1] as [number, number, number, number];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SPRING } },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SPRING } },
};

const SERVICE_ICONS: ComponentType<{ className?: string }>[] = [LayoutDashboard, Code2, Bot];
const SERVICE_HREFS = ["/zettelflow", "/custom-applications", "/ai-agents"];

const SK_FEATURES = [
  ["Subdodávatelia", "Auto-faktúry", "KW výkazy"],
  ["Web & Mobile", "B2B Portály", "SaaS"],
  ["24/7 Aktívny", "Bez ľudského zásahu", "Škálovateľný"],
];
const CZ_FEATURES = [
  ["Subdodavatelé", "Auto-faktury", "KW výkazy"],
  ["Web & Mobile", "B2B Portály", "SaaS"],
  ["24/7 Aktivní", "Bez zásahu", "Škálovatelný"],
];
const SK_METRICS = [
  { val: "€48k+", label: "ušetrené / mesiac" },
  { val: "6 týž.", label: "od idey po launch" },
  { val: "40 hod", label: "ušetrených / mesiac" },
];
const CZ_METRICS = [
  { val: "€48k+", label: "ušetřeno / měsíc" },
  { val: "6 týd.", label: "od nápadu po launch" },
  { val: "40 hod", label: "ušetřeno / měsíc" },
];


const CODE_LINES = [
  { indent: 0, tokens: [{ t: "const ", c: "text-purple-500" }, { t: "Dashboard", c: "text-yellow-600" }, { t: " = () => {", c: "text-zinc-400" }] },
  { indent: 1, tokens: [{ t: "const ", c: "text-purple-500" }, { t: "[projects]", c: "text-blue-500" }, { t: " = ", c: "text-zinc-400" }, { t: "useProjects", c: "text-yellow-600" }, { t: "()", c: "text-zinc-400" }] },
  { indent: 1, tokens: [{ t: "return ", c: "text-purple-500" }, { t: "(", c: "text-zinc-400" }] },
  { indent: 2, tokens: [{ t: "<", c: "text-zinc-400" }, { t: "Layout", c: "text-emerald-500" }, { t: ">", c: "text-zinc-400" }] },
  { indent: 3, tokens: [{ t: "<", c: "text-zinc-400" }, { t: "Stats", c: "text-emerald-500" }, { t: " data", c: "text-blue-400" }, { t: "={projects}", c: "text-zinc-400" }, { t: " />", c: "text-zinc-400" }] },
  { indent: 3, tokens: [{ t: "<", c: "text-zinc-400" }, { t: "Table", c: "text-emerald-500" }, { t: " rows", c: "text-blue-400" }, { t: "={projects}", c: "text-zinc-400" }, { t: " />", c: "text-zinc-400" }] },
  { indent: 2, tokens: [{ t: "</", c: "text-zinc-400" }, { t: "Layout", c: "text-emerald-500" }, { t: ">", c: "text-zinc-400" }] },
];


function ZettelFlowPreview() {
  const { lang } = useLanguage();
  const projects = lang === "cz"
    ? [
        { name: "Kováč Bau GmbH", status: "Aktivní", progress: 74, color: "bg-emerald-400" },
        { name: "ProBau SK s.r.o.", status: "Aktivní", progress: 41, color: "bg-yellow-400" },
        { name: "BauTech Systeme", status: "Čeká", progress: 12, color: "bg-zinc-300" },
      ]
    : [
        { name: "Kováč Bau GmbH", status: "Aktívny", progress: 74, color: "bg-emerald-400" },
        { name: "ProBau SK s.r.o.", status: "Aktívny", progress: 41, color: "bg-yellow-400" },
        { name: "BauTech Systeme", status: "Čaká", progress: 12, color: "bg-zinc-300" },
      ];
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-700/60 overflow-hidden mb-6 text-left">
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-800 border-b border-zinc-700/60">
        <span className="text-[10px] font-semibold text-zinc-400 tracking-wide uppercase">Dashboard</span>
        <span className="flex items-center gap-1 text-[9px] font-medium text-emerald-600">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Live
        </span>
      </div>

      <div className="grid grid-cols-3 gap-px bg-zinc-700/40 border-b border-zinc-700/60">
        {[
          { val: "12", label: lang === "cz" ? "Projekty" : "Projekty" },
          { val: "€48k", label: lang === "cz" ? "Faktury" : "Faktúry" },
          { val: "8", label: lang === "cz" ? "Tým" : "Tím" },
        ].map((s) => (
          <div key={s.label} className="bg-zinc-800/60 px-2 py-2 text-center">
            <p className="text-sm font-bold text-white">{s.val}</p>
            <p className="text-[9px] text-zinc-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="divide-y divide-zinc-700/50">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.4, ease: SPRING }}
            className="flex items-center gap-2 px-3 py-2"
          >
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${p.color}`} />
            <span className="text-[10px] text-zinc-300 flex-1 truncate">{p.name}</span>
            <div className="w-14 h-1 bg-zinc-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${p.progress}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.7, ease: SPRING }}
                className={`h-full rounded-full ${p.color}`}
              />
            </div>
            <span className="text-[9px] text-zinc-400 w-6 text-right">{p.progress}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CustomAppsPreview() {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden mb-6 text-left">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 border-b border-zinc-700">
        <span className="w-2 h-2 rounded-full bg-red-500/70" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
        <span className="ml-2 text-[10px] text-zinc-500 font-mono">dashboard.tsx</span>
      </div>
      <div className="px-3 py-2.5 font-mono text-[10px] leading-5 space-y-0.5">
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
            className="flex"
          >
            <span className="text-zinc-600 w-4 flex-shrink-0 select-none">{i + 1}</span>
            <span style={{ paddingLeft: `${line.indent * 10}px` }} className="flex flex-wrap">
              {line.tokens.map((tok, j) => (
                <span key={j} className={tok.c}>{tok.t}</span>
              ))}
            </span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.3 }}
          className="flex"
        >
          <span className="text-zinc-600 w-4 select-none">{CODE_LINES.length + 1}</span>
          <span className="text-zinc-400 pl-[30px]">
            {"  "}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-1.5 h-3 bg-yellow-400 align-middle"
            />
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function AIAgentsPreview() {
  const { lang } = useLanguage();
  const agentTasks = lang === "cz"
    ? ["Faktura #1047 zpracována", "E-mail odeslán klientovi", "KW výkaz vygenerován"]
    : ["Faktúra #1047 spracovaná", "Email odoslaný klientovi", "KW výkaz vygenerovaný"];
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-700/60 overflow-hidden mb-6 text-left">
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-800 border-b border-zinc-700/60">
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-3 h-3 text-yellow-500" />
          </motion.div>
          <span className="text-[10px] font-semibold text-zinc-400 tracking-wide uppercase">AI Agent #7</span>
        </div>
        <span className="text-[9px] font-medium text-yellow-600 bg-yellow-400/10 px-1.5 py-0.5 rounded-full">{lang === "cz" ? "Aktivní" : "Aktívny"}</span>
      </div>

      <div className="divide-y divide-zinc-700/50">
        {agentTasks.map((task, i) => (
          <motion.div
            key={task}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.4, ease: SPRING }}
            className="flex items-center gap-2 px-3 py-2"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
            <span className="text-[10px] text-zinc-300">{task}</span>
          </motion.div>
        ))}

        <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/40">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Loader2 className="w-3 h-3 text-yellow-500 animate-spin" />
          </motion.div>
          <span className="text-[10px] text-zinc-400 italic">
            {lang === "cz" ? "Analyzuji novou fakturu" : "Analyzujem novú faktúru"}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.1 }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.25 }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.5 }}
            >.</motion.span>
          </span>
        </div>
      </div>
    </div>
  );
}

const CARD_PREVIEWS = [ZettelFlowPreview, CustomAppsPreview, AIAgentsPreview];

export function ServicesSection() {
  const { t, lang } = useLanguage();
  const features = lang === "cz" ? CZ_FEATURES : SK_FEATURES;
  const metrics  = lang === "cz" ? CZ_METRICS  : SK_METRICS;
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
            const Preview = CARD_PREVIEWS[i];
            const cardFeatures = features[i];
            const metric = metrics[i];
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="h-full"
              >
                <Tilt
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={900}
                  scale={1.03}
                  transitionSpeed={500}
                  glareEnable={true}
                  glareMaxOpacity={0.07}
                  glareColor="#facc15"
                  glarePosition="all"
                  className="h-full"
                >
                  <Link
                    href={href}
                    className="relative bg-zinc-900 border border-zinc-700/60 rounded-2xl p-6 hover:shadow-[0_20px_56px_rgba(0,0,0,0.45)] hover:border-yellow-400/20 transition-all duration-300 flex flex-col group text-left h-full overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Hover glow sweep */}
                    <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/0 via-yellow-400/0 to-yellow-400/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <Preview />

                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center group-hover:bg-yellow-400/15 group-hover:border-yellow-400/30 transition-all duration-300"
                        style={{ transform: "translateZ(8px)" }}
                      >
                        <Icon className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>

                    <h3
                      className="font-calsans text-xl text-white mb-2"
                      style={{ transform: "translateZ(6px)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>

                    {/* Feature pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {cardFeatures.map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center text-[10px] font-semibold text-yellow-600 bg-yellow-400/[0.08] border border-yellow-400/20 px-2.5 py-1 rounded-full tracking-wide group-hover:bg-yellow-400/[0.14] group-hover:border-yellow-400/30 transition-all duration-300"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Key metric */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/20 to-transparent" />
                      <div className="flex items-baseline gap-1">
                        <span className="font-calsans text-lg font-bold text-yellow-400">{metric.val}</span>
                        <span className="text-[10px] text-zinc-500">{metric.label}</span>
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-l from-yellow-400/20 to-transparent" />
                    </div>

                    {/* CTA footer */}
                    <div className="mt-4 pt-4 border-t border-zinc-700/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0"
                          animate={{ opacity: [0.4, 1, 0.4], scale: [0.7, 1.3, 0.7] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span className="text-sm font-semibold text-yellow-400 group-hover:text-yellow-300 transition-colors duration-200">
                          {lang === "cz" ? "Zjistit více" : "Zistiť viac"}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center group-hover:bg-yellow-400/20 group-hover:border-yellow-400/35 transition-all duration-200">
                        <ArrowUpRight className="w-3.5 h-3.5 text-yellow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
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
