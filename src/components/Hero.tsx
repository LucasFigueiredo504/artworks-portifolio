import { useEffect, useRef } from "react";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    setTimeout(() => {
      el.style.transition = "opacity 1.4s ease, transform 1.4s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/*     
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      /> */}

      {/* Diagonal accent lines */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent ml-[15%]" />
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/10 to-transparent mr-[20%]" />

      {/* Glowing circle */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-yellow-400/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-[400px] h-[400px] rounded-full border border-yellow-400/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Subtitle above */}
      <p className="text-yellow-400 tracking-[0.5em] uppercase text-xs mb-8 opacity-80 font-body">
        — Illustrator —
      </p>

      {/* Main Title */}
      <h1
        ref={titleRef}
        className="font-display text-center leading-none select-none"
        style={{
          fontSize: "clamp(3.5rem, 12vw, 10rem)",
          letterSpacing: "-0.02em",
        }}
      >
        <span className="block text-white">TELLAR</span>
        <span
          className="block text-transparent"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.6)",
          }}
        >
          HEAVEN
        </span>
      </h1>

      {/* Decorative line */}
      <div className="w-24 h-px bg-yellow-400 mt-10 mb-6" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
