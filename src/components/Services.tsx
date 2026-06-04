"use client";

import { motion } from "framer-motion";
import { Video, Sparkles, Layers, Compass, PenTool, Film, Volume2 } from "lucide-react";
import FadeUpText from "./FadeUpText";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  { index: "01", icon: Video, title: "AI Video Production", description: "End-to-end cinematic generation. Characters, environments, lighting — all inside a generative pipeline. No crew, no sets, just direction.", tags: ["Diffusion Pipelines", "Multi-Shot Sequencing"] },
  { index: "02", icon: Sparkles, title: "AI Ad Creation", description: "Performance ads built for attention. Visual hooks tested and shipped fast, across every format.", tags: ["Social-First Formats", "Dynamic Variations"] },
  { index: "03", icon: Layers, title: "Product Visualization", description: "Photorealistic product staging without physical sets. Any surface, any environment, any material.", tags: ["Fluid Simulations", "Volumetric Lighting"] },
  { index: "04", icon: Compass, title: "Creative Direction", description: "Human vision guiding machine output. Color logic, camera language, and emotional arc — defined before a single frame renders.", tags: ["Style Guide Alignment", "Visual Identity"] },
  { index: "05", icon: PenTool, title: "Concept Development", description: "From brief to photorealistic styleframes in hours. Prototype your campaign before committing to full production.", tags: ["Styleframes", "Concept Sprints"] },
  { index: "06", icon: Film, title: "Motion Design & Editing", description: "Pacing, transitions, compositing. Speed ramps, particle systems, VFX integration — everything premium post requires.", tags: ["3D Compositing", "VFX & Morphing"] },
  { index: "07", icon: Volume2, title: "Sound Design", description: "Custom spatial soundscapes, voiceovers, and Foley timed to the frame. The auditory dimension is not optional.", tags: ["Spatial Audio", "Soundtrack Scoring"] },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-36 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-24 mb-20 md:mb-28">
          <div className="md:w-1/2">
            <p className="font-sans text-[10px] text-[#555] tracking-[0.25em] uppercase mb-5">Capabilities</p>
            <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-[#eeece6]">
              <FadeUpText text="A full creative" /><br />
              <FadeUpText text="infrastructure." delay={0.2} />
            </h2>
          </div>
          <p className="font-sans text-[#777] text-sm leading-relaxed md:w-1/3 font-light">
            We act as a complete creative partner — from first brief to final delivery. The speed of AI, the judgment of a senior director.
          </p>
        </div>

        <div className="space-y-0">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: idx * 0.04 }}
                className="group grid grid-cols-12 gap-4 md:gap-8 py-7 md:py-8 border-b border-white/[0.06] hover:border-white/[0.12] transition-colors duration-400 items-start"
              >
                <div className="col-span-1 hidden md:flex items-center">
                  <span className="font-mono text-[10px] text-[#333] group-hover:text-[#555] transition-colors tracking-wider">{s.index}</span>
                </div>
                <div className="col-span-2 md:col-span-1 flex items-start pt-0.5">
                  <div className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-[#555] group-hover:text-[#eeece6] group-hover:border-white/20 transition-all duration-400">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="col-span-10 md:col-span-3 flex items-start">
                  <h3 className="font-display font-bold text-base md:text-lg text-[#aaa] group-hover:text-[#eeece6] transition-colors duration-300 tracking-tight leading-tight">{s.title}</h3>
                </div>
                <div className="col-span-12 md:col-span-4 pl-10 md:pl-0">
                  <p className="font-sans text-[#555] text-sm leading-relaxed font-light group-hover:text-[#777] transition-colors duration-300">{s.description}</p>
                </div>
                <div className="col-span-12 md:col-span-3 pl-10 md:pl-0 flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span key={tag} className="inline-flex px-2.5 py-1 rounded-full border border-white/6 text-[10px] font-mono text-[#444] group-hover:text-[#666] group-hover:border-white/10 transition-all duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
