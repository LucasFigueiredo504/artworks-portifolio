import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "motion/react";
import frame from "../assets/frame.svg";
import { getStoryBySlug, urlFor } from "../lib/sanity";
import type { Story, Section } from "../types/types";
import { Divider } from "../components/Divider";

export function StoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getStoryBySlug(slug).then((data) => {
      if (!data) setNotFound(true);
      else setStory(data);
    });
  }, [slug]);

  if (notFound) {
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

  if (!story) return null;

  const bannerUrl = story.banner?.image
    ? urlFor(story.banner.image).width(1400).url()
    : "";

  const updatedDate = new Date(story.last_updated_at).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <article className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <motion.img
          src={bannerUrl}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover object-[center_10%]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute -bottom-9 left-0 h-10 w-full">
          <Divider flip color />
        </div>

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
          return (
            <TextImageSection
              key={i}
              section={section}
              isLeft={section.alignment === "left"}
            />
          );
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

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } gap-12 md:gap-20 items-center`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {section.image && (
        <motion.div
          className="relative w-full md:w-1/2 aspect-[4/3] group overflow-hidden flex-shrink-0"
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          {/* ✅ FIXED: section.image is the resolved imageFile doc → .image is the raw Sanity image */}
          <Link to={`/file/${section.image.slug}`}>
            <img
              src={urlFor(section.image.image).width(800).url()}
              alt={section.text}
              className="absolute inset-0 w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          <img
            src={frame}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-fill z-10 pointer-events-none"
          />
        </motion.div>
      )}

      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center"
        initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
      >
        <p className="text-gray-600 font-body text-2xl leading-loose">
          {section.text}
        </p>
      </motion.div>
    </motion.div>
  );
}
