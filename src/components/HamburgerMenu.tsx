"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "WORK", href: "/" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/#contact" },
];

const E = [0.76, 0, 0.24, 1] as const;

const overlayVariants = {
  closed: {
    clipPath: "inset(0 0 0 100%)",
    transition: { duration: 0.75, ease: E, delay: 0.2 },
  },
  open: {
    clipPath: "inset(0 0 0 0%)",
    transition: { duration: 0.75, ease: E },
  },
};

const itemVariants = {
  closed: { y: "110%", opacity: 0 },
  open: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: E, delay: 0.45 + i * 0.09 },
  }),
};

const footerVariants = {
  closed: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: E, delay: 0.85 },
  },
};

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Logo: fixed top-left ──────────────────────────────────────── */}
      <div className="fixed top-0 left-0 z-50 px-6 md:px-10 py-5 md:py-7 pointer-events-auto">
        <Link
          href="/"
          className="flex flex-col gap-0.5 group"
          aria-label="Xtended Reality — Home"
        >
          <span
            className="font-display font-bold text-[#eeece6] text-sm md:text-base tracking-[0.12em] uppercase leading-none group-hover:text-white transition-colors duration-300"
          >
            Xtended Reality
          </span>
          <span className="font-sans text-[10px] text-[#eeece6]/45 tracking-[0.18em] uppercase">
            AI Creative Studio
          </span>
        </Link>
      </div>

      {/* ── Hamburger button: fixed top-right ─────────────────────────── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="fixed top-0 right-0 z-[60] px-6 md:px-10 py-6 md:py-8 flex flex-col items-end justify-center gap-[5px] group pointer-events-auto"
      >
        {/* Line 1 */}
        <span
          className={`block h-px bg-[#eeece6] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
            isOpen
              ? "w-6 rotate-45 translate-y-[6px]"
              : "w-6 group-hover:w-7"
          }`}
        />
        {/* Line 2 */}
        <span
          className={`block h-px bg-[#eeece6] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isOpen ? "w-6 opacity-0 scale-x-0" : "w-4 group-hover:w-6"
          }`}
        />
        {/* Line 3 */}
        <span
          className={`block h-px bg-[#eeece6] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
            isOpen
              ? "w-6 -rotate-45 -translate-y-[6px]"
              : "w-6 group-hover:w-4"
          }`}
        />
      </button>

      {/* ── Full-screen overlay ───────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-overlay"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-[55] bg-[#111111] flex flex-col overflow-hidden"
          >
            {/* Noise texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "128px",
              }}
            />

            {/* Diagonal decorative line */}
            <div className="absolute top-0 right-[30%] w-px h-full bg-[#eeece6]/[0.04] pointer-events-none" />

            {/* ── Nav items ── */}
            <nav className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24">
              <ul className="flex flex-col gap-1 md:gap-2" role="list">
                {navItems.map((item, i) => (
                  <li key={item.label} className="overflow-hidden">
                    <motion.div
                      custom={i}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`group relative inline-flex items-baseline gap-4 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.0] transition-colors duration-300 ${
                          pathname === item.href
                            ? "text-[#eeece6]"
                            : "text-[#eeece6]/30 hover:text-[#eeece6]"
                        }`}
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {/* Index number */}
                        <span className="font-mono text-[10px] text-[#eeece6]/30 tracking-[0.2em] self-center translate-y-[-0.2em] w-5 group-hover:text-[#eeece6]/60 transition-colors duration-300">
                          0{i + 1}
                        </span>
                        {/* Label */}
                        <span className="relative">
                          {item.label}
                          {/* Underline reveal */}
                          <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#eeece6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Footer section ── */}
            <motion.div
              variants={footerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-8 md:px-16 lg:px-24 pb-10 md:pb-14"
            >
              {/* Thin rule */}
              <div className="h-px bg-[#eeece6]/[0.08] mb-6 md:mb-8" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Social links */}
                <div className="flex items-center gap-6">
                  {[
                    { label: "Instagram", href: "https://www.instagram.com/rico.xr_/" },
                    { label: "Vimeo", href: "https://vimeo.com" },
                    { label: "LinkedIn", href: "https://linkedin.com" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#eeece6]/35 hover:text-[#eeece6]/80 transition-colors duration-300"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>

                {/* Email */}
                <a
                  href="mailto:hello@xtendedreality.studio"
                  className="font-sans text-[11px] text-[#eeece6]/35 hover:text-[#eeece6]/80 transition-colors duration-300 tracking-wide"
                >
                  hello@xtendedreality.studio
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
