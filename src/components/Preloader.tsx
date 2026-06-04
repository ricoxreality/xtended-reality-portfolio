"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run the preloader once per session to not annoy the user on every page navigation
    const hasLoaded = sessionStorage.getItem("xr_preloader_done");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Force scroll to top on load
    window.scrollTo(0, 0);

    // Display time for the preloader (2.2 seconds) to allow network caching
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("xr_preloader_done", "true");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0d0d0d] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Elegant thin loading circle */}
          <div className="relative w-12 h-12 mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="48" stroke="rgba(238, 236, 230, 0.08)" strokeWidth="1" />
              <motion.circle 
                cx="50" 
                cy="50" 
                r="48" 
                stroke="rgba(238, 236, 230, 0.8)" 
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ strokeDasharray: 302, strokeDashoffset: 302 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2.1, ease: [0.76, 0, 0.24, 1] }}
              />
            </svg>
          </div>

          {/* Loading Text */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#555]"
            >
              Loading <span className="text-[#eeece6]">Xtended Reality</span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
