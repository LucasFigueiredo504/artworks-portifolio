import frame from "../assets/frame.svg";
import { stories } from "../lib/stories";

export default function StoriesPage() {
  const displayed = stories;

  return (
    <section id="stories" className="bg-white py-32">
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
          {displayed.map((story, i) => {
            const isEven = i % 2 === 0;
            const slug = story.slug;
            const img =
              typeof story.banner === "string" && story.banner !== "image"
                ? story.banner
                : story.sections[0]?.image?.image;
            const updatedDate = new Date(
              story.last_updated_at,
            ).toLocaleDateString("en-US", { month: "long", year: "numeric" });

            return (
              <div
                key={story.title}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-12 md:gap-16 items-center`}
              >
                {/* Image */}
                <div className="relative w-full md:w-1/2 aspect-[4/3] group overflow-hidden">
                  <img
                    src={img}
                    alt={story.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <img
                    src={frame}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-fill z-10 pointer-events-none"
                  />
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-gray-400 text-xs font-body">
                      Last Update
                    </span>
                    <span className="w-8 h-px bg-gray-300" />
                    <span className="text-gray-400 text-xs font-body">
                      {updatedDate}
                    </span>
                  </div>
                  <h3 className="font-display text-black text-3xl md:text-4xl leading-tight mb-6">
                    {story.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm font-body mb-8">
                    {story.description}
                  </p>
                  <a
                    href={`/stories/${slug}`}
                    className="group/link inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-body text-black hover:text-yellow-500 transition-colors duration-300"
                  >
                    Read Story
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
