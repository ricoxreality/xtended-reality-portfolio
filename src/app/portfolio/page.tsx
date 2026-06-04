"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import HamburgerMenu from "@/components/HamburgerMenu";
import { useProjects, type Project } from "@/context/ProjectContext";

// ── Category filter config ───────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Brand Film",
  "Product Ad",
  "Fashion Editorial",
  "Social Campaign",
  "Experimental",
  "Music & Sound",
];

// ── Grid item ────────────────────────────────────────────────────────────────
function PortfolioItem({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  // Uniform rectangular aspect ratio
  const aspectClass = "aspect-[16/9]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: (index % 2) * 0.12,
      }}
      className="group relative overflow-hidden"
    >
      <Link href={`/work/${project.id}`} className="block">
        {/* Image container */}
        <div className={`relative overflow-hidden ${aspectClass} bg-[#1a1a1a]`}>
          {project.thumbnailUrl ? (
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            // Placeholder gradient when no thumbnail
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, hsl(${(index * 47) % 360} 15% 12%), hsl(${(index * 47 + 60) % 360} 12% 8%))`,
              }}
            >
              {/* Project index label */}
              <span className="absolute bottom-4 left-4 font-display text-6xl text-[#eeece6]/10 leading-none">
                {project.index}
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-all duration-400"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#eeece6]/60 bg-black/40 backdrop-blur-sm font-sans text-[10px] uppercase tracking-[0.3em] text-[#eeece6]">
                View Project
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 7H7m10 0v10" />
                </svg>
              </span>
            </motion.div>
          </div>
        </div>

        {/* Meta info */}
        <div className="mt-4 px-0.5">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#555] mb-1.5">
            {project.category}
            <span className="mx-2 text-[#333]">/</span>
            {project.year}
          </p>
          <h2 className="font-display font-light text-lg md:text-xl text-[#eeece6] leading-tight tracking-tight group-hover:text-white transition-colors duration-300">
            {project.title}
          </h2>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#444] border border-[#333] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main portfolio page ───────────────────────────────────────────────────────
export default function PortfolioPage() {
  const { projects } = useProjects();
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleProjects = useMemo(
    () =>
      projects
        .filter((p) => p.visible)
        .filter((p) =>
          activeCategory === "All" ? true : p.category === activeCategory
        ),
    [projects, activeCategory]
  );

  const totalVisible = projects.filter((p) => p.visible).length;

  return (
    <div className="min-h-screen bg-[#111111] text-[#eeece6]">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Hamburger menu */}
      <HamburgerMenu />

      {/* ── Header ── */}
      <header className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#555] mb-6"
          >
            Archive — {totalVisible} Projects
          </motion.p>

          {/* Title */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
              className="font-display font-light text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tight text-[#eeece6]"
            >
              Portfolio
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="font-sans text-sm md:text-base text-[#555] max-w-lg leading-relaxed"
          >
            A curated selection of AI-generated visual work — brand films, product campaigns, editorial, and experimental pieces.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="mt-10 h-px bg-[#eeece6]/[0.07]"
          />
        </div>
      </header>

      {/* ── Filter pills ── */}
      <div className="px-6 md:px-12 lg:px-16 mb-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-[0.25em] border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#eeece6] text-[#111] border-[#eeece6]"
                    : "bg-transparent text-[#555] border-[#333] hover:border-[#555] hover:text-[#eeece6]/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Grid ── */}
      <main className="px-6 md:px-12 lg:px-16 pb-24">
        <div className="max-w-[1400px] mx-auto">
          {visibleProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <p className="font-display text-2xl text-[#333] mb-3">No projects in this category</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#555] hover:text-[#eeece6] transition-colors underline mt-2"
              >
                View all projects
              </button>
            </motion.div>
          ) : (
            /* Uniform 2-column grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-14 md:gap-x-8 md:gap-y-20">
              {visibleProjects.map((project, i) => (
                <PortfolioItem key={project.id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Footer strip ── */}
      <footer className="border-t border-[#eeece6]/[0.05] px-6 md:px-12 lg:px-16 py-8">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#333]">
            © {new Date().getFullYear()} Xtended Reality
          </span>
          <Link
            href="/admin"
            className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#333] hover:text-[#555] transition-colors"
          >
            Admin
          </Link>
        </div>
      </footer>
    </div>
  );
}
