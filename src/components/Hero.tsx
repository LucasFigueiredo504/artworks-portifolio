import { useEffect, useRef } from "react";
import { Divider } from "./Divider";
import { StarField } from "./StarsBg";

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
    <div className="relative ">
      <style>{`
        @keyframes orbit-wait {
          0%   { transform: translateX(-50%) translateY(-50%) translateZ(300px); }
          100% { transform: translateX(-50%) translateY(-50%) translateZ(300px); }
        }
        @keyframes orbit-md {
          0%   { transform: translateX(-50%) translateY(-50%) rotateY(0deg)   translateZ(300px) rotateY(0deg); }
          100% { transform: translateX(-50%) translateY(-50%) rotateY(360deg) translateZ(300px) rotateY(-360deg); }
        }
        @keyframes orbit-fade {
          0%   { opacity: 1; }
          25%  { opacity: 0.4; }
          50%  { opacity: 0.0; }
          75%  { opacity: 0.4; }
          100% { opacity: 1; }
        }
        .planet-ring {
          animation:
            orbit-wait 2s linear 1,
            orbit-md   60s linear infinite 2s,
            orbit-fade 60s linear infinite 2s;
        }
        .planet-core {
          animation:
            orbit-wait 2s linear 1,
            orbit-md   60s linear infinite 2s;
        }
        .inner-border-fade {
          animation: orbit-fade 60s linear infinite 2s;
        }
        .orbit-scene { perspective: 600px; }
        .orbit-stage {
          transform-style: preserve-3d;
          position: absolute;
          left: 50%; top: 50%;
          width: 0; height: 0;
        }
      `}</style>
      {/* StarField is now a sibling of section, both inside relative wrapper */}
      <StarField />
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="orbit-scene absolute"
          style={{ width: "100%", height: "100%", top: 0, left: 0 }}
        >
          <div className="orbit-stage">
            {/* Star */}
            <div
              style={{
                position: "absolute",
                width: "50px",
                height: "50px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) translateZ(1px)",
                borderRadius: "9999px",
                backgroundColor: "rgb(250,204,21)",
                boxShadow: `
                  0 0 50px rgba(250,204,21,1),
                  0 0 70px rgba(250,204,21,0.8),
                  0 0 90px rgba(250,204,21,0.6)
                `,
              }}
            />
            {/* Outer ring */}
            <div
              className="planet-ring"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "350px",
                height: "350px",
                borderRadius: "9999px",
                border: "1px solid rgb(250,204,21)",
              }}
            />
            {/* Inner black core */}
            <div
              className="planet-core"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "350px",
                height: "350px",
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "280px",
                  height: "280px",
                  borderRadius: "9999px",
                  background: "black",
                  flexShrink: 0,
                }}
              />
              <div
                className="inner-border-fade"
                style={{
                  position: "absolute",
                  width: "280px",
                  height: "280px",
                  borderRadius: "9999px",
                  border: "1px solid rgb(250,204,21)",
                  flexShrink: 0,
                }}
              />
            </div>
          </div>
        </div>

        {/* UI */}
        <p
          className="text-yellow-400 tracking-[0.5em] uppercase text-xs mb-8 opacity-80 font-body"
          style={{ position: "relative", zIndex: 2 }}
        >
          — Illustrator —
        </p>

        <h1
          ref={titleRef}
          className="font-display text-center leading-none select-none"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 7rem)",
            letterSpacing: "-0.02em",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span className="block text-white">TELLAR</span>
          <span
            className="block text-transparent"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}
          >
            HEAVEN
          </span>
        </h1>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          style={{ zIndex: 2 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </section>
      <Divider />
    </div>
  );
}
