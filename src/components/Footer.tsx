"use client";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/[0.06] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14 pb-14 border-b border-white/[0.06]">
          <div>
            <p className="font-display font-bold text-2xl md:text-3xl tracking-[0.02em] text-[#eeece6] mb-3">
              XTENDED REALITY
            </p>
            <p className="font-sans text-[#555] text-xs max-w-xs leading-relaxed">
              Cinematic AI production. Visuals that look impossible.
            </p>
          </div>

          <div className="flex gap-16 md:gap-20">
            <div>
              <p className="font-mono text-[9px] text-[#444] uppercase tracking-[0.2em] mb-4">Site</p>
              <ul className="space-y-2.5">
                {["Work", "Services", "Process", "About", "Contact"].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="font-sans text-xs text-[#555] hover:text-[#eeece6] transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[9px] text-[#444] uppercase tracking-[0.2em] mb-4">Social</p>
              <ul className="space-y-2.5">
                {["Instagram", "YouTube", "Vimeo", "Behance"].map((s) => (
                  <li key={s}>
                    <a href="#" className="font-sans text-xs text-[#555] hover:text-[#eeece6] transition-colors duration-300">{s}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[9px] text-[#444] tracking-wider">
            © {new Date().getFullYear()} Xtended Reality Studio · All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <a href="/admin" className="font-mono text-[9px] text-[#333] hover:text-[#777] transition-colors tracking-wider">
              Admin
            </a>
            <button
              onClick={scrollTop}
              className="group w-8 h-8 rounded-full border border-white/8 flex items-center justify-center text-[#444] hover:text-[#eeece6] hover:border-white/25 transition-all"
              aria-label="Back to top"
            >
              <svg className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
