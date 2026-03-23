"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type Lang = "sk" | "cz";

export type Translation = {
  nav: { items: { label: string; href: string; page?: string }[]; cta: string; ctaMobile: string };
  hero: {
    badge: string; h1Line1: string; h1Line2: string;
    subtitlePart1: string; dach: string; subtitlePart2: string; control: string; subtitlePart3: string;
    primaryCta: string; secondaryCta: string;
    stats: { value: string; label: string }[];
  };
  services: { label: string; heading: string; subtitle: string; items: { title: string; desc: string }[] };
  whyUs: { label: string; heading: string; items: { title: string; desc: string }[] };
  testimonials: { label: string; heading: string; items: { author: string; company: string; text: string; stars: number }[] };
  lead: {
    label: string; heading: string; subtitle: string; h24: string; subtitleEnd: string;
    emailPlaceholder: string; emailLabel: string; sending: string; sent: string; submit: string;
    privacy: string; or: string; altCta: string;
  };
  footer: { copy: string };
};

const dict: Record<Lang, Translation> = {
  sk: {
    nav: {
      items: [
        { label: "Služby", href: "#services" },
        { label: "ZettelFlow", href: "#zettelflow", page: "/zettelflow" },
        { label: "Custom Apps", href: "#services", page: "/custom-applications" },
        { label: "AI Agenti", href: "#ai-agents", page: "/ai-agents" },
        { label: "O nás", href: "#why-us" },
        { label: "Kontakt", href: "#contact", page: "/contact" },
      ],
      cta: "Rezervovať",
      ctaMobile: "Rezervovať hovor",
    },
    hero: {
      badge: "AI agenty · ZettelFlow · B2B systémy",
      h1Line1: "Budúcnosť B2B",
      h1Line2: "automatizácie.",
      subtitlePart1: "Nekompromisné cloudové systémy pre",
      dach: "DACH región",
      subtitlePart2: "a autonómni AI agenti. Koniec papierovému chaosu. Prevezmite",
      control: "absolútnu kontrolu",
      subtitlePart3: "nad svojou firmou.",
      primaryCta: "Rezervovať strategický hovor",
      secondaryCta: "Pozrieť ZettelFlow",
      stats: [
        { value: "24/7", label: "Nepretržitá prevádzka" },
        { value: "10×", label: "Rýchlejšie procesy" },
        { value: "100%", label: "Automatizovaný workflow" },
      ],
    },
    services: {
      label: "Služby",
      heading: "Čo vyvíjame",
      subtitle: "Od inteligentných B2B portálov po plne autonómne AI systémy — navrhujeme a implementujeme riešenia, ktoré sa škálujú.",
      items: [
        { title: "ZettelFlow", desc: "Inteligentný B2B portál pre stavebné firmy. Projekty, faktúry a tímy na jednom mieste." },
        { title: "Custom Applications", desc: "Webové a mobilné aplikácie na mieru. Moderná architektúra, škálovateľný kód." },
        { title: "AI Agents", desc: "Autonómni AI zamestnanci pre váš biznis. Automatizujú procesy 24/7 bez dohľadu." },
      ],
    },
    whyUs: {
      label: "Prečo my",
      heading: "Prečo spolupracovať s VRATVAR",
      items: [
        { title: "Nekompromisný nemecký štandard", desc: "DACH trh je náš domov. Rozumieme nemeckej byrokracii, KW číslovaniam a STB normám lepšie ako ktokoľvek iný na trhu." },
        { title: "AI-Native prístup", desc: "Nestaviame jednoduché wrappery nad ChatGPT. Vyvíjame skutočných autonómnych agentov, ktorí vykonávajú komplexné pracovné procesy." },
        { title: "Zero-Touch automatizácia", desc: "Naši klienti šetria v priemere 100+ hodín mesačne. Procesy bežia samy — od sledovania hodín cez fakturáciu až po reporty." },
        { title: "Škálovateľná architektúra", desc: "Všetko staviame na Next.js a Supabase. Moderná, výkonná architektúra, ktorá rastie s vaším biznisom bez technického dlhu." },
      ],
    },
    testimonials: {
      label: "Recenzie",
      heading: "Povedali o nás",
      items: [
        { author: "Miroslav Kováč", company: "Kováč Bau GmbH · Stavebná firma", text: "ZettelFlow nám ušetril vyše 120 hodín mesačne. Montéri logujú čas cez mobil a faktúry idú zákazníkom automaticky. Žiadna administratíva.", stars: 5 },
        { author: "Jana Novotná", company: "Novotná & Partneri s.r.o. · Účtovníctvo", text: "AI agenti predspracujú 90 % faktúr bez nášho zásahu. Ušetrili sme 3 pracovné miesta a sme presnejší ako predtým.", stars: 5 },
        { author: "Peter Horváth", company: "BauTech SK a.s. · Stavebná firma", text: "Nemecké KW výkazy boli pre nás nočná mora. Dnes sa generujú automaticky s digitálnym podpisom. VRATVAR nás posunul o 5 rokov dopredu.", stars: 5 },
        { author: "Mária Szabó", company: "EuroRent Management · Správa nehnuteľností", text: "Automatizácia nájomných zmlúv a komunikácie so zákazníkmi nám ušetrila stovky hodín ročne. Odporúčam každej rastúcej firme.", stars: 5 },
        { author: "Tomáš Blaho", company: "Blaho Accounting GmbH · Účtovníctvo", text: "Implementácia trvala menej ako 2 týždne. Tím VRATVAR je absolútne profesionálny a riešenie funguje bezchybne od prvého dňa.", stars: 5 },
        { author: "Daniel Mináč", company: "ProBau Systeme GmbH · Stavebná firma", text: "Live finančný dashboard je revolúcia. Vidím cash flow celej firmy v reálnom čase. Rozhodnutia robím na základe dát, nie tušenia.", stars: 5 },
      ],
    },
    lead: {
      label: "Začnime", heading: "Pripravený škálovať?",
      subtitle: "Zanechajte nám váš email. Ozveme sa do", h24: "24 hodín", subtitleEnd: "s konkrétnym návrhom pre váš biznis.",
      emailPlaceholder: "Váš pracovný e-mail...", emailLabel: "Emailová adresa",
      sending: "Odosielam…", sent: "Odoslané", submit: "Získať prístup",
      privacy: "Žiadny spam. Iba konkrétne informácie. Odhlásiť sa môžete kedykoľvek.",
      or: "alebo", altCta: "Rezervujte si 30-minútový discovery call",
    },
    footer: { copy: "Všetky práva vyhradené." },
  },
  cz: {
    nav: {
      items: [
        { label: "Služby", href: "#services" },
        { label: "ZettelFlow", href: "#zettelflow", page: "/zettelflow" },
        { label: "Custom Apps", href: "#services", page: "/custom-applications" },
        { label: "AI Agenti", href: "#ai-agents", page: "/ai-agents" },
        { label: "O nás", href: "#why-us" },
        { label: "Kontakt", href: "#contact", page: "/contact" },
      ],
      cta: "Rezervovat",
      ctaMobile: "Rezervovat hovor",
    },
    hero: {
      badge: "AI agenti · ZettelFlow · B2B systémy",
      h1Line1: "Budoucnost B2B",
      h1Line2: "automatizace.",
      subtitlePart1: "Nekompromisní cloudové systémy pro",
      dach: "DACH region",
      subtitlePart2: "a autonomní AI agenti. Konec papírování. Převezměte",
      control: "absolutní kontrolu",
      subtitlePart3: "nad svou firmou.",
      primaryCta: "Rezervovat strategický hovor",
      secondaryCta: "Prohlédnout ZettelFlow",
      stats: [
        { value: "24/7", label: "Nepřetržitý provoz" },
        { value: "10×", label: "Rychlejší procesy" },
        { value: "100%", label: "Automatizovaný workflow" },
      ],
    },
    services: {
      label: "Služby",
      heading: "Co vyvíjíme",
      subtitle: "Od inteligentních B2B portálů po plně autonomní AI systémy — navrhujeme a implementujeme řešení, která se škálují.",
      items: [
        { title: "ZettelFlow", desc: "Inteligentní B2B portál pro stavební firmy. Projekty, faktury a týmy na jednom místě." },
        { title: "Custom Applications", desc: "Webové a mobilní aplikace na míru. Moderní architektura, škálovatelný kód." },
        { title: "AI Agents", desc: "Autonomní AI zaměstnanci pro vaše podnikání. Automatizují procesy 24/7 bez dohledu." },
      ],
    },
    whyUs: {
      label: "Proč my",
      heading: "Proč spolupracovat s VRATVAR",
      items: [
        { title: "Nekompromisní německý standard", desc: "DACH trh je náš domov. Rozumíme německé byrokracii, KW výkazům a STB normám lépe než kdokoli jiný na trhu." },
        { title: "AI-Native přístup", desc: "Nestavíme jednoduché wrappery nad ChatGPT. Vyvíjíme skutečné autonomní agenty, kteří provádějí složité pracovní procesy." },
        { title: "Zero-Touch automatizace", desc: "Naši klienti šetří v průměru 100+ hodin měsíčně. Procesy běží samy — od sledování hodin přes fakturaci až po reporty." },
        { title: "Škálovatelná architektura", desc: "Vše stavíme na Next.js a Supabase. Moderní, výkonná architektura, která roste s vaším podnikáním bez technického dluhu." },
      ],
    },
    testimonials: {
      label: "Reference",
      heading: "Co o nás říkají",
      items: [
        { author: "Miroslav Kováč", company: "Kováč Bau GmbH · Stavební firma", text: "ZettelFlow nám ušetřil přes 120 hodin měsíčně. Montéři logují čas přes mobil a faktury jdou zákazníkům automaticky. Žádná administrativa.", stars: 5 },
        { author: "Jana Novotná", company: "Novotná & Partneri s.r.o. · Účetnictví", text: "AI agenti předpracují 90 % faktur bez našeho zásahu. Ušetřili jsme 3 pracovní místa a jsme přesnější než dříve.", stars: 5 },
        { author: "Peter Horváth", company: "BauTech SK a.s. · Stavební firma", text: "Německé KW výkazy byly pro nás noční můra. Dnes se generují automaticky s digitálním podpisem. VRATVAR nás posunul o 5 let dopředu.", stars: 5 },
        { author: "Mária Szabó", company: "EuroRent Management · Správa nemovitostí", text: "Automatizace nájemních smluv a komunikace se zákazníky nám ušetřila stovky hodin ročně. Doporučuji každé rostoucí firmě.", stars: 5 },
        { author: "Tomáš Blaho", company: "Blaho Accounting GmbH · Účetnictví", text: "Implementace trvala méně než 2 týdny. Tým VRATVAR je absolutně profesionální a řešení funguje bezchybně od prvního dne.", stars: 5 },
        { author: "Daniel Mináč", company: "ProBau Systeme GmbH · Stavební firma", text: "Živý finanční dashboard je revoluce. Vidím cash flow celé firmy v reálném čase. Rozhodnutí dělám na základě dat, ne tušení.", stars: 5 },
      ],
    },
    lead: {
      label: "Začněme", heading: "Připraven na škálování?",
      subtitle: "Zanechte nám váš e-mail. Ozveme se do", h24: "24 hodin", subtitleEnd: "s konkrétním návrhem pro vaše podnikání.",
      emailPlaceholder: "Váš pracovní e-mail...", emailLabel: "E-mailová adresa",
      sending: "Odesílám…", sent: "Odesláno", submit: "Získat přístup",
      privacy: "Žádný spam. Pouze konkrétní informace. Odhlásit se můžete kdykoli.",
      or: "nebo", altCta: "Zarezervujte si 30minutový discovery call",
    },
    footer: { copy: "Všechna práva vyhrazena." },
  },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("sk");

  useEffect(() => {
    const host = window.location.hostname;
    if (host === "vratvar.cz" || host.endsWith(".vratvar.cz")) {
      setLang("cz");
    } else {
      setLang("sk");
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
