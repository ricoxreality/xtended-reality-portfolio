"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface FadeUpTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function FadeUpText({ text, className = "", delay = 0 }: FadeUpTextProps) {
  // Split text by space for words
  const words = useMemo(() => text.split(" "), [text]);

  // Cinematic ease curve typical of luxury editorial sites
  const customEase = [0.76, 0, 0.24, 1] as const;

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-flex mr-[0.25em] pb-1">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 1,
              ease: customEase,
              delay: delay + index * 0.02,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
