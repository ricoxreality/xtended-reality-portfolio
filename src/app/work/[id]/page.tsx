"use client";

import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import HamburgerMenu from "@/components/HamburgerMenu";
import FadeUpText from "@/components/FadeUpText";
import NextProjectFooter from "@/components/NextProjectFooter";
import PremiumHeroEntrance from "@/components/PremiumHeroEntrance";
import { useProjects, getYoutubeEmbed } from "@/context/ProjectContext";

// ── Placeholder gradient color map by index ───────────────────────────────────
const GRAD_PAIRS: [string, string][] = [
  ["#1a1117", "#0d0b14"],
  ["#111a17", "#0b0d14"],
  ["#1a1117", "#141017"],
  ["#111718", "#0b0f14"],
  ["#1a1518", "#100d14"],
  ["#131a18", "#0c0f10"],
];

function getGradient(index: number): string {
  const [a, b] = GRAD_PAIRS[index % GRAD_PAIRS.length];
  return `linear-gradient(135deg, ${a}, ${b})`;
}

// ── Hero section ─────────────────────────────────────────────────────────────
function ProjectHero({
  title,
  category,
  year,
  thumbnailUrl,
  projectIndex,
}: {
  title: string;
  category: string;
  year: string;
  thumbnailUrl?: string;
  projectIndex: number;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Parallax BG */}
        <PremiumHeroEntrance thumbnailUrl={thumbnailUrl}>
          {!thumbnailUrl && (
            <div
              className="w-full h-full"
              style={{ background: getGradient(projectIndex) }}
            />
          )}
        </PremiumHeroEntrance>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/30 via-transparent to-[#111111]/30" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-20 max-w-[1400px] mx-auto left-0 right-0"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.85, 0, 0.15, 1], delay: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#eeece6]/50 mb-5"
        >
          {category}
          <span className="mx-3 text-[#eeece6]/25">/</span>
          {year}
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0.7 }}
            className="font-display font-light text-[clamp(3rem,6.5vw,6.5rem)] leading-[0.92] tracking-tight text-[#eeece6] max-w-5xl"
          >
            {title}
          </motion.h1>
        </div>
      </motion.div>
    </div>
  );
}

// ── Meta grid ─────────────────────────────────────────────────────────────────
function MetaGrid({
  category,
  year,
  tags,
}: {
  category: string;
  year: string;
  tags: string[];
}) {
  const items = [
    { label: "Category", value: category },
    { label: "Year", value: year },
    { label: "Type", value: "AI-Generated" },
    { label: "Tags", value: tags.join(", ") },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#eeece6]/[0.06] border-t border-b border-[#eeece6]/[0.06] py-10 mb-16 md:mb-24"
    >
      {items.map((item) => (
        <div key={item.label} className="px-6 first:pl-0 last:pr-0">
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#444] mb-2">
            {item.label}
          </p>
          <p className="font-sans text-sm text-[#eeece6]/80 leading-snug">
            {item.value}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

// ── YouTube embed ─────────────────────────────────────────────────────────────
function YouTubeEmbed({ youtubeId }: { youtubeId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="mb-20 md:mb-28"
    >
      <div
        className="yt-embed rounded-sm overflow-hidden border border-[#eeece6]/[0.06]"
        style={{ paddingBottom: "56.25%", position: "relative", height: 0, overflow: "hidden" }}
      >
        <iframe
          src={getYoutubeEmbed(youtubeId)}
          title="Project video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Photo editorial grid ──────────────────────────────────────────────────────
function PhotoGrid({
  thumbnailUrl,
  title,
  projectIndex,
}: {
  thumbnailUrl?: string;
  title: string;
  projectIndex: number;
}) {
  // Blocks alternating between full-width and 2-col
  const blocks = [
    { full: true },
    { full: false },
    { full: true },
  ];

  return (
    <div className="space-y-4 md:space-y-6 mb-20 md:mb-28">
      {blocks.map((block, bi) =>
        block.full ? (
          <motion.div
            key={bi}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: bi * 0.06 }}
            className="relative overflow-hidden aspect-[16/9] bg-[#1a1a1a] rounded-sm"
          >
            {bi === 0 && thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={`${title} — visual ${bi + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: getGradient(projectIndex + bi) }}
              >
                <span className="font-display text-[6rem] md:text-[10rem] text-[#eeece6]/[0.04] leading-none select-none">
                  {String(bi + 1).padStart(2, "0")}
                </span>
              </div>
            )}
          </motion.div>
        ) : (
          <div key={bi} className="grid grid-cols-2 gap-4 md:gap-6">
            {[0, 1].map((col) => (
              <motion.div
                key={col}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: col * 0.1,
                }}
                className="relative overflow-hidden aspect-[4/5] bg-[#1a1a1a] rounded-sm"
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: getGradient(projectIndex + bi + col + 1) }}
                >
                  <span className="font-display text-[4rem] md:text-[6rem] text-[#eeece6]/[0.04] leading-none select-none">
                    {String(bi + col + 2).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )
      )}
    </div>
  );
}


// ── Main page ─────────────────────────────────────────────────────────────────
export default function WorkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId ?? "";
  const { projects } = useProjects();

  const visibleProjects = projects.filter((p) => p.visible);
  const projectIndex = visibleProjects.findIndex((p) => p.id === id);
  const project = projectIndex !== -1 ? visibleProjects[projectIndex] : null;

  // Redirect to portfolio if projects loaded but this ID does not exist
  useEffect(() => {
    if (projects.length > 0 && !project) {
      router.push("/portfolio");
    }
  }, [projects.length, project, router]);

  useLayoutEffect(() => {
    // Force scroll to top on mount to avoid native scroll restoration issues
    window.scrollTo(0, 0);
  }, [params.id]);

  if (!project) {
    // Loading / transitioning state
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <HamburgerMenu />
        <div className="font-display text-[#333] text-2xl">Loading...</div>
      </div>
    );
  }

  const nextProject =
    visibleProjects[(projectIndex + 1) % visibleProjects.length] ?? null;
  const hasVideo = !!project.youtubeId;

  return (
    <div className="bg-[#111111] text-[#eeece6] min-h-screen">
      {/* Noise */}
      <div className="noise-overlay" />

      {/* Hamburger menu */}
      <HamburgerMenu />

      {/* ── Hero ── */}
      <ProjectHero
        title={project.title}
        category={project.category}
        year={project.year}
        thumbnailUrl={project.thumbnailUrl}
        projectIndex={projectIndex}
      />

      {/* ── Body content ── */}
      <div className="px-6 md:px-16 max-w-[1400px] mx-auto">
        {/* Meta grid */}
        <div className="pt-12 md:pt-16">
          <MetaGrid
            category={project.category}
            year={project.year}
            tags={project.tags}
          />
        </div>

        {/* ── Overview / description ── */}
        <section className="mb-20 md:mb-28 max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
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
              {project.description}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              className="font-sans text-sm md:text-base text-[#eeece6]/80 leading-relaxed"
            >
              {(project as any).shortDescription || "This project required a unique intersection of creative vision and technical execution. We focused on delivering an immersive experience that challenges traditional digital boundaries while maintaining a core emotional resonance with the audience."}
            </motion.p>
          </div>
        </section>

        {/* ── Video or Photo layout ── */}
        {hasVideo ? (
          <section className="max-w-[1200px] mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#444] mb-6"
            >
              Film
            </motion.p>
            <YouTubeEmbed youtubeId={project.youtubeId!} />
          </section>
        ) : (
          <section>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#444] mb-6"
            >
              Visual Direction
            </motion.p>
            <PhotoGrid
              thumbnailUrl={project.thumbnailUrl}
              title={project.title}
              projectIndex={projectIndex}
            />
          </section>
        )}

        {/* ── Tags strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-wrap gap-2 mb-20 md:mb-28 border-t border-[#eeece6]/[0.06] pt-10"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#444] border border-[#333] px-3 py-1.5 rounded-full hover:border-[#555] hover:text-[#666] transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Next project ── */}
      <NextProjectFooter currentProjectId={project.id} />
    </div>
  );
}
