"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "vv_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-xl mx-auto"
        >
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon */}
            <div className="w-9 h-9 rounded-xl bg-yellow-400/15 border border-yellow-400/30 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-4 h-4 text-yellow-600" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-zinc-900 text-sm font-semibold leading-snug">Používame cookies</p>
              <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
                Táto stránka používa cookies na zlepšenie vášho zážitku.{" "}
                <Link href="/privacy" className="text-yellow-600 hover:text-yellow-700 underline underline-offset-2">
                  Ochrana súkromia
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-semibold text-zinc-500 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200"
              >
                Odmietnuť
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-semibold text-zinc-900 bg-yellow-400/80 hover:bg-yellow-400 border border-yellow-300/40 shadow-[0_2px_8px_rgba(250,204,21,0.35)] transition-all duration-200"
              >
                Prijať všetky
              </button>
              <button
                onClick={decline}
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-all duration-200 flex-shrink-0"
                aria-label="Zavrieť"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
