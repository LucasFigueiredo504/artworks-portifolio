import { useState } from "react";
import prod_1 from "./assets/prod_1.png";
import prod_2 from "./assets/prod_2.png";
import prod_3 from "./assets/prod_3.png";
import products_img from "./assets/products.jpg";
import makeBanner from "./assets/makeup.jpg";

import { ChevronLeft, ChevronRight } from "lucide-react";

// Brand tokens — extend these in tailwind.config.js if preferred
const TC = "#8e1f27";
const TC_L = "#6F4D38";
const CREAM = "#f5efe7";
const SAGE = "#617891";
const COAL = "#1d2535";

const products = [
  {
    name: "Sunglow SPF 35",
    desc: "Protetor Solar Facial Iluminador",
    bg: "#f5e8d0",
    img: prod_1,
  },
  {
    name: "Sunglow SPF 35",
    desc: "Protetor Solar Facial Iluminador",
    bg: "#f5e8d0",
    img: prod_1,
  },
  {
    name: "Relief Potion",
    desc: "Remédio para Picadas de Inseto",
    bg: "#dff0e8",
    img: prod_2,
  },
  {
    name: "Cloud Cover SPF 35",
    desc: "Protetor Solar Corporal",
    bg: "#e8f0f5",
    img: prod_3,
  },
];

const testimonials = [
  { quote: '"Estou oficialmente convertido em Makeup."', source: "Bustle" },
  {
    quote:
      '"O protetor solar que realmente funciona para aventuras ao ar livre."',
    source: "Outside Magazine",
  },
  {
    quote: '"Ingredientes limpos que fazem você se sentir bem."',
    source: "Allure",
  },
];

const safetyItems = [
  {
    title: "Ingredientes",
    body: "Nossos produtos são produzidos com ingredientes limpos e de origem responsável, desenvolvidos com métodos clean-on-human para entregar exatamente o que prometem.",
    cta: "Saiba Mais",
  },
  {
    title: "Sustentabilidade",
    body: "Amamos este planeta tanto quanto você. Por isso somos dedicados a usar materiais eco-conscientes, embalagens pensadas e métodos de envio responsáveis.",
    cta: "Leia Nossa Missão",
  },
  {
    title: "Time",
    body: "Somos um time de pessoas curiosas, apaixonadas, com grandes sonhos de um mundo mais feliz e saudável. Nossa missão é empoderar você para passar mais tempo na natureza.",
    cta: "Conheça Mais",
  },
];

export default function App() {
  const [idx, setIdx] = useState(0);
  const prev = () =>
    setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  return (
    <div
      className="overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", color: COAL }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg,#a8c8d8 0%,#87b5c8 30%,#c8d8b8 70%,#b5c8a0 100%)",
        }}
      >
        <img
          src={makeBanner}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40" />

        {/* Copy */}
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-xs font-medium tracking-widest uppercase mb-3 opacity-90">
            Qual o seu protetor solar glow favorito
          </p>
          <h1
            className="font-normal leading-tight mb-3"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(42px,7vw,80px)",
            }}
          >
            Sua beleza, suas regras
          </h1>
          {/*  <p className="text-sm font-light mb-7 opacity-95">
            Your fave sunscreen is back in stock!
          </p> */}
          <a
            href="/#products"
            className="inline-block text-white text-xs font-medium tracking-widest uppercase px-8 py-3 rounded transition-all duration-200 hover:-translate-y-px"
            style={{ background: TC }}
            onMouseEnter={(e) => (e.currentTarget.style.background = TC_L)}
            onMouseLeave={(e) => (e.currentTarget.style.background = TC)}
          >
            Ver Produtos
          </a>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="bg-white py-20 px-12" id="products">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {products.map((p) => (
            <div key={p.name} className="cursor-pointer">
              <img src={p.img} className="h-96 w-full object-cover" />

              <p
                className="text-sm font-semibold mb-1"
                style={{ fontFamily: "'Playfair Display',serif" }}
              >
                {p.name}
              </p>
              <p className="text-xs text-gray-400 mb-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section style={{ background: CREAM }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto px-12 py-20">
          {/* Left */}
          <div>
            <h2
              className="font-semibold leading-snug mb-6"
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(28px,4vw,42px)",
              }}
            >
              Feito com Plantas,
              <br />
              Apoiado pela Ciência,
              <br />
              Pronto para Aventura
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div
                className="row-span-2 rounded flex items-center justify-center text-4xl"
                style={{ background: "#e0d4c8", minHeight: 200 }}
              >
                🧴
              </div>
              <div
                className="rounded flex items-center justify-center text-4xl"
                style={{ background: "#d8e8d0", aspectRatio: "1" }}
              >
                🌿
              </div>
              <div
                className="rounded flex items-center justify-center text-4xl"
                style={{ background: "#e8d0c8", aspectRatio: "1" }}
              >
                ☀️
              </div>
            </div>
          </div>
          {/* Right */}
          <div>
            <p className="text-sm leading-loose text-gray-500 mb-6">
              De piqueniques no parque a fins de semana fora — fazemos produtos
              limpos e eficazes que acompanham todas as suas aventuras ao ar
              livre. E o melhor de tudo? Eles realmente funcionam.
            </p>
            <a
              href="#"
              className="text-xs font-medium tracking-widest uppercase pb-0.5 transition-opacity hover:opacity-60"
              style={{ color: TC, borderBottom: `1px solid ${TC}` }}
            >
              Comprar Produtos
            </a>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section
        className="relative py-32 px-12 text-center overflow-hidden"
        style={{ background: CREAM }}
      >
        {/* TOP WAVE */}
        <svg
          className="absolute top-0 left-0 w-full h-[120px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C180,100 360,0 540,60 C720,120 900,20 1080,70 C1260,120 1350,40 1440,60 L1440,120 L0,120 Z"
            fill={SAGE}
          />
        </svg>

        {/* SAGE BACKGROUND BAND */}
        <div
          className="absolute inset-0 top-[100px] bottom-[100px]"
          style={{ backgroundColor: SAGE }}
        />

        {/* BOTTOM WAVE */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[120px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C180,20 360,100 540,60 C720,20 900,100 1080,50 C1260,10 1350,80 1440,60 L1440,0 L0,0 Z"
            fill={SAGE}
          />
        </svg>

        {/* CONTENT */}
        <div className="relative z-10 py-10">
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-3xl opacity-70 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer"
          >
            <ChevronLeft size={32} />
          </button>

          <blockquote
            className="italic text-white max-w-xl mx-auto mb-4"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(18px,2.5vw,28px)",
            }}
          >
            {testimonials[idx].quote}
          </blockquote>

          <p className="text-xs font-medium tracking-widest uppercase text-white/80">
            {testimonials[idx].source}
          </p>

          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-3xl opacity-70 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </section>

      {/* ── Safety / Values ── */}
      <section style={{ background: CREAM }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto px-12 py-20">
          <img src={products_img} className="" />

          <div>
            <h2
              className="font-semibold text-2xl mb-8"
              style={{ fontFamily: "'Playfair Display',serif" }}
            >
              Feito com Segurança para as Pessoas
            </h2>
            {safetyItems.map((item, i) => (
              <div
                key={item.title}
                className={`pb-6 mb-6 ${i < safetyItems.length - 1 ? "border-b border-gray-300" : ""}`}
              >
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-2">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-500 mb-2">
                  {item.body}
                </p>
                <a
                  href="#"
                  className="text-xs font-medium tracking-widest uppercase pb-0.5"
                  style={{ borderBottom: `1px solid ${COAL}`, color: COAL }}
                >
                  {item.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Retail Banner ── */}
      <section
        className="relative text-center text-white px-12 py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#8b7355,#4a3828)" }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10">
          <h2
            className="font-semibold leading-snug mb-5"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(22px,4vw,38px)",
            }}
          >
            Sem tempo para esperar?
            <br />
            Encontre Makeup em mais de 750 lojas pelo Brasil!
          </h2>
          <a
            href="#"
            className="inline-block text-white text-xs font-medium tracking-widest uppercase border border-white px-7 py-3 rounded-sm transition-all duration-200 hover:bg-white hover:text-gray-900 mt-2"
          >
            Encontrar Loja
          </a>
        </div>
      </section>

      {/* ── Instagram ── */}
      <section className="bg-white py-20 px-12 text-center">
        <h2
          className="text-3xl font-normal mb-1"
          style={{ fontFamily: "'Playfair Display',serif" }}
        >
          Vamos nos encontrar
        </h2>
        <p className="text-sm text-gray-400 mb-1">
          Fazemos coisas legais no Instagram.
        </p>
        <a
          href="#"
          className="text-xs font-medium tracking-widest"
          style={{ color: TC }}
        >
          @Makeup
        </a>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-1.5 mt-8">
          {[
            { e: "https://picsum.photos/id/10/200", bg: "#e8d4c0" },
            { e: "https://picsum.photos/id/25/200", bg: "#c8dce8" },
            { e: "https://picsum.photos/id/50/200", bg: "#d8e8c8" },
            { e: "https://picsum.photos/id/78/200", bg: "#e8d8e0" },
            { e: "https://picsum.photos/id/42/200", bg: "#f0e4c8" },
          ].map((c, i) => (
            <img
              key={i}
              className="aspect-square rounded flex items-center justify-center text-3xl cursor-pointer hover:opacity-80 transition-opacity"
              style={{ background: c.bg }}
              src={c.e}
            ></img>
          ))}
        </div>
      </section>
    </div>
  );
}
