"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  scale?: boolean;
  className?: string;
};

const springy = [0.34, 1.3, 0.64, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  scale = false,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: reduce ? 0 : y,
        scale: reduce || !scale ? 1 : 0.96,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: springy, delay }}
    >
      {children}
    </motion.div>
  );
}
