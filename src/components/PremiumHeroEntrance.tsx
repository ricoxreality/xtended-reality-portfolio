"use client";

import { motion } from "framer-motion";
import { useState, useLayoutEffect, useEffect } from "react";

export default function PremiumHeroEntrance({
  thumbnailUrl,
  title,
  children
}: {
  thumbnailUrl?: string;
  title?: string;
  children?: React.ReactNode;
}) {
  const [isEntering, setIsEntering] = useState(true);

  // Force scroll to top instantly on mount, before paint
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Unlock after animation finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={isEntering ? "fixed inset-0 z-[100] bg-[#0a0a0a]" : "absolute inset-0 w-full h-full"}>
      <motion.div
        initial={{ clipPath: "inset(35% 30% 35% 30% round 16px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
        transition={{ duration: 1.6, ease: [0.85, 0, 0.15, 1] }}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.85, 0, 0.15, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {thumbnailUrl ? (
            <img src={thumbnailUrl} className="w-full h-full object-cover" />
          ) : (
            children
          )}
        </motion.div>
        
        {/* Dark overlay that matches the footer's handoff state (bg-black/30), then fades to match the hero */}
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.6, ease: [0.85, 0, 0.15, 1] }}
          className="absolute inset-0 bg-black"
        />
      </motion.div>
    </div>
  );
}
