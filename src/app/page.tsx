import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ZettelFlowSection } from "@/components/sections/ZettelFlowSection";
import { AIAgentsSection } from "@/components/sections/AIAgentsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadCaptureSection } from "@/components/sections/LeadCaptureSection";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative bg-[#FAFAFA] overflow-x-hidden">
      {/* ── Ambient background blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Services area — left */}
        <div
          className="absolute will-change-transform transform-gpu rounded-full"
          style={{
            top: "105vh", left: "-12rem",
            width: "560px", height: "480px",
            background: "radial-gradient(circle, rgba(253,224,71,0.22) 0%, rgba(253,224,71,0) 70%)",
          }}
        />
        {/* ZettelFlow area — right */}
        <div
          className="absolute will-change-transform transform-gpu rounded-full"
          style={{
            top: "185vh", right: "-8rem",
            width: "600px", height: "500px",
            background: "radial-gradient(circle, rgba(251,191,36,0.18) 0%, rgba(251,191,36,0) 70%)",
          }}
        />
        {/* AI Agents area — center-left */}
        <div
          className="absolute will-change-transform transform-gpu rounded-full"
          style={{
            top: "290vh", left: "20%",
            width: "700px", height: "420px",
            background: "radial-gradient(circle, rgba(253,224,71,0.15) 0%, rgba(253,224,71,0) 70%)",
          }}
        />
        {/* Why Us area — right */}
        <div
          className="absolute will-change-transform transform-gpu rounded-full"
          style={{
            top: "390vh", right: "-10rem",
            width: "560px", height: "560px",
            background: "radial-gradient(circle, rgba(252,211,77,0.20) 0%, rgba(252,211,77,0) 70%)",
          }}
        />
        {/* Testimonials / Contact area — center */}
        <div
          className="absolute will-change-transform transform-gpu rounded-full"
          style={{
            top: "500vh", left: "50%",
            transform: "translateX(-50%)",
            width: "800px", height: "400px",
            background: "radial-gradient(circle, rgba(253,224,71,0.18) 0%, rgba(253,224,71,0) 70%)",
          }}
        />
      </div>

      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <ZettelFlowSection />
      <AIAgentsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <FAQSection />
      <LeadCaptureSection />

      {/* ─── Footer ─── */}
      <footer className="border-t border-zinc-100 bg-white pt-14 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <span className="font-lexend text-base font-bold tracking-[0.06em] text-zinc-900 block mb-3">
                VRAT<span className="text-yellow-500">VAR</span>
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-[180px]">
                AI-powered B2B automatizácia pre DACH región.
              </p>
            </div>
            {/* Products */}
            <div>
              <p className="text-xs font-semibold text-zinc-900 tracking-[0.15em] uppercase mb-4">Produkty</p>
              <ul className="space-y-2.5">
                <li><Link href="/zettelflow" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200">ZettelFlow</Link></li>
                <li><Link href="/ai-agents" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200">AI Agenti</Link></li>
                <li><Link href="/custom-applications" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200">Custom Apps</Link></li>
              </ul>
            </div>
            {/* Company */}
            <div>
              <p className="text-xs font-semibold text-zinc-900 tracking-[0.15em] uppercase mb-4">Spoločnosť</p>
              <ul className="space-y-2.5">
                <li><Link href="/#why-us" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200">O nás</Link></li>
                <li><Link href="/contact" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200">Kontakt</Link></li>
              </ul>
            </div>
            {/* Legal */}
            <div>
              <p className="text-xs font-semibold text-zinc-900 tracking-[0.15em] uppercase mb-4">Právne</p>
              <ul className="space-y-2.5">
                <li><Link href="/privacy" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200">Ochrana súkromia</Link></li>
                <li><Link href="/terms" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200">Podmienky použitia</Link></li>
                <li><Link href="/imprint" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200">Impressum</Link></li>
              </ul>
            </div>
          </div>
          {/* Bottom bar */}
          <div className="border-t border-zinc-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-400">
              &copy; {new Date().getFullYear()} VRATVAR s.r.o. Všetky práva vyhradené.
            </p>
            <p className="text-xs text-zinc-400">Bratislava · Wien · Praha</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
