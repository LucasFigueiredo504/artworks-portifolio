import { useParams, Link } from "react-router-dom";
import frame from "../assets/frame.svg";
import { stories } from "../lib/stories";

export function StoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <p className="font-display text-black text-4xl">Story not found</p>
        <Link
          to="/stories"
          className="text-xs tracking-[0.3em] uppercase font-body text-black hover:text-yellow-500 transition-colors duration-300 border-b border-black hover:border-yellow-500"
        >
          Back to Stories
        </Link>
      </div>
    );
  }

  const bannerImg =
    typeof story.banner === "string" && story.banner !== "image"
      ? story.banner
      : story.sections[0]?.image?.image;

  const updatedDate = new Date(story.last_updated_at).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );

  return (
    <article className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        {bannerImg && (
          <img
            src={bannerImg}
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero text */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-20 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-5">
              <span className="text-white/60 text-xs font-body tracking-widest uppercase">
                Last Updated
              </span>
              <span className="w-8 h-px bg-yellow-400" />
              <span className="text-white/60 text-xs font-body">
                {updatedDate}
              </span>
            </div>
            <h1 className="font-display text-white text-5xl md:text-7xl leading-none mb-6">
              {story.title}
            </h1>
            <p className="text-white/70 font-body text-base md:text-lg leading-relaxed max-w-xl">
              {story.description}
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col gap-28">
        {story.sections.map((section, i) => {
          if (section.type === "text") {
            return (
              <div key={i} className="max-w-2xl mx-auto text-center">
                <p className="text-gray-600 font-body text-base leading-loose">
                  {section.text}
                </p>
              </div>
            );
          }

          // text-image section
          // alignment "left"  → image left, text right  → md:flex-row (image is first in JSX)
          // alignment "right" → image right, text left  → md:flex-row-reverse (image is first in JSX)
          const isLeft = section.alignment === "left";

          return (
            <div
              key={i}
              className={`flex flex-col ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 md:gap-20 items-center`}
            >
              {/* Image */}
              {section.image?.image && (
                <div className="relative w-full md:w-1/2 aspect-[4/3] group overflow-hidden flex-shrink-0">
                  <img
                    src={section.image.image}
                    alt={section.image.title || section.image.description || ""}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <img
                    src={frame}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-fill z-10 pointer-events-none"
                  />
                </div>
              )}

              {/* Text */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <p className="text-gray-600 font-body text-2xl leading-loose">
                  {section.text}
                </p>
                {section.image?.description && (
                  <p className="mt-6 text-gray-400 text-xs font-body italic">
                    {section.image.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
