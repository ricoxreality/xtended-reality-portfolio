"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeUpText from "./FadeUpText";

const ease = [0.16, 1, 0.3, 1] as const;

function scrollTo(href: string, e: React.MouseEvent) {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col overflow-hidden">

      {/* Subtle vignette — no colored glows, editorial restraint */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_-10%,rgba(238,236,230,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative flex-1 flex flex-col justify-end max-w-7xl mx-auto px-6 lg:px-12 w-full pt-40 pb-16 md:pb-20">
        <motion.div style={{ y, opacity }} className="flex flex-col">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="w-10 h-px bg-[#eeece6]/20" />
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#777]">
              AI Creative Studio · Est. 2024
            </span>
          </motion.div>

          {/* Large Cinzel headline */}
          <div className="mb-2">
            <h1 className="font-display font-bold text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-[-0.01em] text-[#eeece6]">
              <FadeUpText text="Visuals that" delay={0.1} />
            </h1>
          </div>
          <div className="mb-10 md:mb-14">
            <h1 className="font-display font-bold text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-[-0.01em] text-[#eeece6]/40">
              <FadeUpText text="look impossible." delay={0.3} />
            </h1>
          </div>

          {/* Sub copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
            className="flex flex-col md:flex-row md:items-end gap-8 md:gap-20"
          >
            <p className="font-sans text-[#777] text-base md:text-lg leading-relaxed max-w-md font-light">
              Xtended Reality is a boutique AI production house. Cinematic brand films, product ads, and experimental campaigns — at a fraction of traditional production cost.
            </p>
            <div className="flex gap-3 shrink-0">
              <a
                href="#work"
                onClick={(e) => scrollTo("#work", e)}
                className="group inline-flex items-center gap-2 bg-[#eeece6] text-[#111] text-[12px] font-sans uppercase tracking-[0.1em] px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-300"
              >
                View Work
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 7H7m10 0v10" />
                </svg>
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollTo("#contact", e)}
                className="inline-flex items-center gap-2 text-[#eeece6] text-[12px] font-sans uppercase tracking-[0.1em] px-7 py-3.5 rounded-full border border-[#eeece6]/15 hover:border-[#eeece6]/40 hover:bg-[#eeece6]/3 transition-all duration-300"
              >
                Start a Project
              </a>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex items-center gap-3"
          >
            <div className="w-px h-12 bg-[#eeece6]/10" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#555]">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
