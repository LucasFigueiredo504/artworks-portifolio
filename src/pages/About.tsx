import { motion } from "motion/react";
import Team from "../assets/Team.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const viewport = { once: true, amount: 0.2 };

export default function About() {
  return (
    <div className="min-h-screen overflow-x-hidden font-sans text-coal bg-cream">
      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center px-6 md:px-12 text-center text-white min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#87b5c8] via-[#b5c8a0] to-[#c8d8b8]" />
        <img
          src={Team}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.p
            className="text-xs md:text-sm font-medium tracking-widest uppercase mb-4 opacity-90"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Conheça a Makeup
          </motion.p>
          <motion.h1
            className="font-display font-normal leading-tight mb-6"
            style={{ fontSize: "clamp(36px,6vw,64px)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4 }}
          >
            Feito com Plantas. Pronto para a Vida Real.
          </motion.h1>
          <motion.p
            className="text-base md:text-lg max-w-2xl mx-auto opacity-90 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.6 }}
          >
            Somos uma marca criada para quem vive intensamente a natureza — sem
            abrir mão da proteção, da beleza e da consciência.
          </motion.p>
        </div>
      </section>

      {/* ── Nossa História ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.h2
          className="font-display font-semibold leading-snug mb-12"
          style={{ fontSize: "clamp(32px,5vw,48px)" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Por que a Makeup existe?
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="overflow-hidden shadow-2xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div
              className="aspect-[4/3] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800')",
              }}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
          >
            <p className="text-gray-700 leading-loose mb-6">
              Tudo começou com uma simples pergunta: por que os produtos que
              usamos na cidade não acompanham a gente quando saímos para viver
              de verdade? Montanhas, praias, trilhas, acampamentos... merecemos
              proteção solar eficaz, ingredientes honestos e embalagens que não
              agridem o planeta.
            </p>
            <p className="text-gray-700 leading-loose">
              A Makeup nasceu dessa vontade: criar fórmulas limpas,
              cientificamente comprovadas e feitas para a vida real — sem
              greenwashing, sem promessas vazias.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="relative py-32 px-6 md:px-12 overflow-hidden bg-cream">
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

        <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-semibold mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Nossos Pilares
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Clean & Eficaz",
                desc: "Ingredientes de origem responsável, fórmulas testadas e resultados que você sente na pele.",
              },
              {
                title: "Planeta em Primeiro",
                desc: "Embalagens recicláveis, envio com compensação de carbono e fornecedores que respeitam a natureza.",
              },
              {
                title: "Feito para Aventura",
                desc: "Produtos resistentes ao suor, à água e ao tempo — porque a beleza não pode parar quando a vida acontece.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white/15 backdrop-blur-sm rounded-xl p-8 border border-white/10"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{
                  duration: 0.55,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
              >
                <h3 className="font-display text-xl font-medium mb-4">
                  {item.title}
                </h3>
                <p className="text-white/90 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 text-center bg-cream">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
            Faça parte da mudança
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Escolha produtos que cuidam de você e do planeta ao mesmo tempo.
          </p>
        </motion.div>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="/#products"
            className="inline-block bg-brand text-white text-sm font-medium tracking-widest uppercase px-10 py-4 rounded hover:bg-brand-hover hover:-translate-y-px transition-all duration-200"
          >
            Ver Produtos
          </a>
        </motion.div>
      </section>
    </div>
  );
}
