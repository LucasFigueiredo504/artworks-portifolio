import { useState, useMemo } from "react";
import type { Post } from "../types/types";

// ─── Brand tokens (mirrored from App.jsx) ────────────────────────────────────
const TC = "#8e1f27";
const TC_L = "#9f6e4f";
const CREAM = "#f7f3ef";
const SAGE = "#617891";
const COAL = "#1d2535";

// ─── Glob + parser ───────────────────────────────────────────────────────────
const rawFiles = import.meta.glob("../../_posts/*.md", {
  as: "raw",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    data[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  return { data, content: match[2] };
}

function loadPosts(): Post[] {
  return Object.entries(rawFiles)
    .map(([filePath, raw]) => {
      const { data, content } = parseFrontmatter(raw);
      const slug = filePath.split("/").pop()!.replace(/\.md$/, "");
      const paragraphs = content.trim().split(/\n\n+/);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        image: data.image ?? "",
        excerpt: paragraphs[0] ?? "",
        body: content.trim(),
      } satisfies Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedCard({
  post,
  onClick,
}: {
  post: Post;
  onClick: (p: Post) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="cursor-pointer relative overflow-hidden"
      style={{
        height: 520,
        background: TC_L,
        boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
      }}
      onClick={() => onClick(post)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            opacity: 0.7,
          }}
        />
      )}

      {/* Overlay */}
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

        <h2
          className="font-normal leading-snug mb-3 text-2xl md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {post.title}
        </h2>

        <p className="text-xs md:text-sm font-light leading-relaxed opacity-80 mb-4 md:mb-6 max-w-xl line-clamp-3 md:line-clamp-6 lg:line-clamp-none">
          {post.excerpt}
        </p>

        <span
          className="text-[10px] md:text-xs font-medium tracking-widest uppercase pb-0.5 w-fit transition-opacity hover:opacity-60"
          style={{ color: CREAM, borderBottom: `1px solid ${CREAM}` }}
        >
          Ler Artigo
        </span>
      </div>
    </div>
  );
}

// ─── Small Card ───────────────────────────────────────────────────────────────
function SmallCard({
  post,
  onClick,
}: {
  post: Post;
  onClick: (p: Post) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="cursor-pointer"
      onClick={() => onClick(post)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden mb-4" style={{ height: 260 }}>
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />
        ) : (
          <div className="w-full h-full" style={{ background: "#e8e0d8" }} />
        )}
      </div>
      <p className="text-xs opacity-70 mb-1" style={{ color: COAL }}>
        {formatDate(post.date)}
      </p>
      <p
        className="text-sm font-semibold mb-1 transition-colors"
        style={{
          fontFamily: "'Playfair Display',serif",
          color: hovered ? TC : COAL,
        }}
      >
        {post.title}
      </p>
      <p className="text-xs mb-3 leading-relaxed" style={{ color: "#6b6460" }}>
        {post.excerpt.slice(0, 100)}
        {post.excerpt.length > 100 ? "…" : ""}
      </p>
      <span
        className="text-xs font-medium tracking-widest uppercase pb-0.5"
        style={{ color: TC, borderBottom: `1px solid ${TC}` }}
      >
        Ler Artigo
      </span>
    </div>
  );
}

// ─── Post Detail ──────────────────────────────────────────────────────────────
function PostDetail({ post, onBack }: { post: Post; onBack: () => void }) {
  return (
    <div>
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "60vh" }}
      >
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black opacity-40" />

        <div className="relative z-10 px-12 pb-16 max-w-4xl">
          <button
            onClick={onBack}
            className="text-white/70 hover:text-white text-xs font-medium tracking-widest uppercase mb-6 flex items-center gap-2 bg-transparent border-none cursor-pointer p-0 transition-colors"
          >
            ← Blog
          </button>
          <p className="text-xs font-medium tracking-widest uppercase text-white/70 mb-3">
            {formatDate(post.date)}
          </p>
          <h1
            className="font-normal leading-tight text-white"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(32px,5vw,58px)",
            }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      <section style={{ background: CREAM }}>
        <div className="max-w-2xl mx-auto px-8 py-20">
          {post.body.split(/\n\n+/).map((para, i) => (
            <p key={i} className="text-sm leading-loose text-gray-500 mb-6">
              {para}
            </p>
          ))}
          <hr className="my-10 border-gray-300" />
          <button
            onClick={onBack}
            className="text-xs font-medium tracking-widest uppercase pb-0.5 transition-opacity hover:opacity-60 bg-transparent border-none cursor-pointer p-0"
            style={{ color: TC, borderBottom: `1px solid ${TC}` }}
          >
            ← Voltar ao Blog
          </button>
        </div>
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
      {/* ── Hero + overlapping featured card ── */}
      <div style={{ position: "relative" }}>
        {/* Hero */}
        <section
          style={{
            height: "52vh",
            background: SAGE,
            display: "flex",
            alignItems: "flex-start",
            paddingTop: "48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* BOTTOM WAVE ONLY */}
          <svg
            className="absolute bottom-0 left-0 w-full h-[120px]"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C180,20 360,100 540,60 C720,20 900,100 1080,50 C1260,10 1350,80 1440,60 L1440,120 L0,120 Z"
              fill={CREAM}
            />
          </svg>
        </section>

        {/* Featured card — absolutely positioned to overlap the hero */}
        {featured && (
          <div
            className="px-12"
            style={{
              position: "absolute",
              bottom: "-300px",
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            <div className="max-w-7xl mx-auto">
              <FeaturedCard post={featured} onClick={onSelect} />
            </div>
          </div>
        )}
      </div>

      {/* Spacer so content below clears the overlapping card */}
      {featured && <div style={{ height: 280, background: "white" }} />}

      {/* ── More posts ── */}
      {rest.length > 0 && (
        <section style={{ background: CREAM }} className="py-20 px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-5 mb-12">
              <div style={{ flex: 1, height: 1, background: "#d8cfc7" }} />
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: COAL, opacity: 0.7 }}
              >
                Mais Artigos
              </p>
              <div style={{ flex: 1, height: 1, background: "#d8cfc7" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {rest.map((p) => (
                <SmallCard key={p.slug} post={p} onClick={onSelect} />
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
  const posts = useMemo(() => loadPosts(), []);
  const [activePost, setActivePost] = useState<Post | null>(null);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", color: COAL }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      {activePost ? (
        <PostDetail post={activePost} onBack={() => setActivePost(null)} />
      ) : (
        <BlogListing posts={posts} onSelect={setActivePost} />
      )}
    </div>
  );
}
