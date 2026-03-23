"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  ArrowLeft,
  Phone,
  Mail,
  Building2,
  Calendar,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { submitContact, type ContactActionState } from "@/actions/contact";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

const INITIAL_STATE: ContactActionState = { status: "idle", message: "" };

const SK_SERVICES = [
  { id: "zettelflow", label: "ZettelFlow", desc: "Riadenie subdodávateľov & B2B portál", icon: "🏗️" },
  { id: "ai-agents", label: "AI Zamestnanci", desc: "Autonómni agenti pre vaše procesy", icon: "🤖" },
  { id: "custom-portal", label: "Custom B2B Portál", desc: "Vývoj na mieru podľa vašich potrieb", icon: "⚡" },
];

const CZ_SERVICES = [
  { id: "zettelflow", label: "ZettelFlow", desc: "Řízení subdodavatelů & B2B portál", icon: "🏗️" },
  { id: "ai-agents", label: "AI Zaměstnanci", desc: "Autonomní agenti pro vaše procesy", icon: "🤖" },
  { id: "custom-portal", label: "Custom B2B Portál", desc: "Vývoj na míru podle vašich potřeb", icon: "⚡" },
];

const SK_CONTACT_BLOCKS = [
  { icon: Phone, label: "Zavolajte nám", value: "+421 948 860 229", href: "tel:+421948860229", sub: "Po – Pia, 9:00 – 18:00" },
  { icon: Mail, label: "Napíšte nám", value: "vratvar@gmail.com", href: "mailto:vratvar@gmail.com", sub: "Odpovieme do 24 hodín" },
  { icon: Building2, label: "Fakturačné údaje", value: "VRATVAR s.r.o.", href: null, sub: "IČO: 57508917" },
];

const CZ_CONTACT_BLOCKS = [
  { icon: Phone, label: "Zavolejte nám", value: "+421 948 860 229", href: "tel:+421948860229", sub: "Po – Pá, 9:00 – 18:00" },
  { icon: Mail, label: "Napište nám", value: "vratvar@gmail.com", href: "mailto:vratvar@gmail.com", sub: "Odpovíme do 24 hodin" },
  { icon: Building2, label: "Fakturační údaje", value: "VRATVAR s.r.o.", href: null, sub: "IČO: 57508917" },
];

const SK_UI = {
  back: "Späť na hlavnú stránku",
  badge: "Kontakt · Poďme spolupracovať",
  h1a: "Poďme formovať",
  h1b: "vašu budúcnosť.",
  sub: "Vyberte si spôsob, ktorý vám najviac vyhovuje. Sme pripravení na okamžitú implementáciu.",
  calTitle: "Rezervovať termín v kalendári",
  calSub: "30 minút · bezplatne · bez záväzkov",
  cardBadge: "Rýchly dopyt",
  cardH2: "Odoslať dopyt",
  cardSub: "Vyplňte formulár a ozveme sa do 24 hodín.",
  successTitle: "Dopyt bol odoslaný!",
  successBtn: "Odoslať ďalší dopyt",
  labelName: "Meno a priezvisko",
  placeholderName: "Ján Novák",
  labelEmail: "Pracovný e-mail",
  placeholderEmail: "jan@firma.sk",
  labelService: "O čo máte záujem?",
  labelMessage: "Správa / Detaily projektu",
  placeholderMessage: "Opíšte váš projekt, aktuálne výzvy alebo konkrétne požiadavky...",
  submitIdle: "Odoslať dopyt",
  submitPending: "Odosielam…",
  privacy: "Žiadny spam. Iba konkrétna odpoveď k vášmu projektu. Odpovedáme do 24 hodín.",
};

const CZ_UI = {
  back: "Zpět na hlavní stránku",
  badge: "Kontakt · Pojďme spolupracovat",
  h1a: "Pojďme formovat",
  h1b: "vaši budoucnost.",
  sub: "Vyberte si způsob, který vám nejvíce vyhovuje. Jsme připraveni na okamžitou implementaci.",
  calTitle: "Rezervovat termín v kalendáři",
  calSub: "30 minut · zdarma · bez závazků",
  cardBadge: "Rychlý dotaz",
  cardH2: "Odeslat dotaz",
  cardSub: "Vyplňte formulář a ozveme se do 24 hodin.",
  successTitle: "Dotaz byl odeslán!",
  successBtn: "Odeslat další dotaz",
  labelName: "Jméno a příjmení",
  placeholderName: "Jan Novák",
  labelEmail: "Pracovní e-mail",
  placeholderEmail: "jan@firma.cz",
  labelService: "O co máte zájem?",
  labelMessage: "Zpráva / Detaily projektu",
  placeholderMessage: "Popište váš projekt, aktuální výzvy nebo konkrétní požadavky...",
  submitIdle: "Odeslat dotaz",
  submitPending: "Odesílám…",
  privacy: "Žádný spam. Pouze konkrétní odpověď k vašemu projektu. Odpovídáme do 24 hodin.",
};

const inputClass = cn(
  "w-full rounded-xl px-4 py-3 text-sm bg-zinc-50 border border-zinc-200",
  "text-zinc-900 placeholder:text-zinc-400",
  "focus:outline-none focus:border-yellow-400/60 focus:bg-white focus:ring-2 focus:ring-yellow-400/15",
  "transition-all duration-200"
);

const inputClassDark = cn(
  "w-full rounded-xl px-4 py-3 text-sm bg-zinc-800 border border-zinc-700",
  "text-zinc-100 placeholder:text-zinc-500",
  "focus:outline-none focus:border-yellow-400/50 focus:bg-zinc-750 focus:ring-2 focus:ring-yellow-400/10",
  "transition-all duration-200"
);

export default function ContactPage() {
  const { lang } = useLanguage();
  const ui = lang === "cz" ? CZ_UI : SK_UI;
  const services = lang === "cz" ? CZ_SERVICES : SK_SERVICES;
  const contactBlocks = lang === "cz" ? CZ_CONTACT_BLOCKS : SK_CONTACT_BLOCKS;
  const [state, formAction, isPending] = useActionState(submitContact, INITIAL_STATE);
  const [selectedService, setSelectedService] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success" && formRef.current) {
      formRef.current.reset();
      setSelectedService("");
    }
  }, [state.status]);

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-yellow-300/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full bg-amber-200/[0.09] blur-[100px]" />
      </div>

      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Back link */}
          <motion.div {...fadeUp(0)}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800 transition-colors duration-200 mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              {ui.back}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* ═══════════════════════════════
                LEFT COLUMN
                ═══════════════════════════════ */}
            <div className="lg:sticky lg:top-28">

              {/* Badge */}
              <motion.div {...fadeUp(0.05)}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/15 border border-yellow-400/30 text-yellow-700 text-xs font-semibold tracking-[0.2em] uppercase mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                  {ui.badge}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                {...fadeUp(0.1)}
                className="font-calsans text-4xl sm:text-5xl font-extrabold text-zinc-900 leading-[1.05] tracking-tight mb-6"
              >
                {ui.h1a}{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  {ui.h1b}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                {...fadeUp(0.15)}
                className="text-zinc-500 text-lg leading-relaxed mb-12 max-w-md"
              >
                {ui.sub}
              </motion.p>

              {/* Contact blocks */}
              <motion.div {...fadeUp(0.2)} className="space-y-4 mb-10">
                {contactBlocks.map((block, i) => {
                  const Icon = block.icon;
                  const inner = (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-[11px] text-zinc-400 font-semibold tracking-[0.15em] uppercase mb-0.5">
                          {block.label}
                        </p>
                        <p className="text-zinc-900 font-semibold text-sm">{block.value}</p>
                        <p className="text-zinc-400 text-xs mt-0.5">{block.sub}</p>
                      </div>
                    </div>
                  );
                  const cardContent = (
                    <div className="relative p-4 rounded-2xl border transition-all duration-300 overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.9) 100%)",
                        backdropFilter: "blur(12px) saturate(1.8)",
                        WebkitBackdropFilter: "blur(12px) saturate(1.8)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.4)",
                      }}
                    >
                      {/* Glass reflection gradient */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 30%, rgba(255,255,255,0.05) 70%, transparent 100%)",
                        }}
                      />
                      {/* Top highlight line */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                      {/* Bottom shadow line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent pointer-events-none" />
                      <div className="relative z-10">{inner}</div>
                    </div>
                  );
                  return block.href ? (
                    <motion.div
                      key={block.label}
                      initial={{ opacity: 0, y: 20, rotateY: -8 }}
                      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Tilt
                        tiltMaxAngleX={6}
                        tiltMaxAngleY={8}
                        perspective={900}
                        scale={1.02}
                        transitionSpeed={350}
                        glareEnable={true}
                        glareMaxOpacity={0.12}
                        glareColor="#ffffff"
                        glarePosition="all"
                      >
                        <motion.a
                          href={block.href}
                          className="block"
                          whileHover={{ y: -4, scale: 1.03 }}
                          whileTap={{ y: -1, scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          style={{
                            border: "1px solid rgba(250,204,21,0.2)",
                            boxShadow: "0 12px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
                          }}
                        >
                          {cardContent}
                        </motion.a>
                      </Tilt>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={block.label}
                      initial={{ opacity: 0, y: 20, rotateY: -8 }}
                      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Tilt
                        tiltMaxAngleX={4}
                        tiltMaxAngleY={6}
                        perspective={800}
                        scale={1.01}
                        transitionSpeed={350}
                        glareEnable={true}
                        glareMaxOpacity={0.08}
                        glareColor="#ffffff"
                        glarePosition="all"
                      >
                        {cardContent}
                      </Tilt>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Cal.com CTA */}
              <motion.div {...fadeUp(0.25)}>
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={7}
                  perspective={850}
                  scale={1.02}
                  transitionSpeed={350}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  glareColor="#fbbf24"
                  glarePosition="all"
                >
                  <motion.a
                    href="https://cal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.03 }}
                    whileTap={{ y: -1, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="group inline-flex items-center justify-between w-full gap-4 px-6 py-4 rounded-2xl transition-all duration-300 overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(24,32,48,0.9) 50%, rgba(17,24,39,0.95) 100%)",
                      backdropFilter: "blur(16px) saturate(1.5)",
                      WebkitBackdropFilter: "blur(16px) saturate(1.5)",
                      border: "1px solid rgba(250,204,21,0.25)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)",
                    }}
                  >
                    {/* Glass reflection for dark card */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, transparent 30%, rgba(251,191,36,0.03) 70%, transparent 100%)",
                      }}
                    />
                    {/* Top highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent pointer-events-none" />
                    {/* Bottom shadow line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/20 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-between w-full gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-yellow-400/15 border border-yellow-400/25 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold leading-snug text-white">{ui.calTitle}</p>
                          <p className="text-xs text-zinc-400 mt-0.5">{ui.calSub}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform duration-200 flex-shrink-0" />
                    </div>
                  </motion.a>
                </Tilt>
              </motion.div>
            </div>

            {/* ═══════════════════════════════
                RIGHT COLUMN — FORM CARD
                ═══════════════════════════════ */}
            <motion.div {...fadeUp(0.1)}>
              <div className="bg-zinc-900 shadow-[0_8px_40px_rgb(0,0,0,0.18)] rounded-3xl p-8 border border-zinc-800">

                {/* Card header */}
                <div className="mb-8">
                  <p className="text-yellow-400 text-[11px] font-semibold tracking-[0.2em] uppercase mb-2">
                    {ui.cardBadge}
                  </p>
                  <h2 className="font-calsans text-2xl font-extrabold text-white tracking-tight">
                    {ui.cardH2}
                  </h2>
                  <p className="text-zinc-400 text-sm mt-1.5">
                    {ui.cardSub}
                  </p>
                </div>

                {state.status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex flex-col items-center text-center py-12 gap-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-base">{ui.successTitle}</p>
                      <p className="text-zinc-300 text-sm mt-1">{state.message}</p>
                    </div>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-2 text-xs text-yellow-400 hover:text-yellow-300 font-semibold underline underline-offset-2 transition-colors"
                    >
                      {ui.successBtn}
                    </button>
                  </motion.div>
                ) : (
                  <form ref={formRef} action={formAction} className="space-y-5">

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5 tracking-wide">
                        {ui.labelName} <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        disabled={isPending}
                        placeholder={ui.placeholderName}
                        className={inputClassDark}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5 tracking-wide">
                        {ui.labelEmail} <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        disabled={isPending}
                        placeholder={ui.placeholderEmail}
                        className={inputClassDark}
                      />
                    </div>

                    {/* Service radio group */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-3 tracking-wide">
                        {ui.labelService} <span className="text-red-400">*</span>
                      </label>
                      <div className="space-y-2.5">
                        {services.map((svc) => (
                          <label
                            key={svc.id}
                            className={cn(
                              "flex items-center gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all duration-200",
                              selectedService === svc.id
                                ? "border-yellow-400/50 bg-yellow-400/[0.08] ring-1 ring-yellow-400/20"
                                : "border-zinc-700 bg-zinc-800 hover:border-zinc-600 hover:bg-zinc-750"
                            )}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={svc.id}
                              required
                              disabled={isPending}
                              checked={selectedService === svc.id}
                              onChange={() => setSelectedService(svc.id)}
                              className="sr-only"
                            />
                            <div
                              className={cn(
                                "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200",
                                selectedService === svc.id
                                  ? "border-yellow-500 bg-yellow-400"
                                  : "border-zinc-600 bg-zinc-800"
                              )}
                            >
                              {selectedService === svc.id && (
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                              )}
                            </div>
                            <span className="text-lg leading-none">{svc.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-zinc-100 leading-snug">{svc.label}</p>
                              <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{svc.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5 tracking-wide">
                        {ui.labelMessage}
                      </label>
                      <textarea
                        name="message"
                        disabled={isPending}
                        rows={4}
                        placeholder={ui.placeholderMessage}
                        className={cn(inputClassDark, "resize-none")}
                      />
                    </div>

                    {/* Error feedback */}
                    {state.status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200/60 text-red-600 text-sm"
                        role="alert"
                        aria-live="polite"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {state.message}
                      </motion.div>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isPending}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ y: 1, scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 500, damping: 28 }}
                      className={cn(
                        "w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl",
                        "bg-yellow-400/80 hover:bg-yellow-400/95 backdrop-blur-md text-zinc-900 font-bold text-sm",
                        "border border-yellow-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_16px_rgba(250,204,21,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_6px_24px_rgba(234,179,8,0.45)]",
                        "transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
                      )}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {ui.submitPending}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {ui.submitIdle}
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-zinc-500 leading-relaxed">
                      {ui.privacy}
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
