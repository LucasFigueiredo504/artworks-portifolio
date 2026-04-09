import { useCallback, useRef } from "react";
import { motion, useInView } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { imageFiles } from "../lib/files";

const works = imageFiles.slice(-5);

export default function LatestWorks() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1, dragFree: true },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="latest" className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8" ref={sectionRef}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-display text-black text-5xl md:text-7xl leading-none">
            Latest Works
          </h2>
          <div className="w-16 h-px bg-yellow-400 mx-auto mt-6" />
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {works.map((work, i) => (
                <a
                  key={i}
                  href={`/file/${work.slug}`}
                  className="flex-none w-[80vw] md:w-[40vw] lg:w-[28vw] group cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden mb-5">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <span className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-body mb-1">
                        {work.category}
                      </span>
                      <h3 className="font-display text-white text-xl">
                        {work.title}
                      </h3>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 border border-yellow-400/60 flex items-center justify-center">
                        <ArrowUpRight
                          className="text-yellow-400 font-light"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <button
            onClick={scrollPrev}
            className="w-12 h-12 border border-black text-black hover:text-yellow-500 hover:border-yellow-400 transition-colors duration-300 flex items-center justify-center select-none"
            aria-label="Previous"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={scrollNext}
            className="w-12 h-12 border border-black text-black hover:text-yellow-500 hover:border-yellow-400 transition-colors duration-300 flex items-center justify-center select-none"
            aria-label="Next"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
