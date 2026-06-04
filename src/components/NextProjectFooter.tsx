"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import { useProjects } from "@/context/ProjectContext";

export default function NextProjectFooter({
  currentProjectId,
}: {
  currentProjectId: string;
}) {
  const { projects } = useProjects();
  const router = useRouter();

  const visibleProjects = projects.filter((p) => p.visible);
  const currentIndex = visibleProjects.findIndex((p) => p.id === currentProjectId);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextProject =
    visibleProjects[(safeIndex + 1) % visibleProjects.length] || visibleProjects[0];

  const sectionRef = useRef<HTMLElement>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const progressRaw = useMotionValue(0);
  const progress = useSpring(progressRaw, { damping: 40, stiffness: 250 });

  // ── PREMIUM MATTE FLUID ANIMATION PARAMS ──
  // The mask opens up from a tiny dot to a letterbox window
  const clipPath = useTransform(
    progress,
    [0, 100],
    ["inset(50% 50% 50% 50% round 16px)", "inset(35% 30% 35% 30% round 16px)"]
  );
  
  // Parallax inner scale
  const innerScale = useTransform(progress, [0, 100], [1.5, 1.2]);
  
  // Fade in the image early
  const imageOpacity = useTransform(progress, [0, 15], [0, 1]);
  
  // Overlay becomes brighter as it expands
  const overlayOpacity = useTransform(progress, [0, 100], [0.8, 0.3]);

  // Title fades out as we get close to the end
  const titleOpacity = useTransform(progress, [0, 60], [1, 0]);
  const titleScale = useTransform(progress, [0, 100], [1, 0.95]);

  const navigate = useCallback(() => {
    if (isNavigating || !nextProject) return;
    setIsNavigating(true);
    
    // Crucial: scroll=false so we don't trigger native scroll jump yet
    setTimeout(() => {
      const href = nextProject.href || `/work/${nextProject.id}`;
      router.push(href, { scroll: false });
    }, 50);
  }, [isNavigating, nextProject, router]);

  useEffect(() => {
    if (!nextProject) return;
    let accumulatedProgress = 0;
    
    if (!isNavigating) {
      progressRaw.set(0);
    }

    const handleWheel = (e: WheelEvent) => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

      if (isAtBottom && e.deltaY > 0) {
        e.preventDefault();
        // Slower accumulation for more premium feel
        accumulatedProgress = Math.min(accumulatedProgress + e.deltaY * 0.1, 100);
        progressRaw.set(accumulatedProgress);
        if (accumulatedProgress >= 100) navigate();
      } else if (isAtBottom && e.deltaY < 0) {
        accumulatedProgress = Math.max(accumulatedProgress + e.deltaY * 0.1, 0);
        progressRaw.set(accumulatedProgress);
      } else if (!isAtBottom && accumulatedProgress > 0) {
        accumulatedProgress = 0;
        progressRaw.set(0);
      }
    };

    let lastY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = lastY - currentY;
      lastY = currentY;
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

      if (isAtBottom && deltaY > 0) {
        if (e.cancelable) e.preventDefault();
        accumulatedProgress = Math.min(accumulatedProgress + deltaY * 0.8, 100);
        progressRaw.set(accumulatedProgress);
        if (accumulatedProgress >= 100) navigate();
      } else if (isAtBottom && deltaY < 0) {
        accumulatedProgress = Math.max(accumulatedProgress + deltaY * 0.8, 0);
        progressRaw.set(accumulatedProgress);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [nextProject, navigate, progressRaw, isNavigating]);

  // Prefetch
  useEffect(() => {
    if (!nextProject) return;
    const href = nextProject.href || `/work/${nextProject.id}`;
    router.prefetch(href);
  }, [nextProject, router]);

  if (!nextProject) return null;

  return (
    <>
      <section
        ref={sectionRef}
        className="h-screen relative bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center text-center"
      >
        {/* ── Image reveal layer (matte fluid effect) ── */}
        <motion.div
          style={{
            clipPath,
            opacity: imageOpacity,
          }}
          className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none"
        >
          {nextProject.thumbnailUrl ? (
            <motion.img
              style={{ scale: innerScale }}
              src={nextProject.thumbnailUrl}
              alt={nextProject.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#111]" />
          )}
          <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black" />
        </motion.div>

        {/* ── Title layer ── */}
        <motion.div 
          style={{ opacity: titleOpacity, scale: titleScale }}
          className="relative z-10 flex flex-col items-center px-6 pointer-events-none"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#eeece6]/50 mb-4 md:mb-6">
            Next Project
          </span>
          <h2 className="font-display font-light text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight text-[#eeece6]">
            {nextProject.title}
          </h2>
        </motion.div>
      </section>

      {/* ── Navigation overlay (freeze frame during route change) ── */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-[#0a0a0a] pointer-events-auto"
          >
            {/* The frozen matte image */}
            <div
              style={{ clipPath: "inset(35% 30% 35% 30% round 16px)" }}
              className="absolute inset-0 w-full h-full overflow-hidden"
            >
              {nextProject.thumbnailUrl ? (
                <div className="absolute inset-0 w-full h-full" style={{ transform: "scale(1.2)" }}>
                  <img
                    src={nextProject.thumbnailUrl}
                    alt={nextProject.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-[#111]" />
              )}
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
