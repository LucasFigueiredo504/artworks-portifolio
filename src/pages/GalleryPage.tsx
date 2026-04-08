import { useState } from "react";

import artemia from "../assets/drawings/the_sacred_tree_of_eternity_by_tellarheaven.jpg";
import coronation from "../assets/drawings/coronation_of_the_ruler_of_darkness_by_tellarheaven.jpg";
import taliaria from "../assets/drawings/taliaria__horror_of_the_sharp_waves.jpg";
import ulquiorra from "../assets/drawings/ulquiorra_segunda_etapa__fanart.jpg";
import artwen from "../assets/drawings/tellarrebels_fusion_artwem.jpg";

const categories = ["All", "Original character", "Fanart"];

const allImages = [
  {
    src: artemia,
    title: "Artemia Guardian Goddess of the sacred light",
    category: "Original character",
  },
  {
    src: coronation,
    title: "Coronation of the ruler of darkness",
    category: "Original character",
  },
  {
    src: ulquiorra,
    title: "Ulquiorra Segunda Etapa",
    category: "Fanart",
  },
  {
    src: taliaria,
    title: "Taliaria, Horror of the Sharp Waves",
    category: "Original character",
  },
  {
    src: artwen,
    title: "TellarRebels Fusion Artwem",
    category: "Original character",
  },
];

type Image = {
  src: string;
  title: string;
  category: string;
};

function LightboxModal({
  image,
  onClose,
  onPrev,
  onNext,
}: {
  image: Image;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-8 text-white/40 hover:text-yellow-400 transition-colors text-3xl font-light z-10"
        onClick={onClose}
      >
        ×
      </button>

      <button
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-yellow-400 transition-colors text-4xl font-thin z-10 select-none"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        ‹
      </button>

      <button
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-yellow-400 transition-colors text-4xl font-thin z-10 select-none"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        ›
      </button>

      <div
        className="relative max-w-4xl max-h-[85vh] mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.title}
          className="max-w-full max-h-[85vh] object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <span className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-body">
            {image.category}
          </span>
          <h3 className="font-display text-white text-2xl mt-1">
            {image.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length,
    );
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  return (
    <div className="bg-white">
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="font-display text-black text-5xl md:text-7xl leading-none">
              Gallery
            </h2>
            <div className="w-16 h-px bg-yellow-400 mx-auto mt-6" />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-xs tracking-[0.25em] uppercase font-body transition-colors duration-300 border ${
                  activeCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-black/40 border-black/20 hover:text-black hover:border-black/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Uniform square grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <div
                key={`${img.title}-${i}`}
                className="relative aspect-square overflow-hidden group cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-body mb-1">
                    {img.category}
                  </span>
                  <h3 className="font-display text-white text-xl">
                    {img.title}
                  </h3>
                </div>

                {/* Expand icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 border border-yellow-400/60 flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="rgb(250,204,21)"
                      strokeWidth="1.5"
                    >
                      <path d="M2 1H1v1M10 1h1v1M2 11H1v-1M10 11h1v-1" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <LightboxModal
          image={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}
