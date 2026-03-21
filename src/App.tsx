import { useState } from "react";
import { motion } from "motion/react";
import prod_1 from "./assets/prod_1.png";
import prod_2 from "./assets/prod_2.png";
import prod_3 from "./assets/prod_3.png";
import products_img from "./assets/products.jpg";
import makeBanner from "./assets/makeup.jpg";

import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    name: "Sunglow SPF 35",
    desc: "Protetor Solar Facial Iluminador",
    img: prod_1,
  },
  {
    name: "Sunglow SPF 35",
    desc: "Protetor Solar Facial Iluminador",
    img: prod_1,
  },
  {
    name: "Relief Potion",
    desc: "Remédio para Picadas de Inseto",
    img: prod_2,
  },
  {
    name: "Cloud Cover SPF 35",
    desc: "Protetor Solar Corporal",
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
    link: "/about",
  },
  {
    title: "Sustentabilidade",
    body: "Amamos este planeta tanto quanto você. Por isso somos dedicados a usar materiais eco-conscientes, embalagens pensadas e métodos de envio responsáveis.",
    cta: "Leia Nossa Missão",
    link: "/about",
  },
  {
    title: "Time",
    body: "Somos um time de pessoas curiosas, apaixonadas, com grandes sonhos de um mundo mais feliz e saudável. Nossa missão é empoderar você para passar mais tempo na natureza.",
    cta: "Conheça Mais",
    link: "/about",
  },
];

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Animate once when 20% of element is visible
const viewport = { once: true, amount: 0.2 };

export default function App() {
  const [idx, setIdx] = useState(0);
  const prev = () =>
    setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  return (
    <div className="overflow-x-hidden font-sans text-coal">
      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center overflow-hidden min-h-screen"
        style={{
          background:
            "linear-gradient(160deg,#a8c8d8 0%,#87b5c8 30%,#c8d8b8 70%,#b5c8a0 100%)",
        }}
      >
        <img
          src={makeBanner}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40" />

        <div className="relative z-10 text-center text-white px-6">
          <motion.p
            className="text-xs font-medium tracking-widest uppercase mb-3 opacity-90"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Qual o seu protetor solar glow favorito
          </motion.p>
          <motion.h1
            className="font-display font-normal leading-tight mb-3"
            style={{ fontSize: "clamp(42px,7vw,80px)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Sua beleza, suas regras
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <a
              href="/#products"
              className="inline-block text-white text-xs font-medium tracking-widest uppercase px-8 py-3 rounded bg-brand hover:bg-brand-hover hover:-translate-y-px transition-all duration-200"
            >
              Ver Produtos
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="bg-white py-20 px-12" id="products">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {products.map((p, i) => (
            <motion.div
              key={i}
              className="cursor-pointer"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
            >
              <img src={p.img} className="h-96 w-full object-cover" />
              <p className="text-sm font-semibold mb-1 font-display">
                {p.name}
              </p>
              <p className="text-xs text-gray-400 mb-2">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="bg-cream">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto px-12 py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2
              className="font-display font-semibold leading-snug mb-6"
              style={{ fontSize: "clamp(28px,4vw,42px)" }}
            >
              Natural na Essência,
              <br />
              Científico na Fórmula,
              <br />
              Perfeito para Você
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="row-span-2 rounded overflow-hidden">
                <img
                  src="https://picsum.photos/400/500?random=1"
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded overflow-hidden aspect-square">
                <img
                  src="https://picsum.photos/300/300?random=2"
                  alt="nature"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded overflow-hidden aspect-square">
                <img
                  src="https://picsum.photos/300/300?random=3"
                  alt="sun"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <p className="text-sm leading-loose text-gray-500 mb-6">
              De piqueniques no parque a fins de semana fora — fazemos produtos
              limpos e eficazes que acompanham todas as suas aventuras ao ar
              livre. E o melhor de tudo? Eles realmente funcionam.
            </p>
            <a
              href="https://wa.me/SEU_NUMERO_AQUI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium tracking-widest uppercase pb-0.5 transition-opacity hover:opacity-60 text-brand border-b border-brand"
            >
              Entrar em contato
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="relative py-32 px-12 text-center overflow-hidden bg-cream">
        <svg
          className="absolute top-0 left-0 w-full h-[120px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C180,100 360,0 540,60 C720,120 900,20 1080,70 C1260,120 1350,40 1440,60 L1440,120 L0,120 Z"
            className="fill-sage"
          />
        </svg>

        <div className="absolute inset-0 top-[100px] bottom-[100px] bg-sage" />

        <svg
          className="absolute bottom-0 left-0 w-full h-[120px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C180,20 360,100 540,60 C720,20 900,100 1080,50 C1260,10 1350,80 1440,60 L1440,0 L0,0 Z"
            className="fill-sage"
          />
        </svg>

        <div className="relative z-10 py-10">
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white opacity-70 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer"
          >
            <ChevronLeft size={32} />
          </button>

          {/* key prop re-triggers animation on slide change */}
          <motion.blockquote
            key={idx}
            className="font-display italic text-white max-w-xl mx-auto mb-4"
            style={{ fontSize: "clamp(18px,2.5vw,28px)" }}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4 }}
          >
            {testimonials[idx].quote}
          </motion.blockquote>

          <motion.p
            key={`src-${idx}`}
            className="text-xs font-medium tracking-widest uppercase text-white/80"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {testimonials[idx].source}
          </motion.p>

          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white opacity-70 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </section>

      {/* ── Safety / Values ── */}
      <section className="bg-cream">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto px-12 py-20">
          <motion.img
            src={products_img}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <h2 className="font-display font-semibold text-2xl mb-8">
              Feito com Segurança para as Pessoas
            </h2>
            {safetyItems.map((item, i) => (
              <motion.div
                key={item.title}
                className={`pb-6 mb-6 ${i < safetyItems.length - 1 ? "border-b border-gray-300" : ""}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-2">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-500 mb-2">
                  {item.body}
                </p>
                <a
                  href={item.link}
                  className="text-xs font-medium tracking-widest uppercase pb-0.5 border-b border-coal text-coal"
                >
                  {item.cta}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Retail Banner ── */}
      <section
        className="relative text-white px-12 py-8 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#8b7355,#4a3828)" }}
        id="shops"
      >
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-left"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2
              className="font-display font-semibold leading-snug mb-5"
              style={{ fontSize: "clamp(22px,4vw,38px)" }}
            >
              Sem tempo para esperar?
              <br />
              Encontre Makeup em mais de 750 lojas pelo Brasil!
            </h2>
          </motion.div>

          <motion.div
            className="w-full h-[300px] md:h-[400px] overflow-hidden shadow-lg"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps?q=São+Paulo&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* ── Instagram ── */}
      <section className="bg-white py-20 px-12 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="font-display text-3xl font-normal mb-1">
            Vamos nos encontrar
          </h2>
          <p className="text-sm text-gray-400 mb-1">
            Fazemos coisas legais no Instagram.
          </p>
          <a
            href="#"
            className="text-xs font-medium tracking-widest text-brand"
          >
            @Makeup
          </a>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-1.5 mt-8">
          {[
            { e: "https://picsum.photos/id/10/200", bg: "#e8d4c0" },
            { e: "https://picsum.photos/id/25/200", bg: "#c8dce8" },
            { e: "https://picsum.photos/id/50/200", bg: "#d8e8c8" },
            { e: "https://picsum.photos/id/78/200", bg: "#e8d8e0" },
            { e: "https://picsum.photos/id/42/200", bg: "#f0e4c8" },
          ].map((c, i) => (
            <motion.img
              key={i}
              className="aspect-square rounded cursor-pointer hover:opacity-80 transition-opacity"
              style={{ background: c.bg }}
              src={c.e}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
