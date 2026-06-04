"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUpText from "./FadeUpText";

const ease = [0.16, 1, 0.3, 1] as const;
type Status = "idle" | "submitting" | "success";

const projectOptions = ["Brand Film", "Product Ad", "Social Campaign", "Fashion Editorial", "Concept Development", "Other"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", projectType: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // REPLACE: wire to your form API
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", projectType: "", message: "" });
    }, 1400);
  };

  return (
    <section id="contact" className="py-24 md:py-36 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="mb-16 md:mb-20"
        >
          <p className="font-sans text-[10px] text-[#555] tracking-[0.25em] uppercase mb-6">Get in Touch</p>
          <h2 className="font-display font-bold text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-[#eeece6] max-w-3xl">
            <FadeUpText text="Have an idea that needs to look impossible?" />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-4 space-y-10"
          >
            <div>
              <p className="font-mono text-[9px] text-[#555] uppercase tracking-[0.2em] mb-3">Direct Line</p>
              <a
                href="mailto:hello@xtendedreality.studio"
                className="font-sans text-lg text-[#eeece6] hover:text-white transition-colors underline-reveal"
              >
                hello@xtendedreality.studio
              </a>
            </div>
            <div>
              <p className="font-mono text-[9px] text-[#555] uppercase tracking-[0.2em] mb-3">Based</p>
              <p className="font-sans text-[#777] text-sm">Paris · London · Remote</p>
            </div>
            <div className="p-5 rounded-lg border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse" />
                <span className="font-mono text-[9px] text-[#555] uppercase tracking-wider">Availability</span>
              </div>
              <p className="font-sans text-[#777] text-sm leading-relaxed">
                We respond within 24 hours and can begin production within one week of briefing.
              </p>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-16 space-y-4"
                >
                  <div className="w-12 h-12 rounded-full border border-[#eeece6]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#eeece6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#eeece6]">Brief received.</h3>
                  <p className="font-sans text-[#777] text-sm max-w-md leading-relaxed">
                    Our creative directors will review your project and respond within 24 hours.
                  </p>
                  <button onClick={() => setStatus("idle")} className="font-sans text-[11px] text-[#555] hover:text-[#eeece6] transition-colors underline">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    {[
                      { id: "name", label: "Name", type: "text", placeholder: "Your name or company" },
                      { id: "email", label: "Email", type: "email", placeholder: "hello@yourbrand.com" },
                    ].map((f) => (
                      <div key={f.id}>
                        <label className="font-mono text-[9px] text-[#555] uppercase tracking-[0.2em] block mb-2">{f.label}</label>
                        <input
                          required
                          type={f.type}
                          placeholder={f.placeholder}
                          disabled={status === "submitting"}
                          value={form[f.id as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Project type pills */}
                  <div>
                    <label className="font-mono text-[9px] text-[#555] uppercase tracking-[0.2em] block mb-3">Project Type</label>
                    <div className="flex flex-wrap gap-2">
                      {projectOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setForm({ ...form, projectType: opt })}
                          className={`px-4 py-2 rounded-full text-[11px] font-sans tracking-wide transition-all duration-250 border ${
                            form.projectType === opt
                              ? "bg-[#eeece6] text-[#111] border-[#eeece6]"
                              : "border-white/10 text-[#555] hover:border-white/25 hover:text-[#eeece6]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-mono text-[9px] text-[#555] uppercase tracking-[0.2em] block mb-2">Brief</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="What are you building? What does success look like?"
                      disabled={status === "submitting"}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="admin-input resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting" || !form.projectType}
                      className="group inline-flex items-center gap-2 bg-[#eeece6] text-[#111] font-sans font-semibold text-[12px] uppercase tracking-[0.1em] px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Brief
                          <svg className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 7H7m10 0v10" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
