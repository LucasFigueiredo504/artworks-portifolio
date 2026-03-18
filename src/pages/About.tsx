import Team from "../assets/Team.jpg";

const TC = "#8e1f27";
const CREAM = "#f5efe7";
const SAGE = "#617891";
const COAL = "#1d2535";

export default function About() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color: COAL,
        background: CREAM,
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* Navbar simples */}
      <nav className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-8 md:px-12 py-6 bg-gradient-to-b from-black/40 to-transparent">
        <a
          href="/"
          className="text-white text-2xl tracking-wide"
          style={{ fontFamily: "'Playfair Display',serif" }}
        >
          Makeup
        </a>
      </nav>

      {/* Hero About */}
      <section className="relative flex items-center justify-center px-6 md:px-12 text-center text-white min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#87b5c8] via-[#b5c8a0] to-[#c8d8b8]" />

        <img
          src={Team}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-xs md:text-sm font-medium tracking-widest uppercase mb-4 opacity-90">
            Conheça a Makeup
          </p>

          <h1
            className="font-normal leading-tight mb-6"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(36px,6vw,64px)",
            }}
          >
            Feito com Plantas. Pronto para a Vida Real.
          </h1>

          <p className="text-base md:text-lg max-w-2xl mx-auto opacity-90 leading-relaxed">
            Somos uma marca criada para quem vive intensamente a natureza — sem
            abrir mão da proteção, da beleza e da consciência.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Título */}
        <h2
          className="font-semibold leading-snug mb-12"
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(32px,5vw,48px)",
          }}
        >
          Por que a Makeup existe?
        </h2>

        {/* Conteúdo */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Imagem (esquerda) */}
          <div className="overflow-hidden shadow-2xl">
            <div
              className="aspect-[4/3] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800')",
              }}
            />
          </div>

          {/* Texto (direita) */}
          <div>
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
          </div>
        </div>
      </section>

      {/* Valores */}
      <section
        className="relative py-32 px-6 md:px-12 overflow-hidden"
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

        {/* SAGE BAND */}
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
        <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
          <h2
            className="text-3xl md:text-4xl font-semibold mb-12"
            style={{ fontFamily: "'Playfair Display',serif" }}
          >
            Nossos Pilares
          </h2>

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
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/15 backdrop-blur-sm rounded-xl p-8 border border-white/10"
              >
                <h3
                  className="text-xl font-medium mb-4"
                  style={{ fontFamily: "'Playfair Display',serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-white/90 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action final */}
      <section className="py-20 px-6 text-center" style={{ background: CREAM }}>
        <h2
          className="text-3xl md:text-4xl font-semibold mb-6"
          style={{ fontFamily: "'Playfair Display',serif" }}
        >
          Faça parte da mudança
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Escolha produtos que cuidam de você e do planeta ao mesmo tempo.
        </p>
        <a
          href="/"
          className="inline-block bg-[#8e1f27] text-white text-sm font-medium tracking-widest uppercase px-10 py-4 rounded hover:bg-[#6F4D38] transition-colors"
        >
          Ver Produtos
        </a>
      </section>
    </div>
  );
}
