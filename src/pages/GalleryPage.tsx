import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "motion/react";
import { getImageFiles, urlFor } from "../lib/sanity";
import type { ImageFile } from "../types/types";

export function GalleryPage() {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    getImageFiles().then((files) => {
      setImageFiles(files);
      // derive unique categories from the fetched data
      const unique = Array.from(
        new Set(files.map((f) => f.category).filter(Boolean)),
      );
      setCategories(["All", ...unique]);
    });
  }, []);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  const filtered =
    activeCategory === "All"
      ? imageFiles
      : imageFiles.filter((img) => img.category === activeCategory);

  return (
    <div className="bg-white">
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            ref={headerRef}
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="font-display text-black text-5xl md:text-7xl leading-none">
              Gallery
            </h2>
            <div className="w-16 h-px bg-yellow-400 mx-auto mt-6" />
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
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
          </motion.div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: gridInView ? i * 0.05 : 0,
                  }}
                  className="relative aspect-square overflow-hidden group cursor-pointer"
                  onClick={() => navigate(`/file/${img.slug}`)}
                >
                  <img
                    src={urlFor(img.image).width(600).url()}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-body mb-1">
                      {img.category}
                    </span>
                    <h3 className="font-display text-white text-xl">
                      {img.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
