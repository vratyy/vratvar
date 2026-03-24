"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function TermsPage() {
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
              Podmienky použitia
            </h1>

            <div className="space-y-6 text-zinc-600 text-sm leading-relaxed">
              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h2 className="font-calsans text-lg font-bold text-zinc-900 mb-3">1. Všeobecné ustanovenia</h2>
                <p>Tieto podmienky upravujú používanie webovej stránky vratvar.sk a súvisiacich služieb poskytovaných spoločnosťou VRATVAR s.r.o.</p>
              </div>

              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h2 className="font-calsans text-lg font-bold text-zinc-900 mb-3">2. Používanie stránky</h2>
                <p>Obsah tejto stránky je chránený autorským právom. Je zakázané kopírovanie, distribúcia alebo iné použitie bez písomného súhlasu VRATVAR s.r.o.</p>
              </div>

              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h2 className="font-calsans text-lg font-bold text-zinc-900 mb-3">3. Obmedzenie zodpovednosti</h2>
                <p>VRATVAR s.r.o. nezodpovedá za škody vzniknuté používaním tejto stránky alebo informácií na nej uvedených.</p>
              </div>

              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h2 className="font-calsans text-lg font-bold text-zinc-900 mb-3">4. Rozhodné právo</h2>
                <p>Tieto podmienky sa riadia právnym poriadkom Slovenskej republiky. Príslušným súdom sú súdy Slovenskej republiky.</p>
              </div>

              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h2 className="font-calsans text-lg font-bold text-zinc-900 mb-3">5. Kontakt</h2>
                <p>Otázky k podmienkam posielajte na <a href="mailto:legal@vratvar.sk" className="text-yellow-600 hover:text-yellow-700">legal@vratvar.sk</a>.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
