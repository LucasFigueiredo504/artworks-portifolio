import { useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useInView } from "motion/react";
import frame from "../assets/frame.svg";
import { stories } from "../lib/stories";
import type { Section } from "../types/types";

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
          <motion.img
            src={bannerImg}
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero text */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-20 pb-16">
          <div className="max-w-3xl">
            <motion.div
              className="flex items-center gap-4 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <span className="text-white/60 text-xs font-body tracking-widest uppercase">
                Last Updated
              </span>
              <span className="w-8 h-px bg-yellow-400" />
              <span className="text-white/60 text-xs font-body">
                {updatedDate}
              </span>
            </motion.div>
            <motion.h1
              className="font-display text-white text-5xl md:text-7xl leading-none mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            >
              {story.title}
            </motion.h1>
            <motion.p
              className="text-white/70 font-body text-base md:text-lg leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
            >
              {story.description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col gap-28">
        {story.sections.map((section, i) => {
          if (section.type === "text") {
            return <TextSection key={i} text={section.text} />;
          }

          const isLeft = section.alignment === "left";
          return <TextImageSection key={i} section={section} isLeft={isLeft} />;
        })}
      </div>
    </article>
  );
}

function TextSection({ text }: { text: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="max-w-2xl mx-auto text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <p className="text-gray-600 font-body text-base leading-loose">{text}</p>
    </motion.div>
  );
}

function TextImageSection({
  section,
  isLeft,
}: {
  section: Section;
  isLeft: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} gap-12 md:gap-20 items-center`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Image */}
      {section.image?.image && (
        <motion.div
          className="relative w-full md:w-1/2 aspect-[4/3] group overflow-hidden flex-shrink-0 cursor-pointer"
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          onClick={() =>
            section.image?.slug && navigate(`/file/${section.image.slug}`)
          }
        >
          <img
            src={section.image.image}
            alt={section.image.title || section.image.description || ""}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <img
            src={frame}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-fill z-10 pointer-events-none b-5 border-white"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 z-5 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
            <span className="font-display text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {section.image.title}
            </span>
          </div>
        </motion.div>
      )}

      {/* Text */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center"
        initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
      >
        <p className="text-gray-600 font-body text-2xl leading-loose">
          {section.text}
        </p>
        {section.image?.description && (
          <p className="mt-6 text-gray-400 text-xs font-body italic">
            {section.image.description}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
