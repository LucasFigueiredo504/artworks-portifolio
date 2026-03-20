import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { PortableText } from "@portabletext/react";
import { getPosts, urlFor } from "../lib/sanity";

// ─── Post type ────────────────────────────────────────────────────────────────
interface Post {
  slug: string;
  title: string;
  date: string;
  image?: { asset: { _ref: string } };
  excerpt: string;
  body: any[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function portableTextToExcerpt(blocks: any[]): string {
  const first = blocks?.find((b) => b._type === "block");
  if (!first || !("children" in first)) return "";
  return (first.children as { text: string }[])
    .map((c) => c.text)
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function imageUrl(image: Post["image"], width = 1200): string {
  if (!image) return "";
  return urlFor(image).width(width).auto("format").url();
}

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const viewport = { once: true, amount: 0.2 };

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedCard({
  post,
  onClick,
}: {
  post: Post;
  onClick: (p: Post) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const src = imageUrl(post.image, 1400);

  return (
    <motion.div
      className="cursor-pointer relative overflow-hidden bg-brand-hover shadow-[0_24px_64px_rgba(0,0,0,0.28)]"
      style={{ height: 520 }}
      onClick={() => onClick(post)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {src && (
        <img
          src={src}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            opacity: 0.7,
          }}
        />
      )}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white"
        style={{
          background:
            "linear-gradient(to top, rgba(29,37,53,0.95) 0%, rgba(29,37,53,0.85) 40%, transparent 75%)",
        }}
      >
        <p className="text-[10px] md:text-xs tracking-widest uppercase opacity-60 mb-2">
          {formatDate(post.date)}
        </p>
        <h2 className="font-display font-normal leading-snug mb-3 text-2xl md:text-4xl">
          {post.title}
        </h2>
        <p className="text-xs md:text-sm font-light leading-relaxed opacity-80 mb-4 md:mb-6 max-w-xl line-clamp-3 md:line-clamp-6 lg:line-clamp-none">
          {post.excerpt}
        </p>
        <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase pb-0.5 w-fit transition-opacity hover:opacity-60 text-cream border-b border-cream">
          Ler Artigo
        </span>
      </div>
    </motion.div>
  );
}

// ─── Small Card ───────────────────────────────────────────────────────────────
function SmallCard({
  post,
  onClick,
  delay = 0,
}: {
  post: Post;
  onClick: (p: Post) => void;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const src = imageUrl(post.image, 600);

  return (
    <motion.div
      className="cursor-pointer"
      onClick={() => onClick(post)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      <div className="overflow-hidden mb-4" style={{ height: 260 }}>
        {src ? (
          <img
            src={src}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />
        ) : (
          <div className="w-full h-full bg-[#e8e0d8]" />
        )}
      </div>
      <p className="text-xs opacity-70 mb-1 text-coal">
        {formatDate(post.date)}
      </p>
      <p
        className={`font-display text-sm font-semibold mb-1 transition-colors ${hovered ? "text-brand" : "text-coal"}`}
      >
        {post.title}
      </p>
      <p className="text-xs mb-3 leading-relaxed text-[#6b6460]">
        {post.excerpt.slice(0, 100)}
        {post.excerpt.length > 100 ? "…" : ""}
      </p>
      <span className="text-xs font-medium tracking-widest uppercase pb-0.5 text-brand border-b border-brand">
        Ler Artigo
      </span>
    </motion.div>
  );
}

// ─── Post Detail ──────────────────────────────────────────────────────────────
function PostDetail({ post, onBack }: { post: Post; onBack: () => void }) {
  const src = imageUrl(post.image, 1400);

  return (
    <div>
      <style>{`
        .md-body p          { margin-bottom: 1.5rem; line-height: 1.9; font-size: 0.875rem; color: #6b6460; }
        .md-body strong     { color: var(--color-coal); font-weight: 600; }
        .md-body em         { font-style: italic; }
        .md-body h1,
        .md-body h2,
        .md-body h3         { font-family: var(--font-display); color: var(--color-coal); margin: 2rem 0 1rem; font-weight: 400; }
        .md-body h1         { font-size: 1.75rem; }
        .md-body h2         { font-size: 1.375rem; }
        .md-body h3         { font-size: 1.125rem; }
        .md-body ul,
        .md-body ol         { margin: 0 0 1.5rem 1.5rem; color: #6b6460; font-size: 0.875rem; line-height: 1.9; }
        .md-body li         { margin-bottom: 0.4rem; }
        .md-body blockquote { border-left: 3px solid var(--color-brand); margin: 0 0 1.5rem; padding: 0.5rem 0 0.5rem 1.25rem; color: #9a8f8a; font-style: italic; }
        .md-body a          { color: var(--color-brand); text-decoration: underline; }
        .md-body code       { background: #ede8e3; padding: 0.1rem 0.35rem; border-radius: 3px; font-size: 0.8rem; }
        .md-body hr         { border: none; border-top: 1px solid #d8cfc7; margin: 2rem 0; }
      `}</style>

      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "60vh" }}
      >
        {src && (
          <img
            src={src}
            alt={post.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="relative z-10 px-12 pb-16 max-w-4xl">
          <motion.button
            onClick={onBack}
            className="text-white/70 hover:text-white text-xs font-medium tracking-widest uppercase mb-6 flex items-center gap-2 bg-transparent border-none cursor-pointer p-0 transition-colors"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ← Blog
          </motion.button>
          <motion.p
            className="text-xs font-medium tracking-widest uppercase text-white/70 mb-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {formatDate(post.date)}
          </motion.p>
          <motion.h1
            className="font-display font-normal leading-tight text-white"
            style={{ fontSize: "clamp(32px,5vw,58px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
          >
            {post.title}
          </motion.h1>
        </div>
      </section>

      <section className="bg-cream">
        <motion.div
          className="max-w-2xl mx-auto px-8 py-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="md-body">
            <PortableText value={post.body} />
          </div>
          <hr className="my-10 border-gray-300" />
          <button
            onClick={onBack}
            className="text-xs font-medium tracking-widest uppercase pb-0.5 transition-opacity hover:opacity-60 bg-transparent border-none cursor-pointer p-0 text-brand border-b border-brand"
          >
            ← Voltar ao Blog
          </button>
        </motion.div>
      </section>
    </div>
  );
}

// ─── Blog Listing ─────────────────────────────────────────────────────────────
function BlogListing({
  posts,
  onSelect,
}: {
  posts: Post[];
  onSelect: (p: Post) => void;
}) {
  const [featured, ...rest] = posts;

  return (
    <div>
      <div className="relative">
        <section
          className="bg-sage flex items-start pt-12 relative overflow-hidden"
          style={{ height: "52vh" }}
        >
          <svg
            className="absolute bottom-0 left-0 w-full h-[120px]"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C180,20 360,100 540,60 C720,20 900,100 1080,50 C1260,10 1350,80 1440,60 L1440,120 L0,120 Z"
              fill="#fff"
            />
          </svg>
        </section>

        {featured && (
          <div
            className="px-12 absolute left-0 right-0 z-10"
            style={{ bottom: "-300px" }}
          >
            <div className="max-w-7xl mx-auto">
              <FeaturedCard post={featured} onClick={onSelect} />
            </div>
          </div>
        )}
      </div>

      {featured && <div className="bg-white" style={{ height: 280 }} />}

      {rest.length > 0 && (
        <section className="bg-cream py-20 px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="flex items-center gap-5 mb-12"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ duration: 0.6 }}
            >
              <div className="flex-1 h-px bg-[#d8cfc7]" />
              <p className="text-xs tracking-widest uppercase text-coal opacity-70">
                Mais Artigos
              </p>
              <div className="flex-1 h-px bg-[#d8cfc7]" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {rest.map((p, i) => (
                <SmallCard
                  key={p.slug}
                  post={p}
                  onClick={onSelect}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);

  useEffect(() => {
    getPosts()
      .then((raw: any[]) =>
        setPosts(
          raw.map((p) => ({
            ...p,
            excerpt: portableTextToExcerpt(p.body ?? []),
          })),
        ),
      )
      .catch(() => setError("Não foi possível carregar os artigos."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="font-sans text-coal">
      {loading && (
        <motion.div
          className="min-h-[60vh] flex items-center justify-center bg-cream"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
        >
          <p className="text-coal opacity-50 tracking-[0.15em] text-xs uppercase">
            Carregando…
          </p>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="min-h-[60vh] flex items-center justify-center bg-cream"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
        >
          <p className="text-brand text-sm">{error}</p>
        </motion.div>
      )}

      {!loading &&
        !error &&
        (activePost ? (
          <PostDetail post={activePost} onBack={() => setActivePost(null)} />
        ) : (
          <BlogListing posts={posts} onSelect={setActivePost} />
        ))}
    </div>
  );
}
