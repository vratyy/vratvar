"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const SPRING = [0.16, 1, 0.3, 1] as [number, number, number, number];
const INTERVAL_MS = 4800;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type TItem = { author: string; company: string; text: string; stars: number };

function TestimonialCard({ item, featured }: { item: TItem; featured?: boolean }) {
  return (
    <div
      className={cn(
        "relative bg-white border rounded-3xl p-8 h-full overflow-hidden transition-all duration-300",
        featured
          ? "border-zinc-200 shadow-[0_12px_48px_rgba(0,0,0,0.09)]"
          : "border-zinc-100 shadow-sm"
      )}
    >
      {/* Top accent on featured */}
      {featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[1.5px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
      )}

      <Quote
        className={cn(
          "w-7 h-7 mb-5",
          featured ? "text-yellow-400" : "text-zinc-200"
        )}
      />

      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: item.stars }).map((_, j) => (
          <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden />
        ))}
      </div>

      <p
        className={cn(
          "leading-relaxed mb-7",
          featured ? "text-zinc-700 text-base" : "text-zinc-400 text-sm"
        )}
      >
        &ldquo;{item.text}&rdquo;
      </p>

      <div className="flex items-center gap-3 mt-auto">
        <div className="w-9 h-9 rounded-full bg-yellow-400/15 border border-yellow-400/25 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-yellow-700">{getInitials(item.author)}</span>
        </div>
        <div>
          <p className="text-zinc-900 font-semibold text-sm leading-none">{item.author}</p>
          <p className="text-zinc-400 text-xs mt-1">{item.company}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const { t } = useLanguage();
  const items = t.testimonials.items;
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (delta: number) => {
      setDir(delta);
      setActive((prev) => (prev + delta + items.length) % items.length);
    },
    [items.length]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, go]);

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 56 : -56, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.48, ease: SPRING } },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -56 : 56,
      scale: 0.97,
      transition: { duration: 0.32, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
    }),
  };

  const prev = items[(active - 1 + items.length) % items.length];
  const next = items[(active + 1) % items.length];

  return (
    <section className="py-24 px-6 border-t border-zinc-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: SPRING }}
        className="text-center mb-16 space-y-3"
      >
        <p className="text-yellow-600 text-[11px] font-semibold tracking-[0.25em] uppercase">
          {t.testimonials.label}
        </p>
        <h2 className="font-calsans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          {t.testimonials.heading}
        </h2>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: SPRING, delay: 0.15 }}
        className="max-w-5xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Cards row */}
        <div className="flex items-stretch gap-5">
          {/* Prev peek card */}
          <div className="hidden lg:block flex-shrink-0 w-64 opacity-35 scale-[0.95] origin-right pointer-events-none select-none">
            <TestimonialCard item={prev} />
          </div>

          {/* Featured card */}
          <div className="flex-1 min-w-0" style={{ minHeight: 280 }}>
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={active}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="h-full"
              >
                <TestimonialCard item={items[active]} featured />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next peek card */}
          <div className="hidden lg:block flex-shrink-0 w-64 opacity-35 scale-[0.95] origin-left pointer-events-none select-none">
            <TestimonialCard item={next} />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-10">
          {/* Prev arrow */}
          <button
            onClick={() => go(-1)}
            className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dot progress */}
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
                aria-label={`Testimonial ${i + 1}`}
                className={cn(
                  "relative rounded-full overflow-hidden transition-all duration-300 bg-zinc-200",
                  i === active ? "w-7 h-2" : "w-2 h-2 hover:bg-zinc-300"
                )}
              >
                {i === active && (
                  <motion.span
                    key={active}
                    className="absolute inset-0 rounded-full bg-yellow-400 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? undefined : 1 }}
                    transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={() => go(1)}
            className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Counter */}
        <p className="text-center mt-3 text-[11px] font-mono text-zinc-400 tracking-widest select-none">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
      </motion.div>
    </section>
  );
}
