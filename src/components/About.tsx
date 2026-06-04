"use client";

import { motion } from "framer-motion";
import FadeUpText from "./FadeUpText";

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Large editorial pullquote */}
        <div
          className="mb-10 md:mb-20"
        >
          <p className="font-sans text-[10px] text-[#555] tracking-[0.25em] uppercase mb-8">The Studio</p>
          <h2 className="font-display font-bold text-[clamp(1.8rem,5vw,4rem)] leading-[1.1] tracking-tight text-[#eeece6] max-w-5xl">
            <FadeUpText text="We make AI do what only the best directors used to." />
          </h2>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="md:col-span-5 space-y-5"
          >
            <p className="font-sans text-[#eeece6]/80 text-base md:text-lg leading-relaxed">
              At Xtended Reality, we don&apos;t think of AI as a production shortcut. We think of it as a new kind of camera — one that can see things no physical lens ever could.
            </p>
            <p className="font-sans text-[#777] text-sm md:text-base leading-relaxed font-light">
              Our team comes from commercial filmmaking, visual effects, and editorial design. We bring cinematic structure to generative output: proper shot grammar, intentional color science, deliberate sound design.
            </p>
            <p className="font-sans text-[#777] text-sm md:text-base leading-relaxed font-light">
              Every pixel runs through a human director before it leaves our studio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="md:col-span-7 flex flex-col justify-between gap-10"
          >
            {/* Highlights */}
            <div className="space-y-5">
              {[
                "Filmmaking approach, AI execution",
                "Direction-first, technology-second",
                "Full pipeline: concept to delivery",
              ].map((h, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="w-4 h-px bg-[#eeece6]/20 shrink-0 group-hover:w-8 group-hover:bg-[#eeece6]/50 transition-all duration-400" />
                  <p className="font-sans text-[#777] text-sm group-hover:text-[#eeece6] transition-colors duration-300">{h}</p>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 divide-x divide-white/[0.06] border border-white/[0.06] rounded-lg overflow-hidden">
              {[
                { value: "10×", label: "Faster" },
                { value: "8K", label: "Resolution" },
                { value: "0%", label: "Stock footage" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-1 py-7 hover:bg-white/[0.02] transition-colors group">
                  <span className="font-display font-bold text-2xl md:text-3xl text-[#eeece6] tracking-tight group-hover:text-white transition-colors">{s.value}</span>
                  <span className="font-mono text-[9px] text-[#555] uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Pullquote */}
            <div className="border-l border-[#eeece6]/15 pl-5">
              <p className="font-sans italic text-sm text-[#555] leading-relaxed">
                &ldquo;A two-person team producing work that previously needed fifty people, six months, and a six-figure budget.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
