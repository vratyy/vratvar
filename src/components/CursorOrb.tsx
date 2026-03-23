"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorOrb() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 22, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 22, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 100);
      mouseY.set(e.clientY - 100);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-30"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgba(253,224,71,0.55) 0%, rgba(251,191,36,0.2) 40%, transparent 70%)",
        filter: "blur(48px)",
        willChange: "transform",
      }}
    />
  );
}
