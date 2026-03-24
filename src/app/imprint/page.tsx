"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function ImprintPage() {
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
              Impressum
            </h1>

            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm space-y-5 text-sm text-zinc-600 leading-relaxed">
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-1">Spoločnosť</p>
                <p className="text-zinc-900 font-semibold">VRATVAR s.r.o.</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-1">Sídlo</p>
                <p>Bratislava, Slovenská republika</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-1">E-mail</p>
                <a href="mailto:info@vratvar.sk" className="text-yellow-600 hover:text-yellow-700 transition-colors">info@vratvar.sk</a>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-1">Webová stránka</p>
                <p>vratvar.sk</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-1">Zodpovedná osoba</p>
                <p>Konateľ spoločnosti VRATVAR s.r.o.</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-1">Registrácia</p>
                <p>Obchodný register Okresného súdu Bratislava I</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
