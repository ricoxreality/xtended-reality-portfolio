"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useProjects, type Project } from "@/context/ProjectContext";
import FadeUpText from "./FadeUpText";

const ease = [0.16, 1, 0.3, 1] as const;


// ── Project Card ───────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  featured,
}: {
  project: Project;
  featured?: boolean;
}) {
  const hasThumbnail = !!project.thumbnailUrl;
  const hasVideo = !!project.youtubeId;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 1, ease }}
      className={`group relative overflow-hidden rounded-lg ${
        featured ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/3]"
      } cursor-pointer block`}
    >
      <Link href={`/work/${project.id}`} className="absolute inset-0 z-20" aria-label={`View project: ${project.title}`} />

      {/* ── Background: YouTube thumbnail or solid dark ── */}
      {hasThumbnail ? (
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        /* No media yet — elegant placeholder */
        <div className="absolute inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center gap-3">
          <div className="w-px h-12 bg-[#333]" />
          <span className="font-mono text-[9px] text-[#444] uppercase tracking-[0.25em]">
            Media not yet assigned
          </span>
          <div className="w-px h-12 bg-[#333]" />
        </div>
      )}

      {/* Cinematic overlay */}
      <div className="absolute inset-0 card-overlay transition-opacity duration-500 group-hover:opacity-90" />

      {/* Top: index + category tag */}
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
        <span className="font-display text-[#eeece6]/40 text-sm group-hover:text-[#eeece6]/60 transition-colors duration-500">
          {project.index}
        </span>
        <span className="px-2.5 py-1 rounded text-[9px] font-sans uppercase tracking-wider bg-black/30 border border-white/10 text-[#eeece6]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          {project.category}
        </span>
      </div>

      {/* Play button if has video */}
      {hasVideo && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-white/10 border border-white/25 backdrop-blur-md flex items-center justify-center">
            <svg className="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom: project info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
        <p className="font-mono text-[10px] text-[#eeece6]/40 tracking-wider mb-2">{project.year}</p>
        <h3
          className={`font-display text-[#eeece6] font-bold leading-tight tracking-tight mb-2 ${
            featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          }`}
        >
          {project.title}
        </h3>

        {/* Description on hover */}
        <div className="overflow-hidden">
          <p className="font-sans text-[#eeece6]/50 text-xs leading-relaxed max-w-sm translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[9px] font-mono uppercase tracking-wider text-[#eeece6]/40">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

// ── SelectedWork Section ───────────────────────────────────────────────────────
const ALL_CATEGORIES = [
  "All",
  "Brand Film",
  "Product Ad",
  "Fashion Editorial",
  "Social Campaign",
  "Experimental",
  "Music & Sound",
];

export default function SelectedWork() {
  const { projects } = useProjects();
  const [activeFilter, setActiveFilter] = useState("All");

  // Only show visible projects
  const visible = projects.filter((p) => p.visible);
  const filtered = visible.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  // Separate featured (full-width top) from rest
  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <>
      <section id="work" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* ── Section Header ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
            <div>
              <p className="font-sans text-[10px] text-[#555] tracking-[0.25em] uppercase mb-5">
                Selected Work
              </p>
              <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-[#eeece6]">
                <FadeUpText text="Stories that feel" /><br />
                <FadeUpText text="impossible." delay={0.2} />
              </h2>
            </div>
            <div className="flex flex-col items-end gap-3">
              <p className="font-sans text-[#777] text-sm max-w-xs leading-relaxed text-right hidden md:block">
                Every frame directed. Every project original. No stock, no templates.
              </p>
              <a
                href="/admin"
                className="font-sans text-[10px] text-[#555] tracking-[0.15em] uppercase hover:text-[#eeece6] transition-colors underline-reveal"
              >
                Manage Projects
              </a>
            </div>
          </div>

          {/* ── Category filters ── */}
          <div className="flex gap-1.5 overflow-x-auto pb-3 mb-10 no-scrollbar">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-4 py-2 rounded-full text-[11px] font-sans whitespace-nowrap transition-all duration-300 ${
                  activeFilter === cat
                    ? "text-[#111]"
                    : "text-[#555] hover:text-[#eeece6] border border-[#333] hover:border-[#555]"
                }`}
              >
                {activeFilter === cat && (
                  <motion.span
                    layoutId="filterPill"
                    className="absolute inset-0 rounded-full bg-[#eeece6]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {cat === "All" ? "All Projects" : cat}
                </span>
              </button>
            ))}
          </div>

          {/* ── Featured row (full-width cards) ── */}
          {featured.length > 0 && (
            <div className="space-y-4 mb-4">
              {featured.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured
                />
              ))}
            </div>
          )}

          {/* ── Regular 2-col grid ── */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {regular.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-32 text-center">
              <p className="font-display text-[#444] text-xl mb-3">No projects in this category.</p>
              <p className="font-sans text-[#555] text-sm">
                <a href="/admin" className="underline hover:text-[#eeece6] transition-colors">
                  Add projects in the admin →
                </a>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
