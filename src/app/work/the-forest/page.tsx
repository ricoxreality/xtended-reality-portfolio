"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

import { useRef, useState, useEffect } from "react";
import { useLayoutEffect } from "react";
import Link from "next/link";
import HamburgerMenu from "@/components/HamburgerMenu";
import FadeUpText from "@/components/FadeUpText";
import NextProjectFooter from "@/components/NextProjectFooter";
import PremiumHeroEntrance from "@/components/PremiumHeroEntrance";
import { useRouter } from "next/navigation";
import { useProjects } from "@/context/ProjectContext";

const E = [0.76, 0, 0.24, 1] as const;

// ── Project data ─────────────────────────────────────────────────────────────
const PROJECT = {
  title: "The Forest",
  client: "Independent",
  category: "Short Film",
  year: "2026",
  type: "Experimental",
  description:
    "A post-apocalyptic eco sci-fi story about Kaï and Mara, two women trapped inside the last safe shelter in a poisoned earth.",
  shortDescription:
    "Kaï wants to know if the world outside is finally healing. Mara wants to keep everyone alive... but something darker is growing inside her. The forest is alive. But not everything alive is safe.",
  tags: ["Cinematic", "Environment", "Characters"],
  thumbnailUrl: "/projects/the-forest/environment.png",
  gifSrc: "/projects/the-forest/the-forest.gif",
  fullVideoSrc: "/projects/the-forest/the-forest.mp4",
  photos: [
    { src: "/projects/the-forest/1.png", alt: "Still 1", caption: "The shelter." },
    { src: "/projects/the-forest/2.png", alt: "Still 2", caption: "Observation." },
    { src: "/projects/the-forest/3.png", alt: "Still 3", caption: "The anomaly." },
    { src: "/projects/the-forest/4.png", alt: "Still 4", caption: "Overgrown." },
    { src: "/projects/the-forest/5.png", alt: "Still 5", caption: "Mara." },
    { src: "/projects/the-forest/6.png", alt: "Still 6", caption: "Living forest." },
  ],
  characterText: "Kaï wants to know if the world outside is finally healing. Mara wants to keep everyone alive... but something darker is growing inside her.",
  environmentText: "The forest is alive. But not everything alive is safe. A post-apocalyptic eco sci-fi landscape where the earth is poisoned and the last safe shelter offers the only refuge against an unpredictable ecosystem.",
};

// ── Drag Carousel for Photos ──────────────────────────────────────────────────
function DragCarousel({ photos }: { photos: typeof PROJECT.photos }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [photos]);

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden relative z-10">
      <div className="px-6 md:px-12 lg:px-16 mb-8 md:mb-12 w-full shrink-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#777]">
          Stills
        </p>
      </div>

      <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }} 
          className="flex gap-4 md:gap-8 px-6 md:px-12 lg:px-16 w-max"
        >
          {photos.map((photo) => (
            <motion.figure
              key={photo.src}
              className="shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] group"
            >
              <div className="relative overflow-hidden w-full bg-[#f5f5f5]" style={{ aspectRatio: "16 / 9" }}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] pointer-events-none"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#222]">
                  {photo.caption}
                </span>
              </figcaption>
            </motion.figure>
          ))}
          <div className="shrink-0 w-2 md:w-4 lg:w-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── GIF Parallax Section ────────────────────────────────────────
function GifParallaxSection({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // As user scrolls past, the GIF moves down at 50% speed, creating parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section ref={ref} className="w-full relative z-0 bg-[#0d0d0d]" style={{ aspectRatio: "21 / 9" }}>
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <img
          src={src}
          alt="Hero GIF"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}

// ── Full Video Player ────────────────────────────────────────
function FullVideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full bg-[#0a0a0a] relative overflow-hidden group border border-[#eeece6]/[0.08] cursor-pointer rounded-lg" style={{ aspectRatio: "16 / 9" }} onClick={togglePlay}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        playsInline
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none ${
          isPlaying ? "opacity-0 bg-transparent" : "opacity-100 bg-black/40 group-hover:bg-black/20"
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border border-[#eeece6]/20 text-[#eeece6] shadow-xl group-hover:scale-105 group-hover:bg-black/80 transition-all duration-300">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Watch Film</span>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TheForestPage() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  return (
    <div className="bg-[#0d0d0d] text-[#eeece6] min-h-screen">
      <div className="noise-overlay" />
      <HamburgerMenu />

      {/* ── 1. PHOTO COVER HERO ────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
        <PremiumHeroEntrance thumbnailUrl={PROJECT.thumbnailUrl} />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.85, 0, 0.15, 1], delay: 0.6 }}
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#eeece6]/70 mb-5"
          >
            {PROJECT.client}&nbsp;&nbsp;/&nbsp;&nbsp;{PROJECT.category}&nbsp;&nbsp;/&nbsp;&nbsp;{PROJECT.year}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0.7 }}
            className="font-display font-light text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight text-[#eeece6]"
          >
            {PROJECT.title}
          </motion.h1>
        </div>
      </div>

      {/* ── 2. META STRIP ──────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 py-14 md:py-20 bg-[#0d0d0d] relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: E }}
            className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-[#eeece6]/[0.08]"
          >
            {[
              { label: "Client", value: PROJECT.client },
              { label: "Category", value: PROJECT.category },
              { label: "Type", value: PROJECT.type },
              { label: "Year", value: PROJECT.year },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col gap-2.5 py-6 px-0 md:px-8 ${i > 0 ? "md:border-l border-[#eeece6]/[0.08]" : ""}`}
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-[#444]">
                  {item.label}
                </span>
                <span className="font-display font-light text-base text-[#eeece6]">
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. OVERVIEW ────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-24 md:py-40 max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
        {/* Left Column */}
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <h2 className="font-display font-light text-5xl md:text-6xl tracking-widest text-[#eeece6] uppercase mb-8">
              Overview
            </h2>
            <div className="w-24 h-[1px] bg-[#eeece6]/20"></div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-7 flex flex-col gap-6 md:pt-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="font-sans text-sm md:text-base text-[#eeece6]/80 leading-relaxed"
          >
            {PROJECT.description}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="font-sans text-sm md:text-base text-[#eeece6]/80 leading-relaxed"
          >
            {PROJECT.shortDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {PROJECT.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#eeece6]/50 border border-[#eeece6]/10 px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3.5 THE CHARACTER & ENVIRONMENT ──────────────────────────────────── */}
      <section className="px-6 md:px-16 py-12 md:py-24 max-w-[1200px] mx-auto flex flex-col gap-32">
        {/* The Character (Image Left, Text Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col gap-6"
          >
            <img src="/projects/the-forest/char1.jpg" alt="Kaï Character Sheet" className="w-full object-cover rounded-lg" />
            <img src="/projects/the-forest/char2.png" alt="Mara Character Sheet" className="w-full object-cover rounded-lg" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <h3 className="font-display font-light text-4xl text-[#eeece6] tracking-widest uppercase">The Character</h3>
            <div className="w-16 h-[1px] bg-[#eeece6]/20"></div>
            <p className="font-sans text-sm md:text-base text-[#eeece6]/80 leading-relaxed">
              {PROJECT.characterText}
            </p>
          </motion.div>
        </div>

        {/* The Environment (Text Left, Image Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="flex flex-col gap-6 order-2 md:order-1"
          >
            <h3 className="font-display font-light text-4xl text-[#eeece6] tracking-widest uppercase">The Environment</h3>
            <div className="w-16 h-[1px] bg-[#eeece6]/20"></div>
            <p className="font-sans text-sm md:text-base text-[#eeece6]/80 leading-relaxed">
              {PROJECT.environmentText}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="order-1 md:order-2"
          >
            <img src="/projects/the-forest/environment.png" alt="The Environment" className="w-full object-cover rounded-lg" />
          </motion.div>
        </div>
      </section>

      {/* ── 4. 21:9 GIF HERO MEDIA ─────────────────────────────────────────── */}
      <GifParallaxSection src={PROJECT.gifSrc} />

      {/* ── 5. HORIZONTAL PHOTO CAROUSEL ───────────────────────────────────── */}
      <DragCarousel photos={PROJECT.photos} />

      {/* ── 6. FULL VIDEO SECTION ────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto relative group">
          <FullVideoPlayer src={PROJECT.fullVideoSrc} />
        </div>
      </section>

      {/* ── 7. SEAMLESS NEXT PROJECT FOOTER ───────────────────────────────────── */}
      <NextProjectFooter currentProjectId="the-forest" />
    </div>
  );
}


