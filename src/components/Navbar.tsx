"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "Work", href: "/" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 py-7 transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group">
            <span className="font-display font-bold text-base tracking-[0.06em] text-[#eeece6] group-hover:text-white transition-colors duration-300">
              XTENDED REALITY
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-sans text-[12px] tracking-[0.08em] text-[#eeece6]/60 hover:text-[#eeece6] transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#eeece6] border border-[#eeece6]/20 px-5 py-2.5 rounded-full hover:border-[#eeece6]/60 hover:bg-[#eeece6]/5 transition-all duration-400"
            >
              Start a Project
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 group"
            aria-label="Menu"
          >
            <span className={`w-5 h-px bg-[#eeece6] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`w-5 h-px bg-[#eeece6] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#111111] md:hidden flex flex-col"
          >
            <div className="pt-24 px-8 flex flex-col justify-between h-full pb-12">
              <nav className="flex flex-col divide-y divide-white/5">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-3xl text-[#777] hover:text-[#eeece6] transition-colors py-5"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <a
                  href="mailto:hello@xtendedreality.studio"
                  className="block font-sans text-sm text-[#555] hover:text-[#eeece6] transition-colors"
                >
                  hello@xtendedreality.studio
                </a>
                <a
                  href="#contact"
                  onClick={(e) => go(e, "#contact")}
                  className="block text-center py-4 border border-[#eeece6]/20 rounded-full font-sans text-sm text-[#eeece6] hover:border-[#eeece6]/60 transition-all"
                >
                  Start a Project
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
