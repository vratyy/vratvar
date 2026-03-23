"use client";

import { useActionState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, Phone, Calendar } from "lucide-react";
import { submitLead, type LeadActionState } from "@/actions/leads";
import { useLanguage } from "@/context/LanguageContext";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const INITIAL_STATE: LeadActionState = {
  status: "idle",
  message: "",
};

export function LeadCaptureSection() {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(submitLead, INITIAL_STATE);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear input on success
  useEffect(() => {
    if (state.status === "success" && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [state.status]);

  return (
    <section
      id="contact"
      className="relative py-32 md:py-40 px-6 border-t border-zinc-100 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-yellow-300/[0.2] blur-[120px] pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {t.lead.label}
          </p>
          <h2
            className="font-calsans text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight tracking-[-0.025em]"
          >
            {t.lead.heading}
          </h2>
          <p className="mt-5 text-lg text-zinc-600 leading-relaxed max-w-xl mx-auto">
            {t.lead.subtitle}{" "}
            <span className="text-zinc-700 font-medium">{t.lead.h24}</span>{" "}
            {t.lead.subtitleEnd}
          </p>
        </motion.div>

        {/* ── Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
          className="mt-10"
        >
          <form
            action={formAction}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            {/* Email Input */}
            <div className="relative flex-1">
              <input
                ref={inputRef}
                name="email"
                type="email"
                required
                disabled={isPending || state.status === "success"}
                placeholder={t.lead.emailPlaceholder}
                aria-label={t.lead.emailLabel}
                className={cn(
                  "w-full h-12 rounded-full px-5 text-sm",
                  "bg-white border border-zinc-200",
                  "text-zinc-900 placeholder:text-zinc-400",
                  "focus:outline-none focus:border-yellow-400/60 focus:bg-white",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-all duration-300",
                  state.status === "error" && "border-red-500/40 focus:border-red-500/60"
                )}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isPending || state.status === "success"}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ y: 1, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-6 h-12 text-sm font-semibold tracking-wide",
                "text-zinc-900 bg-yellow-400 hover:bg-yellow-500",
                "shadow-[0_4px_14px_rgba(250,204,21,0.4)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.45)]",
                "transition-colors duration-300 gap-2 border-0",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none",
                "flex-shrink-0"
              )}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.lead.sending}</span>
                </>
              ) : state.status === "success" ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{t.lead.sent}</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.lead.submit}</span>
                </>
              )}
            </motion.button>
          </form>

          {/* ── Feedback Message ── */}
          {state.status !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={cn(
                "mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                state.status === "success"
                  ? "bg-emerald-500/[0.1] border border-emerald-500/25 text-emerald-400"
                  : "bg-red-500/[0.1] border border-red-500/25 text-red-400"
              )}
              role="alert"
              aria-live="polite"
            >
              {state.status === "success" ? (
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              )}
              {state.message}
            </motion.div>
          )}

          {/* Privacy note */}
          <p className="mt-6 text-xs text-zinc-600 leading-relaxed">
            {t.lead.privacy}
          </p>
        </motion.div>

        {/* ── Booking Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="mt-10"
        >
          <motion.a
            href="/contact"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ y: 1, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="group relative flex flex-col sm:flex-row items-center justify-between gap-5 bg-zinc-900 border border-zinc-800 rounded-3xl px-7 py-5 max-w-md mx-auto overflow-hidden hover:border-yellow-400/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)] transition-all duration-300"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1.5px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-transparent group-hover:from-yellow-400/[0.05] transition-all duration-500 pointer-events-none rounded-3xl" />

            {/* Left: icon + text */}
            <div className="flex items-center gap-3.5 relative">
              <div className="w-10 h-10 rounded-2xl bg-yellow-400/15 border border-yellow-400/25 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/25 transition-colors duration-300">
                <Calendar className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white leading-snug">Radšej hovoríte?</p>
                <p className="text-xs text-zinc-400 mt-0.5">30 min · bezplatne · bez zäväzkov</p>
              </div>
            </div>

            {/* Right: CTA pill */}
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-400/80 group-hover:bg-yellow-400/95 backdrop-blur-md text-zinc-900 font-semibold text-xs flex-shrink-0 border border-yellow-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_3px_12px_rgba(250,204,21,0.38)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_16px_rgba(234,179,8,0.5)] transition-all duration-300">
              <Phone className="w-3.5 h-3.5" />
              Rezervovať hovor
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
