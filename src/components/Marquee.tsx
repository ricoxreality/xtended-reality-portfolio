"use client";

// Slow editorial marquee — warm palette
const items = [
  "Cinematic Brand Films",
  "AI Product Advertising",
  "Fashion Editorial",
  "Social Campaigns",
  "Generative Worldbuilding",
  "Sound Design",
  "Motion Direction",
  "Experimental Visuals",
  "Creative Direction",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative py-4 border-y border-white/[0.06] overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#111111] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#111111] to-transparent pointer-events-none" />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 55s linear infinite", willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#444] px-6">
              {item}
            </span>
            <span className="text-[#333] text-xs">·</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
