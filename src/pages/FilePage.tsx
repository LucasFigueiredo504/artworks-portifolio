import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageFiles, urlFor } from "../lib/sanity";
import type { ImageFile } from "../types/types";

function LightboxModal({
  image,
  onClose,
}: {
  image: ImageFile;
  onClose: () => void;
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
      <div
        className="relative max-w-4xl max-h-[85vh] mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={urlFor(image.image).width(1600).url()}
          alt={image.title}
          className="max-w-full max-h-[85vh] object-contain"
        />
      </div>
    </div>
  );
}

export function FilePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);

  useEffect(() => {
    getImageFiles().then(setImageFiles);
  }, []);

  const currentIndex = imageFiles.findIndex((img) => img.slug === slug);
  const drawing = imageFiles[currentIndex] ?? null;

  if (imageFiles.length > 0 && !drawing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="font-body text-black/30 tracking-[0.2em] uppercase text-sm mb-4">
            Drawing not found
          </p>
          <button
            onClick={() => navigate("/gallery")}
            className="font-body text-yellow-500 text-xs tracking-[0.25em] uppercase hover:text-black transition-colors"
          >
            ← Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  if (!drawing) return null; // loading

  const prevDrawing = currentIndex > 0 ? imageFiles[currentIndex - 1] : null;
  const nextDrawing =
    currentIndex < imageFiles.length - 1 ? imageFiles[currentIndex + 1] : null;

  return (
    <div className="bg-white min-h-screen">
      <motion.div
        className="border-b border-black/8 px-8 py-5 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <button
          onClick={() => navigate("/gallery")}
          className="flex items-center gap-2 text-black/40 hover:text-black transition-colors group"
        >
          <ChevronLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          <span className="font-body text-xs tracking-[0.25em] uppercase">
            Gallery
          </span>
        </button>
        <span className="font-body text-xs tracking-[0.2em] uppercase text-black/25">
          {currentIndex + 1} / {imageFiles.length}
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div
              className="overflow-hidden bg-black/3 cursor-zoom-in group"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={urlFor(drawing.image).width(900).url()}
                alt={drawing.title}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 border border-yellow-400/60 bg-black/30 flex items-center justify-center">
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
          </motion.div>

          <motion.div
            className="lg:pt-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="font-display text-black text-4xl md:text-5xl leading-tight mt-3 mb-6">
              {drawing.title}
            </h1>
            <div className="w-12 h-px bg-yellow-400 mb-8" />
            {drawing.description && (
              <p className="font-body text-black/60 text-base leading-relaxed">
                {drawing.description}
              </p>
            )}
            <div className="mt-12 pt-8 border-t border-black/8">
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 border border-black/15 text-black/40 font-body text-xs tracking-[0.2em] uppercase">
                  {drawing.category}
                </span>
                <span className="px-4 py-1.5 border border-black/15 text-black/40 font-body text-xs tracking-[0.2em] uppercase">
                  Digital art
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="border-t border-black/8 max-w-7xl mx-auto px-8 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      >
        <div className="grid grid-cols-2">
          <div className="py-8 pr-8">
            {prevDrawing ? (
              <button
                onClick={() => navigate(`/file/${prevDrawing.slug}`)}
                className="group flex items-center justify-start gap-3 w-full cursor-pointer"
              >
                <ChevronLeft
                  size={20}
                  className="text-black group-hover:text-yellow-500 transition-colors shrink-0"
                />
                <p className="font-body text-xs tracking-[0.25em] uppercase text-black group-hover:text-yellow-500 transition-colors">
                  Previous
                </p>
              </button>
            ) : (
              <div />
            )}
          </div>
          <div className="py-8 pl-8">
            {nextDrawing ? (
              <button
                onClick={() => navigate(`/file/${nextDrawing.slug}`)}
                className="group flex items-center justify-end gap-3 w-full cursor-pointer"
              >
                <p className="font-body text-xs tracking-[0.25em] uppercase text-black group-hover:text-yellow-500 transition-colors">
                  Next
                </p>
                <ChevronRight
                  size={20}
                  className="text-black group-hover:text-yellow-500 transition-colors shrink-0"
                />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </motion.div>

      {lightboxOpen && (
        <LightboxModal image={drawing} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}
