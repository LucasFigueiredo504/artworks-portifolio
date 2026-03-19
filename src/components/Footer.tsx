export default function Footer() {
  const TC = "#8e1f27";
  const COAL = "#1d2535";

  const links = [
    {
      id: "Sobre",
      name: "Sobre",
      link: "/about",
    },
    { id: "Blog", name: "Blog", link: "/blog" },
    { id: "Lojas", name: "Lojas", link: "/#shops" },
  ];

  return (
    <div>
      <footer
        className="grid grid-cols-1 md:grid-cols-2 gap-12 px-12 pt-16 pb-10"
        style={{ background: COAL, color: "white" }}
      >
        <div>
          <p
            className="font-semibold leading-none mb-4"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 52,
              color: TC,
            }}
          >
            M
          </p>
          <p
            className="italic text-sm leading-relaxed opacity-70"
            style={{ fontFamily: "'Playfair Display',serif" }}
          >
            Natural na Essência,
            <br />
            Científico na Fórmula,
            <br />
            Perfeito para Você.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-widest uppercase mb-4 opacity-50">
            Venha conversar!
          </h4>
          <ul className="flex flex-col gap-2.5">
            {links.map((item) => (
              <li key={item.id}>
                <a
                  href={item.link}
                  className="text-sm text-white/70 hover:text-white transition-colors no-underline"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
      <div
        className="text-center py-4 px-12"
        style={{
          background: COAL,
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
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
      </div>
    </div>
  );
}
