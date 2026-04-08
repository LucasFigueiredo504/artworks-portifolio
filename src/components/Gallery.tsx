import { useState } from "react";
import { Divider } from "./Divider";
import dragon from "../assets/decorative_dragon_2.svg";
import { imageFiles } from "../lib/files";
import { Link } from "react-router-dom";

export default function Gallery() {
  // Pick random main image once
  const [mainIndex] = useState(() =>
    Math.floor(Math.random() * imageFiles.length),
  );

  const mainImage = imageFiles[mainIndex];
  const smallImages = imageFiles.filter((_, i) => i !== mainIndex);

  return (
    <div className="relative bg-white z-10">
      {/* Dragon decorations */}
      <img
        src={dragon}
        alt="Dragon decoration"
        className="absolute -top-32 md:-top-48 -left-8 w-52 md:w-68 pointer-events-none select-none"
        style={{ transform: "scaleY(-1) scaleX(-1)" }}
      />
      <img
        src={dragon}
        alt="Dragon decoration"
        className="absolute -bottom-32 md:-bottom-48 -right-8 w-52 md:w-68 pointer-events-none select-none"
      />

      <Divider flip />

      <section id="gallery" className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-white text-5xl md:text-7xl leading-none">
              Gallery
            </h2>
            <div className="w-16 h-px bg-yellow-400 mx-auto mt-6" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Big main image */}
            <Link
              to={`/file/${mainImage.slug}`}
              className="relative overflow-hidden group cursor-pointer md:row-span-2 w-full"
              style={{ maxHeight: "600px" }} // Limit the height
            >
              <img
                src={mainImage.image}
                alt={mainImage.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-body mb-2">
                  {mainImage.category}
                </span>
                <h3 className="font-display text-white text-3xl">
                  {mainImage.title}
                </h3>
              </div>
            </Link>

            {/* Small images */}
            <div className="grid grid-cols-2 gap-4">
              {smallImages.map((img, i) => (
                <Link
                  key={i}
                  to={`/file/${img.slug}`}
                  className="relative overflow-hidden group cursor-pointer aspect-square"
                >
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center">
                    <span className="text-white font-display text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {img.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom link */}
          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-body text-yellow-400 hover:text-white transition-colors duration-300"
            >
              Explore Full Gallery
              <span className="inline-block w-8 h-px bg-current" />
            </a>
          </div>
        </div>
      </section>

      <Divider />
    </div>
  );
}
