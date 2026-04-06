import divider from "../assets/divider.svg";

const galleryImages = {
  main: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
    title: "Ethereal Peaks",
    category: "Landscape",
  },
  small: [
    {
      src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80",
      title: "Wild Bloom",
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      title: "Desert Void",
    },
    {
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80",
      title: "Starfall",
    },
    {
      src: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?w=400&q=80",
      title: "Wave Break",
    },
  ],
};

const DividerRepeating = ({ flip = false }: { flip?: boolean }) => (
  <div
    className="w-full"
    style={{
      height: "80px",
      margin: "-40px 0",
      backgroundImage: `url(${divider})`,
      backgroundRepeat: "repeat-x",
      backgroundSize: "auto 100%",
      backgroundPosition: "center",
      filter: "brightness(0)",
      transform: flip ? "scaleY(-1)" : undefined,
    }}
  />
);

export default function Gallery() {
  return (
    <div className="relative bg-white">
      {/* Top divider — flipped, repeating */}
      <DividerRepeating flip />

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
            {/* Big left image */}
            <div className="relative overflow-hidden group cursor-pointer md:row-span-2 aspect-[3/4] md:aspect-auto">
              <img
                src={galleryImages.main.src}
                alt={galleryImages.main.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-body mb-2">
                  {galleryImages.main.category}
                </span>
                <h3 className="font-display text-white text-3xl">
                  {galleryImages.main.title}
                </h3>
              </div>
            </div>

            {/* Small right grid */}
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.small.map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden group cursor-pointer aspect-square"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center">
                    <span className="text-white font-display text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {img.title}
                    </span>
                  </div>
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
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

      {/* Bottom divider — normal, repeating */}
      <DividerRepeating />
    </div>
  );
}
