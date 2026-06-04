"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HamburgerMenu from "@/components/HamburgerMenu";
import CustomCursor from "@/components/CustomCursor";

// Helper for parallax images
function ParallaxImage({ src, alt, className, filter = "" }: { src: string, alt: string, className?: string, filter?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, height: "130%" }} className="absolute inset-0 top-[-15%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={`w-full h-full object-cover ${filter}`} />
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a09] text-[#eeece6] selection:bg-[#cda434] selection:text-black font-sans pb-32 overflow-hidden">
      <CustomCursor />
      <HamburgerMenu />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <video 
            autoPlay loop muted playsInline 
            className="w-full h-full object-cover opacity-60 mix-blend-screen"
          >
            <source src="/images/about/masai-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a09] via-[#0a0a09]/20 to-transparent"></div>
        </motion.div>

        <div className="z-10 relative px-6 md:px-12 max-w-[1400px] mx-auto w-full pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4 font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#cda434] uppercase mb-12"
          >
            <span>About</span>
            <span>&middot;</span>
            <span>Studio Xtended Reality</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,8vw,8rem)] leading-[1.05] tracking-tight text-[#eeece6] max-w-5xl"
          >
            The machine<br />doesn&apos;t dream.<br />
            <span className="italic text-[#cda434]">We do.</span>
          </motion.h1>
        </div>
      </section>

      {/* Section 01: The Studio */}
      <section className="relative mt-20 md:mt-32 min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage src="/images/about/cinema1.jpg" alt="Cinematic Scene" className="w-full h-full opacity-80" />
        </div>
        {/* Gradient overlays to ensure text readability */}
        <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#0a0a09]/95 via-[#0a0a09]/60 to-transparent"></div>
        <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#0a0a09] via-transparent to-[#0a0a09]"></div>

        <div className="relative z-10 px-6 md:px-12 max-w-[1400px] mx-auto w-full py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-7 lg:col-span-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="flex flex-col gap-8">
                <div className="flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] uppercase">
                  <span className="text-[#cda434]">01 &mdash; The Studio</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
                  Where <span className="italic text-[#cda434]">cinema</span> meets the machine.
                </h2>
                <div className="flex flex-col gap-6 text-[#999] leading-relaxed font-light text-sm md:text-base lg:text-lg max-w-xl">
                  <p>Xtended Reality is a Paris-based AI creative studio operating at the frontier of cinematic production and generative intelligence. We design visual worlds that wouldn&apos;t exist without AI &mdash; and couldn&apos;t exist without a director.</p>
                  <p>The studio works across branded film, editorial fashion, virtual identities, and experimental visual campaigns for brands that refuse to look ordinary. Not a tool. <span className="text-white">An authorial practice.</span></p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: The Director */}
      <section className="relative mt-32 md:mt-64 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 md:col-start-1 relative">
             <div className="aspect-[3/4] w-full z-10 relative">
               <ParallaxImage src="/images/about/portrait.jpg" alt="Rico.Xr" className="w-full h-full" filter="grayscale contrast-125 brightness-90" />
             </div>
             {/* Decorative element */}
             <div className="absolute -bottom-8 -right-8 w-full h-full border border-[#cda434]/30 -z-10 hidden md:block"></div>
          </div>
          
          <div className="md:col-span-6 md:col-start-6 z-20">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="flex flex-col gap-8 bg-[#0a0a09]/90 backdrop-blur-sm p-6 md:p-12 -ml-0 md:-ml-24">
              <div className="flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className="text-[#cda434]">02 &mdash; The Director</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl leading-tight text-white">
                A director<br />who speaks <span className="italic text-[#cda434]">machine.</span>
              </h2>
              <div className="flex flex-col gap-6 text-[#999] leading-relaxed font-light text-sm md:text-base">
                <p>Rico.Xr approaches AI the way Lubezki approaches light &mdash; with obsession, patience, and a refusal to let the tool lead. His references are Wong Kar-wai&apos;s compression of time, Malick&apos;s surrender to natural grace, and Doyle&apos;s instinct for color as emotion.</p>
                <p>With deep fluency across the full generative stack &mdash; image, video, voice, workflow &mdash; he occupies a rare space: <span className="text-white">directorial authority over machine capability.</span></p>
                <p>His work is AI-generated. His vision is not.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Giant Quote Parallax */}
      <section className="relative mt-32 md:mt-64 h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ParallaxImage src="/images/about/cinema2.jpg" alt="Infinity Mirror" className="w-full h-full" filter="grayscale" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.p 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}
            className="font-display text-[clamp(2rem,5vw,5rem)] italic text-white leading-tight"
          >
            &quot;Not prompt-to-output.<br />Director-to-image.&quot;
          </motion.p>
        </div>
      </section>

      {/* Section 03: The Approach */}
      <section className="relative mt-32 md:mt-40 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 md:col-start-3 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="flex flex-col gap-8 items-center">
              <div className="flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className="text-[#cda434]">03 &mdash; The Approach</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl leading-tight text-white max-w-3xl">
                A complete <span className="italic text-[#cda434]">visual architecture</span> before a pixel is rendered.
              </h2>
              <div className="flex flex-col gap-6 text-[#999] leading-relaxed font-light text-sm md:text-base max-w-2xl text-left md:text-center mt-6">
                <p>Every project begins with a problem of perception. How should this brand feel? What tension should live in the frame? What should the audience carry with them after?</p>
                <p>The studio builds a full creative direction &mdash; mood, shot language, color temperature, narrative arc &mdash; before a single generation begins. AI enters as the final instrument. <span className="text-white">The direction is always human.</span></p>
                <p>This is the discipline that separates a film from a render.</p>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="mt-20 md:mt-32 w-full aspect-[16/9] md:aspect-[21/9]">
           <ParallaxImage src="/images/about/cinema2.jpg" alt="Mirrors" className="w-full h-full" />
        </div>
      </section>

      {/* Section 04: What We Make */}
      <section className="relative mt-32 md:mt-48 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
             <div className="md:sticky md:top-40 flex flex-col gap-8">
               <div className="flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] uppercase">
                 <span className="text-[#cda434]">04 &mdash; What We Make</span>
               </div>
               <h2 className="font-display text-4xl md:text-6xl leading-tight text-white">
                 The <span className="italic text-[#cda434]">work.</span>
               </h2>
             </div>
          </div>
          <div className="md:col-span-8">
            <ul className="flex flex-col border-t border-white/[0.05]">
              {[
                "Cinematic Brand Films",
                "Product Ads & Campaign Visuals",
                "Editorial Fashion Films",
                "Virtual Influencer Development",
                "AI Workflow Design & Automation"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-center justify-between py-10 md:py-16 border-b border-white/[0.05] group hover:bg-white/[0.02] transition-colors px-6 -mx-6"
                >
                  <span className="font-display text-2xl md:text-4xl text-[#ccc] group-hover:text-white transition-colors duration-300">{item}</span>
                  <span className="text-[#cda434] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-4 group-hover:translate-x-0">&rarr;</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 05: Who We Work With */}
      <section className="relative mt-32 md:mt-48 px-6 md:px-12 max-w-[1400px] mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
             <div className="aspect-square w-full rounded-full overflow-hidden">
               <ParallaxImage src="/images/about/xr-pattern.jpg" alt="XR Pattern" className="w-full h-full" filter="" />
             </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="flex flex-col gap-8">
              <div className="flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className="text-[#cda434]">05 &mdash; Who We Work With</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-white">
                For brands with something <span className="italic text-[#cda434]">to prove.</span>
              </h2>
              <div className="flex flex-col gap-6 text-[#999] leading-relaxed font-light text-sm md:text-base">
                <p>Xtended Reality partners with luxury and premium brands, fashion houses, and forward-thinking organizations building visual identities that don&apos;t yet have a language.</p>
                <p>If your vision exceeds what conventional production can deliver &mdash; <span className="text-white">that&apos;s where we begin.</span></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Text */}
      <footer className="border-t border-white/[0.05] pt-20 pb-10 px-6">
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center gap-6"
        >
          <h2 className="font-display text-[8rem] md:text-[12rem] text-white/[0.03] leading-none select-none tracking-tighter">XR</h2>
          <div className="flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[#666] text-center">
            <div><span className="text-[#cda434]">Paris</span> &middot; Global Output</div>
            <div>Studio Xtended Reality &middot; Rico.XR</div>
          </div>
        </motion.div>
      </footer>

    </main>
  );
}
