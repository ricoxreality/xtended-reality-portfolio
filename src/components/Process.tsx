"use client";

import { motion } from "framer-motion";
import FadeUpText from "./FadeUpText";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  { num: "01", title: "Strategy & Concept", description: "We start with storytelling, not technology. Defining narrative arc, emotional tone, and visual language before a single prompt is written." },
  { num: "02", title: "AI Visual Development", description: "Custom generative pipelines render initial concepts at speed. We iterate until the aesthetic is undeniable." },
  { num: "03", title: "Animation & Editing", description: "Motion, timing, compositing, grading, and sound — assembled with the same craft as any premium production house." },
  { num: "04", title: "Delivery & Scaling", description: "Multiple formats. Multiple channels. Production-ready packages delivered faster than any traditional crew." },
];

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-36 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20 md:mb-28 max-w-3xl">
          <p className="font-sans text-[10px] text-[#555] tracking-[0.25em] uppercase mb-5">Workflow</p>
          <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-[#eeece6]">
            <FadeUpText text="Four steps from brief" /><br />
            <FadeUpText text="to impossible." delay={0.2} />
          </h2>
        </div>

        <div className="space-y-0">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease, delay: idx * 0.06 }}
              className="group grid grid-cols-12 gap-4 md:gap-12 py-10 md:py-14 border-b border-white/[0.06] hover:border-white/[0.1] transition-colors duration-500"
            >
              <div className="col-span-2 md:col-span-2">
                <span className="font-display font-bold text-5xl md:text-8xl text-[#1f1f1f] group-hover:text-[#2a2a2a] transition-colors duration-500 leading-none select-none">
                  {step.num}
                </span>
              </div>
              <div className="col-span-10 md:col-span-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-16 pt-1 md:pt-4">
                <h3 className="font-display font-bold text-xl md:text-2xl text-[#aaa] group-hover:text-[#eeece6] tracking-tight transition-colors duration-300 md:w-72 shrink-0">
                  {step.title}
                </h3>
                <p className="font-sans text-[#555] text-sm md:text-base leading-relaxed font-light group-hover:text-[#777] transition-colors duration-300 max-w-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
