"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useProjects, type Project } from "@/context/ProjectContext";

const AUTO_INTERVAL = 4000;

// ── Ken Burns image with subtle dezoom ──────────────────────────────────────
function KenBurnsImage({
  src,
  alt,
  active,
  id,
}: {
  src: string;
  alt: string;
  active: boolean;
  id: string;
}) {
  return (
    <motion.div
      className="absolute inset-0"
      key={`kb-${id}`}
      animate={active ? { scale: [1.08, 1.0] } : { scale: 1.0 }}
      transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </motion.div>
  );
}

// ── Slide variants: liquid zoom cross-fade ───────────────────────────────────
const slideVariants = {
  enter: () => ({
    scale: 1.08,
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: {
    scale: 1.0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  exit: () => ({
    scale: 0.92,
    opacity: 0,
    filter: "blur(8px)",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  }),
};

// ── Arrow button ─────────────────────────────────────────────────────────────
function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      onClick={onClick}
      aria-label={isPrev ? "Previous project" : "Next project"}
      className={`absolute ${
        isPrev
          ? "left-6 md:left-10"
          : "right-6 md:right-10"
      } top-1/2 -translate-y-1/2 z-30 group w-12 h-12 rounded-full border border-[#eeece6]/20 flex items-center justify-center hover:border-[#eeece6]/60 hover:bg-white/5 transition-all duration-300`}
    >
      <svg
        className="w-4 h-4 text-[#eeece6]/60 group-hover:text-[#eeece6] transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        {isPrev ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

// ── Roman numeral helper ─────────────────────────────────────────────────────
const ROMAN = [
  "I","II","III","IV","V","VI","VII","VIII","IX","X",
  "XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX",
];
function toRoman(n: number): string {
  return ROMAN[n - 1] ?? n.toString();
}

// ── Main slider ──────────────────────────────────────────────────────────────
export default function HeroSlider() {
  const { projects } = useProjects();
  const visibleProjects = projects.filter((p) => p.visible);

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const scrollAccum = useRef(0);
  const lastScrollTime = useRef(0);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = visibleProjects.length;

  const goTo = useCallback(
    (idx: number, dir: number) => {
      if (isTransitioning || total === 0) return;
      setIsTransitioning(true);
      setDirection(dir);
      setCurrent(idx);
      setTimeout(() => setIsTransitioning(false), 950);
    },
    [isTransitioning, total]
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % total, 1);
  }, [current, total, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + total) % total, -1);
  }, [current, total, goTo]);

  // Auto-play
  useEffect(() => {
    if (isPaused || total === 0) return;
    autoTimer.current = setInterval(goNext, AUTO_INTERVAL);
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [isPaused, goNext, total]);

  // Wheel scroll navigation
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 900) return;
      const delta = e.deltaY + e.deltaX;
      scrollAccum.current += delta;
      if (Math.abs(scrollAccum.current) > 50) {
        lastScrollTime.current = now;
        scrollAccum.current = 0;
        if (delta > 0) goNext();
        else goPrev();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  if (total === 0) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#111]">
        <p className="font-display text-[#555] text-xl mb-4">No projects yet.</p>
        <Link
          href="/admin"
          className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#777] hover:text-[#eeece6] transition-colors underline"
        >
          Add projects in admin
        </Link>
      </div>
    );
  }

  const project = visibleProjects[current];

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#111] cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Slides layer ── */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={project.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Ken Burns image */}
          {project.thumbnailUrl ? (
            <KenBurnsImage
              src={project.thumbnailUrl}
              alt={project.title}
              active={true}
              id={project.id}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" />
          )}

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* ── Noise overlay ── */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-10" />

      {/* ── Prev / Next arrows ── */}
      <ArrowButton direction="prev" onClick={goPrev} />
      <ArrowButton direction="next" onClick={goNext} />

      {/* ── UI overlay ── */}
      <div className="absolute inset-0 z-20 flex flex-col pointer-events-none">
        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-16 md:px-24 mt-16">
          {/* Category label */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`cat-${project.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#eeece6]/50 mb-5 pointer-events-none"
            >
              {project.category}
              {project.year && (
                <span className="mx-3 text-[#eeece6]/25">/</span>
              )}
              {project.year}
            </motion.p>
          </AnimatePresence>

          {/* Project title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${project.id}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.06 }}
              className="font-display font-light text-[clamp(2.8rem,7vw,7rem)] leading-[0.92] tracking-tight text-[#eeece6] max-w-4xl mb-10 pointer-events-none"
            >
              {project.title}
            </motion.h1>
          </AnimatePresence>

          {/* Explore pill */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.14 }}
              className="pointer-events-auto"
            >
              <Link
                href={project.href || `/work/${project.id}`}
                className="group inline-flex items-center gap-3 px-7 py-3 rounded-full border border-[#eeece6]/35 text-[#eeece6] font-sans text-[10px] uppercase tracking-[0.3em] hover:bg-[#eeece6] hover:text-[#111] hover:border-[#eeece6] transition-all duration-400"
              >
                Explore Project
                <svg
                  className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 7l-10 10M17 7H7m10 0v10"
                  />
                </svg>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom bar: dots centered */}
        <div className="w-full flex items-center justify-center pb-8 md:pb-10 pointer-events-auto">
          <div className="flex items-center gap-2">
            {visibleProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Go to project ${i + 1}`}
                className={`rounded-full transition-all duration-400 ${
                  i === current
                    ? "w-5 h-[3px] bg-[#eeece6]"
                    : "w-[3px] h-[3px] bg-[#eeece6]/30 hover:bg-[#eeece6]/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Counter: bottom right ── */}
      <div className="absolute bottom-8 right-6 md:right-12 z-30 flex flex-col items-end gap-1 pointer-events-none">
        <span className="font-display text-4xl md:text-5xl text-[#eeece6]/70 leading-none tracking-tight">
          {toRoman(current + 1)}
        </span>
        <div className="w-px h-5 bg-[#eeece6]/20 ml-auto" />
        <span className="font-display text-sm text-[#444] tracking-wide">
          {toRoman(total)}
        </span>
      </div>
    </div>
  );
}
