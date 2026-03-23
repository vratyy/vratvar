import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ZettelFlowSection } from "@/components/sections/ZettelFlowSection";
import { AIAgentsSection } from "@/components/sections/AIAgentsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LeadCaptureSection } from "@/components/sections/LeadCaptureSection";

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
      <ServicesSection />
      <ZettelFlowSection />
      <AIAgentsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <LeadCaptureSection />

      {/* ─── Footer ─── */}
      <footer className="border-t border-zinc-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-lexend text-sm font-bold tracking-[0.06em] text-zinc-400">
            VRAT<span className="text-yellow-500">VAR</span>
          </span>
          <p className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} VRATVAR. Všetky práva vyhradené.
          </p>
        </div>
      </footer>
    </main>
  );
}
