import { useRef } from "react";
import { motion, useInView } from "motion/react";
import frame from "../assets/frame.svg";
import { stories } from "../lib/stories";

type Story = (typeof stories)[number];

function StoryRow({ story, i }: { story: Story; i: number }) {
  const isEven = i % 2 === 0;
  const slug = story.slug;
  const img =
    typeof story.banner === "string" && story.banner !== "image"
      ? story.banner
      : story.sections[0]?.image?.image;
  const updatedDate = new Date(story.last_updated_at).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" },
  );

  const rowRef = useRef(null);
  const rowInView = useInView(rowRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={rowRef}
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } gap-12 md:gap-16 items-center`}
      initial={{ opacity: 0, y: 50 }}
      animate={rowInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
    >
      {/* Image */}
      <motion.div
        className="relative w-full md:w-1/2 aspect-[4/3] group overflow-hidden"
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={rowInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <img
          src={img}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover object-[center_10%] transition-transform duration-700 group-hover:scale-105"
        />
        <img
          src={frame}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-fill z-10 pointer-events-none b-10 border-white"
        />
      </motion.div>

      {/* Text */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center"
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={rowInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <div className="flex items-center gap-4 mb-5">
          <span className="text-gray-400 text-xs font-body">Last Update</span>
          <span className="w-8 h-px bg-gray-300" />
          <span className="text-gray-400 text-xs font-body">{updatedDate}</span>
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
      </motion.div>
    </motion.div>
  );
}

export default function Stories() {
  const displayed = stories.slice(0, 2);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="stories" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-display text-black text-5xl md:text-7xl leading-none">
            Stories
          </h2>
          <div className="w-16 h-px bg-white mx-auto mt-6" />
        </motion.div>

        {/* Story rows */}
        <div className="flex flex-col gap-24">
          {displayed.map((story, i) => (
            <StoryRow key={story.slug} story={story} i={i} />
          ))}
        </div>

        {/* See all */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <a
            href="/stories"
            className="inline-block border border-black text-black px-12 py-4 text-xs tracking-[0.3em] uppercase font-body hover:bg-black hover:text-white transition-colors duration-400"
          >
            See All Stories
          </a>
        </motion.div>
      </div>
    </section>
  );
}
