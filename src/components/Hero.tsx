import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Divider } from "./Divider";
import { StarField } from "./StarsBg";

// images live in /public/hero_images
const SLIDES = [
  { src: "/hero_images/1.jpg", title: "Jelly Town" },
  { src: "/hero_images/2.jpg", title: "Raptor" },
  { src: "/hero_images/3.jpg", title: "Zuko" },
  { src: "/hero_images/4.jpg", title: "Play Chaos" },
  { src: "/hero_images/5.jpg", title: "Rukia" },
];

const INTERVAL = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  // next slide; resets whenever index changes (also after a manual click)
  useEffect(() => {
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      INTERVAL,
    );
    return () => clearTimeout(t);
  }, [index]);

  // preload the next image
  useEffect(() => {
    new Image().src = SLIDES[(index + 1) % SLIDES.length].src;
  }, [index]);

  const current = SLIDES[index];
  const ease = [0.22, 1, 0.36, 1] as const;

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease, delay: reduceMotion ? 0 : delay },
  });

  return (
    <div className="relative">
      {/* max-md:h-svh keeps the hero inside mobile browser toolbars */}
      <section className="relative h-screen max-md:h-svh min-h-[600px] max-md:min-h-[520px] bg-black overflow-hidden">
        <StarField />

        {/* Images — full height, bleeding off the right edge (full screen on mobile) */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[72%]">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.src}
              className="absolute inset-0"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: 80, scale: 1.08 }
              }
              animate={{ opacity: 1, x: 0, scale: 1 }}
              // keep the old image underneath until the new one has covered it
              exit={{ opacity: 1, transition: { duration: 1.2 } }}
              transition={{ duration: 1.2, ease }}
            >
              <img
                src={current.src}
                alt={current.title}
                className="w-full h-full object-cover object-[center_15%]"
              />
            </motion.div>
          </AnimatePresence>
          {/* fade into the dark on the left so the text stays readable
              (mobile: only the bottom fades so the image stays fully visible) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-black/50 to-transparent max-md:bg-gradient-to-t max-md:from-black max-md:via-black/40 max-md:via-[30%] max-md:to-transparent max-md:to-[65%]" />
        </div>

        {/* Text — left (static); centered at the bottom on mobile */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-8 flex flex-col justify-center max-md:justify-end max-md:items-center max-md:text-center max-md:px-6 max-md:pb-24 pointer-events-none">
          <motion.h1
            {...rise(0.1)}
            className="uppercase text-white leading-[1.05] select-none"
            style={{
              fontFamily: '"Inknut Antiqua", Georgia, serif',
              fontWeight: 400,
              fontSize: "clamp(2.75rem, 8.5vw, 7rem)",
              letterSpacing: "0",
            }}
          >
            <span className="block text-[0.8em]">Tellar</span>
            <span className="block text-yellow-400">Heaven</span>
          </motion.h1>
          <motion.p
            {...rise(0.3)}
            className="font-body text-white/80 text-lg mt-6 max-md:mt-4"
          >
            Digital Illustrator
          </motion.p>
        </div>

        {/* Progress — one bar per image (centered on mobile) */}
        <div className="absolute bottom-10 max-md:bottom-6 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-8 max-md:px-6 flex max-md:justify-center gap-3">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.title}`}
                className="h-6 w-10 flex items-center cursor-pointer"
              >
                <span className="relative block h-px w-full bg-white/25 overflow-hidden">
                  {i < index && (
                    <span className="absolute inset-0 bg-white/70" />
                  )}
                  {i === index && (
                    <motion.span
                      key={index}
                      className="absolute inset-0 bg-yellow-400 origin-left"
                      initial={{ scaleX: reduceMotion ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: INTERVAL / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <Divider />
    </div>
  );
}
