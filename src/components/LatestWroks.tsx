import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";

const works = [
  {
    id: 1,
    title: "Celestial Forms",
    category: "Photography",
    year: "2024",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    id: 2,
    title: "Void Architecture",
    category: "Digital Art",
    year: "2024",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    id: 3,
    title: "Neon Bloom",
    category: "Mixed Media",
    year: "2023",
    img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80",
  },
  {
    id: 4,
    title: "Shadow Requiem",
    category: "Photography",
    year: "2023",
    img: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?w=600&q=80",
  },
  {
    id: 5,
    title: "Golden Hour Opus",
    category: "Fine Art",
    year: "2024",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
  },
  {
    id: 6,
    title: "Temporal Drift",
    category: "Digital Art",
    year: "2023",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
  },
];

export default function LatestWorks() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 3000, stopOnInteraction: false })],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="works" className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-black text-5xl md:text-7xl leading-none">
            Latest Works
          </h2>
          <div className="w-16 h-px bg-yellow-400 mx-auto mt-6" />
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {works.map((work) => (
              <div
                key={work.id}
                className="flex-none w-[80vw] md:w-[35vw] lg:w-[28vw] group cursor-pointer"
              >
                <div className="overflow-hidden aspect-[3/4] relative mb-5">
                  <img
                    src={work.img}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                    <span className="text-white text-xs tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      View Project
                    </span>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-black text-xl mb-1">
                      {work.title}
                    </h3>
                    <p className="text-gray-400 text-xs tracking-[0.2em] uppercase font-body">
                      {work.category}
                    </p>
                  </div>
                  <span className="text-yellow-500 text-xs font-body mt-1">
                    {work.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={scrollPrev}
            className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 text-black text-lg"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={scrollNext}
            className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 text-black text-lg"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
