"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FAQ_SK = [
  {
    q: "Koľko stojí implementácia?",
    a: "Cena závisí od rozsahu projektu. AI agenti, ZettelFlow aj custom aplikácie sú projektovo ocenené po bezplatnej konzultácii. Nezáväznú cenovú ponuku dostanete už do 24 hodín.",
  },
  {
    q: "Ako dlho trvá nasadenie?",
    a: "ZettelFlow nasadzujeme do 5–10 pracovných dní. AI agenti sú live do 2 týždňov. Custom aplikácie podľa rozsahu, zvyčajne 4–12 týždňov. Garantujeme dodanie v dohodnutom termíne.",
  },
  {
    q: "Potrebujem vlastný IT tím?",
    a: "Nie. Celú implementáciu, konfiguráciu a onboarding zvládneme my. Váš tím dostane plné školenie a dokumentáciu. Technická podpora je súčasťou každého plánu.",
  },
  {
    q: "Funguje to s našimi existujúcimi nástrojmi?",
    a: "Áno. Integrujeme sa so SAP Business One, DATEV, Lexware, sevDesk, Google Workspace, Microsoft 365, Slack, Stripe, Make.com a mnohými ďalšími. Ak váš nástroj má API, vieme ho prepojiť.",
  },
  {
    q: "Sú naše dáta v bezpečí?",
    a: "Všetky dáta sú uložené na EU serveroch (GDPR-compliant). Používame end-to-end šifrovanie, role-based prístup a pravidelné zálohy. Spĺňame požiadavky nemeckého DSGVO.",
  },
  {
    q: "Čo ak riešenie nefunguje ako má?",
    a: "Ponúkame SLA s garantovanou dostupnosťou 99.9%. V prípade problémov reagujeme do 4 hodín. Prvých 30 dní je plná podpora zadarmo — chceme, aby ste boli spokojní od prvého dňa.",
  },
  {
    q: "Môžem vyskúšať ZettelFlow pred kúpou?",
    a: "Áno. Po úvodnom hovore vám pripravíme live demo priamo pre vašu firmu a procesy — nie generickú prezentáciu. Vidíte reálne výsledky skôr, ako niečo podpíšete.",
  },
];

const FAQ_CZ = [
  {
    q: "Kolik stojí implementace?",
    a: "Cena závisí na rozsahu projektu. AI agenti, ZettelFlow i vlastní aplikace jsou projektově oceněny po bezplatné konzultaci. Nezávaznou cenovou nabídku dostanete již do 24 hodin.",
  },
  {
    q: "Jak dlouho trvá nasazení?",
    a: "ZettelFlow nasazujeme do 5–10 pracovních dnů. AI agenti jsou live do 2 týdnů. Vlastní aplikace podle rozsahu, obvykle 4–12 týdnů. Garantujeme dodání v dohodnutém termínu.",
  },
  {
    q: "Potřebuji vlastní IT tým?",
    a: "Ne. Celou implementaci, konfiguraci a onboarding zvládneme my. Váš tým dostane plné školení a dokumentaci. Technická podpora je součástí každého plánu.",
  },
  {
    q: "Funguje to s našimi stávajícími nástroji?",
    a: "Ano. Integrujeme se s SAP Business One, DATEV, Lexware, sevDesk, Google Workspace, Microsoft 365, Slack, Stripe, Make.com a mnoha dalšími. Pokud váš nástroj má API, umíme ho propojit.",
  },
  {
    q: "Jsou naše data v bezpečí?",
    a: "Všechna data jsou uložena na EU serverech (GDPR-compliant). Používáme end-to-end šifrování, role-based přístup a pravidelné zálohy. Splňujeme požadavky německého DSGVO.",
  },
  {
    q: "Co když řešení nefunguje jak má?",
    a: "Nabízíme SLA s garantovanou dostupností 99.9%. V případě problémů reagujeme do 4 hodin. Prvních 30 dní je plná podpora zdarma — chceme, abyste byli spokojeni od prvního dne.",
  },
  {
    q: "Mohu vyzkoušet ZettelFlow před koupí?",
    a: "Ano. Po úvodním hovoru vám připravíme live demo přímo pro vaši firmu a procesy — ne generickou prezentaci. Vidíte reálné výsledky dříve, než cokoli podepíšete.",
  },
];

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-zinc-900 font-semibold text-sm sm:text-base leading-snug group-hover:text-yellow-600 transition-colors duration-200">
          {q}
        </span>
        <span className="w-7 h-7 rounded-full border border-zinc-200 group-hover:border-yellow-400/50 flex items-center justify-center flex-shrink-0 transition-all duration-200 bg-white">
          {open ? (
            <Minus className="w-3.5 h-3.5 text-yellow-500" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-zinc-400 group-hover:text-yellow-500" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-zinc-500 leading-relaxed pr-10">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const { lang } = useLanguage();
  const items = lang === "cz" ? FAQ_CZ : FAQ_SK;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className="py-24 md:py-32 px-6 border-t border-zinc-100">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-yellow-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            {lang === "cz" ? "Časté dotazy" : "Časté otázky"}
          </p>
          <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            {lang === "cz" ? "Máte otázky? My máme odpovědi." : "Máte otázky? My máme odpovede."}
          </h2>
          <p className="mt-4 text-zinc-500 text-base max-w-xl mx-auto leading-relaxed">
            {lang === "cz"
              ? "Nejčastější otázky od klientů před zahájením spolupráce."
              : "Najčastejšie otázky klientov pred začatím spolupráce."}
          </p>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="bg-white border border-zinc-100 rounded-3xl px-6 sm:px-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
        >
          {items.map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              open={openIdx === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-8 text-sm text-zinc-400"
        >
          {lang === "cz" ? "Nenašli jste odpověď?" : "Nenašli ste odpoveď?"}{" "}
          <a href="/contact" className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors duration-200">
            {lang === "cz" ? "Napište nám →" : "Napíšte nám →"}
          </a>
        </motion.p>
      </div>
    </section>
  );
}
