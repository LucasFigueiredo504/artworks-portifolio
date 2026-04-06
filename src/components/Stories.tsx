const stories = [
  {
    id: 1,
    title: "Between Light and Shadow",
    excerpt:
      "A journey into the liminal space where darkness surrenders to luminance. These images capture moments of transition — the breath before dawn, the last gasp of dusk — rendered in painstaking detail.",
    tag: "Essay",
    date: "March 2024",
    img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80",
  },
  {
    id: 2,
    title: "The Architecture of Silence",
    excerpt:
      "Empty structures speak loudest. In abandoned cathedrals, desolate rooftops, and fog-wrapped bridges, there exists a language older than words — one only the camera can faithfully translate.",
    tag: "Series",
    date: "January 2024",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  },
];

export default function Stories() {
  return (
    <section id="stories" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-black text-5xl md:text-7xl leading-none">
            Stories
          </h2>
          <div className="w-16 h-px bg-yellow-400 mx-auto mt-6" />
        </div>

        {/* Story rows */}
        <div className="flex flex-col gap-24">
          {stories.map((story, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={story.id}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-12 md:gap-16 items-center`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 overflow-hidden aspect-[4/3] group">
                  <img
                    src={story.img}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-yellow-500 text-xs tracking-[0.3em] uppercase font-body">
                      {story.tag}
                    </span>
                    <span className="w-8 h-px bg-gray-300" />
                    <span className="text-gray-400 text-xs font-body">
                      {story.date}
                    </span>
                  </div>
                  <h3 className="font-display text-black text-3xl md:text-4xl leading-tight mb-6">
                    {story.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm font-body mb-8">
                    {story.excerpt}
                  </p>
                  <a
                    href="#"
                    className="group/link inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-body text-black hover:text-yellow-500 transition-colors duration-300"
                  >
                    Read Story
                    <span className="inline-block w-8 h-px bg-current transition-all duration-300 group-hover/link:w-12" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* See all */}
        <div className="text-center mt-20">
          <a
            href="#"
            className="inline-block border border-black text-black px-12 py-4 text-xs tracking-[0.3em] uppercase font-body hover:bg-black hover:text-white transition-colors duration-400"
          >
            See All Stories
          </a>
        </div>
      </div>
    </section>
  );
}
