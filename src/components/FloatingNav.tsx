"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function FloatingNav() {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    t.nav.items.forEach(({ href }) => {
      // Only observe DOM elements for anchor links, not page routes
      if (href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    if (pathname !== "/") {
      router.push("/" + href);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pathname, router]);

  return (
    <div className="fixed top-5 inset-x-0 z-50 flex flex-col items-center pointer-events-none px-4">
      {/* ═══════════════════════════════════════
          Dynamic Island Pill
          ═══════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
          delay: 0.12,
        }}
        className={cn(
          "pointer-events-auto relative flex items-center gap-2 px-4 py-2.5",
          "max-w-7xl w-full justify-between",
          "rounded-full border backdrop-blur-2xl",
          "transition-[background-color,border-color,box-shadow] duration-500 ease-out",
          scrolled
            ? [
                "bg-white/90 border-zinc-200",
                "shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_0_rgba(0,0,0,0.04)]",
              ]
            : [
                "bg-white/70 border-zinc-200/70",
                "shadow-[0_4px_16px_rgba(0,0,0,0.04)]",
              ]
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ── Inner noise texture overlay ── */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ── Logo ── */}
        <Link
          href="/"
          className="relative flex items-center gap-2 pl-2 pr-5 mr-1 group"
          aria-label="VRATVAR — home"
        >
          <Image
            src="/logo.svg"
            alt="VRATVAR logo mark"
            width={22}
            height={20}
            className="flex-shrink-0 group-hover:opacity-70 transition-opacity duration-200"
            priority
          />
          <span className="font-lexend text-sm font-bold tracking-[0.08em] text-zinc-900 leading-none group-hover:opacity-70 transition-opacity duration-200">
            VRAT<span className="text-yellow-500">VAR</span>
          </span>
        </Link>

        {/* ── Divider ── */}
        <div className="hidden md:block w-px h-5 bg-zinc-200 flex-shrink-0" />

        {/* ── Desktop Nav Links (center) ── */}
        <div className="hidden md:flex items-center gap-0.5 px-1">
          {t.nav.items.map((item) => {
            const isActive = item.page
              ? pathname === item.page
              : pathname === "/" && activeSection === item.href;
            const sharedClass = cn(
              "relative px-4 py-2 text-sm font-medium rounded-full tracking-wide",
              "transition-all duration-200 cursor-pointer",
              isActive
                ? "text-zinc-900 bg-zinc-100"
                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/70"
            );
            const pill = isActive && (
              <motion.span
                layoutId="nav-active-pill"
                className="absolute inset-0 rounded-full bg-zinc-100 border border-zinc-200"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            );
            return item.page ? (
              <Link key={item.href + item.page} href={item.page} className={sharedClass}>
                {pill}
                <span className="relative">{item.label}</span>
              </Link>
            ) : (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={sharedClass}
              >
                {pill}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Right: Lang Switcher + CTA + Hamburger ── */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-0.5">
            <button
              onClick={() => setLang("sk")}
              className={cn(
                "px-2 py-1 rounded-full text-[11px] font-semibold tracking-widest transition-all duration-200",
                lang === "sk" ? "text-zinc-900 bg-zinc-100" : "text-zinc-400 hover:text-zinc-700"
              )}
            >
              SK
            </button>
            <span className="text-zinc-300 text-[11px] select-none">|</span>
            <button
              onClick={() => setLang("cz")}
              className={cn(
                "px-2 py-1 rounded-full text-[11px] font-semibold tracking-widest transition-all duration-200",
                lang === "cz" ? "text-zinc-900 bg-zinc-100" : "text-zinc-400 hover:text-zinc-700"
              )}
            >
              CZ
            </button>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-zinc-200 flex-shrink-0" />

          {/* CTA */}
          <motion.a
            href="/contact"
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ y: 1, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className={cn(
              "flex items-center gap-1.5 px-4 py-[7px] rounded-full",
              "text-[12.5px] font-semibold text-zinc-900 tracking-wide",
              "bg-yellow-400/80 hover:bg-yellow-400/95 backdrop-blur-md",
              "border border-yellow-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_8px_rgba(250,204,21,0.35)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_12px_rgba(234,179,8,0.45)]",
              "transition-all duration-300 flex-shrink-0"
            )}
          >
            <Phone className="w-3 h-3 flex-shrink-0" />
            <span className="hidden sm:inline">{t.nav.cta}</span>
          </motion.a>

          {/* Mobile Hamburger */}
          <motion.button
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.88 }}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-all duration-200 flex-shrink-0"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.14 }} className="flex">
                  <X className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.14 }} className="flex">
                  <Menu className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════
          Mobile Dropdown Menu
          ═══════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className={cn(
              "pointer-events-auto mt-2 w-full max-w-[280px]",
              "rounded-2xl border border-zinc-100",
              "backdrop-blur-xl bg-white/95",
              "shadow-[0_8px_40px_rgba(0,0,0,0.08)]",
              "overflow-hidden"
            )}
          >
            {/* Nav links */}
            <div className="flex flex-col p-2 pb-1.5">
              {t.nav.items.map((item, i) => {
                const isActive = item.page
                  ? pathname === item.page
                  : pathname === "/" && activeSection === item.href;
                const mobileClass = cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm",
                  "transition-all duration-200 text-left w-full",
                  isActive
                    ? "text-zinc-900 bg-zinc-100"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                );
                const inner = (
                  <>
                    <span className="text-zinc-300 font-mono text-[10px] w-5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium tracking-wide">{item.label}</span>
                  </>
                );
                return item.page ? (
                  <motion.div
                    key={item.href + item.page}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.22 }}
                  >
                    <Link href={item.page} onClick={() => setMobileOpen(false)} className={mobileClass}>
                      {inner}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.22 }}
                    onClick={() => handleNavClick(item.href)}
                    className={mobileClass}
                  >
                    {inner}
                  </motion.button>
                );
              })}
            </div>

            {/* Separator */}
            <div className="h-px bg-zinc-100 mx-3" />

            {/* CTA */}
            <div className="p-3">
              <motion.a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ y: 1, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                className={cn(
                  "flex items-center justify-center gap-2 w-full py-2.5 rounded-xl",
                  "bg-yellow-400 hover:bg-yellow-500 text-zinc-900 text-sm font-semibold",
                  "shadow-[0_2px_8px_rgba(250,204,21,0.3)] hover:shadow-[0_4px_16px_rgba(234,179,8,0.45)]",
                  "transition-colors duration-200"
                )}
              >
                <Phone className="w-3.5 h-3.5" />
                {t.nav.ctaMobile}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
