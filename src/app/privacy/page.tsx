"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-50 overflow-x-hidden">
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-700 transition-colors duration-200 mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Späť na hlavnú
            </Link>

            <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-4">Právne dokumenty</p>
            <h1 className="font-calsans text-4xl font-extrabold text-zinc-900 mb-8 leading-tight">
              Ochrana súkromia
            </h1>

            <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600 text-sm leading-relaxed">
              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h2 className="font-calsans text-lg font-bold text-zinc-900 mb-3">1. Správca osobných údajov</h2>
                <p>VRATVAR s.r.o., so sídlom v Bratislave, Slovenská republika. Kontakt: privacy@vratvar.sk</p>
              </div>

              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h2 className="font-calsans text-lg font-bold text-zinc-900 mb-3">2. Aké údaje zbierame</h2>
                <p>Zbierame iba údaje, ktoré nám dobrovoľne poskytnete: emailová adresa pri registrácii alebo kontaktnom formulári, meno a názov spoločnosti pri dopyte o spoluprácu.</p>
              </div>

              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h2 className="font-calsans text-lg font-bold text-zinc-900 mb-3">3. Cookies</h2>
                <p>Táto stránka používa technické cookies nevyhnutné pre jej fungovanie. Analytické cookies používame len s vašim súhlasom.</p>
              </div>

              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h2 className="font-calsans text-lg font-bold text-zinc-900 mb-3">4. Vaše práva (GDPR)</h2>
                <p>Máte právo na prístup k údajom, opravu, vymazanie, prenosnosť a námietku voči spracovaniu. Kontaktujte nás na privacy@vratvar.sk.</p>
              </div>

              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h2 className="font-calsans text-lg font-bold text-zinc-900 mb-3">5. Kontakt</h2>
                <p>V prípade otázok ohľadom ochrany súkromia nás kontaktujte na <a href="mailto:privacy@vratvar.sk" className="text-yellow-600 hover:text-yellow-700">privacy@vratvar.sk</a>.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
