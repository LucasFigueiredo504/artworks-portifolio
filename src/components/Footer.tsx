import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, amount: 0.3 };

export default function Footer() {
  const links = [
    { id: "Sobre", name: "Sobre", link: "/about" },
    { id: "Blog", name: "Blog", link: "/blog" },
    { id: "Lojas", name: "Lojas", link: "/#shops" },
  ];

  return (
    <div>
      <footer className="grid grid-cols-1 md:grid-cols-2 gap-12 px-12 pt-16 pb-10 bg-coal text-white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="font-display font-semibold leading-none mb-4 text-brand text-[52px]">
            M
          </p>
          <p className="font-display italic text-sm leading-relaxed opacity-70">
            Natural na Essência,
            <br />
            Científico na Fórmula,
            <br />
            Perfeito para Você.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
        >
          <h4 className="text-xs font-medium tracking-widest uppercase mb-4 opacity-50">
            Venha conversar!
          </h4>
          <ul className="flex flex-col gap-2.5">
            {links.map((item, i) => (
              <motion.li
                key={item.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.08,
                  ease: "easeOut",
                }}
              >
                <a
                  href={item.link}
                  className="text-sm text-white/70 hover:text-white transition-colors no-underline"
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </footer>

      <motion.div
        className="text-center py-4 px-12 bg-coal border-t border-white/[0.08]"
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-xs tracking-wide text-white/30">
          © {new Date().getFullYear()} Makeup. Todos os direitos reservados. ·
          Política de Privacidade · Desenvolvido por{" "}
          <a
            href="https://next-frontend-portifolio.vercel.app/"
            className="underline"
          >
            Lucas Figueiredo
          </a>
        </p>
      </motion.div>
    </div>
  );
}
