"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Partner = {
  name: string;
  src: string;
  w: number;
  h: number;
  floatDuration: number;
  floatDelay: number;
};

const PARTNERS: Partner[] = [
  { name: "DV",          src: "/loga%20partnerov/DV-icon.svg",              w: 30,  h: 32,  floatDuration: 3.6, floatDelay: 0.0  },
  { name: "Forbes",      src: "/loga%20partnerov/Forbes_idMGYiEOgb_0.svg", w: 104, h: 26,  floatDuration: 4.1, floatDelay: 0.5  },
  { name: "Eldenea",     src: "/loga%20partnerov/eldenea-logo-white.svg",   w: 128, h: 16,  floatDuration: 3.2, floatDelay: 1.0  },
  { name: "Nosto",       src: "/loga%20partnerov/nosto-logo.svg",           w: 100, h: 20,  floatDuration: 4.5, floatDelay: 0.3  },
  { name: "RealityExpo", src: "/loga%20partnerov/realityexpo.svg",          w: 124, h: 36,  floatDuration: 3.8, floatDelay: 1.4  },
];

// Triple for a seamless, full-width marquee
const TRACK = [...PARTNERS, ...PARTNERS, ...PARTNERS];

function PartnerItem({ partner, trackIndex }: { partner: Partner; trackIndex: number }) {
  const p = PARTNERS[trackIndex % PARTNERS.length];
  return (
    <div className="shrink-0 select-none opacity-[0.22] hover:opacity-60 transition-opacity duration-500 cursor-default group">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: p.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: p.floatDelay,
        }}
        className="flex items-center"
      >
        <Image
          src={partner.src}
          alt={partner.name}
          width={partner.w}
          height={partner.h}
          className="object-contain max-h-9 group-hover:[filter:drop-shadow(0_0_8px_rgba(250,204,21,0.35))] transition-all duration-500"
          unoptimized
        />
      </motion.div>
    </div>
  );
}

export function TrustedBySection() {
  return (
    <section className="py-16 border-b border-zinc-800 overflow-hidden bg-zinc-900">
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-[11px] font-semibold tracking-[0.28em] uppercase text-zinc-600 mb-12 px-6"
      >
        Naši partneri
      </motion.p>

      {/* Marquee */}
      <div className="relative [mask-image:linear-gradient(to_right,transparent_0%,black_14%,black_86%,transparent_100%)]">
        <div className="flex overflow-hidden hover:[&>div]:[animation-play-state:paused]">
          <div className="flex gap-20 shrink-0 items-center animate-marquee">
            {TRACK.map((p, i) => (
              <PartnerItem key={`${p.name}-${i}`} partner={p} trackIndex={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
