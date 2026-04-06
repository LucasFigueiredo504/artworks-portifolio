export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-white text-4xl mb-4 leading-none">
              TELLAR
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
              >
                HEAVEN
              </span>
            </h3>
            <p className="text-white/40 text-xs font-body leading-relaxed max-w-xs mt-4">
              A visual art studio dedicated to capturing the unrepeatable. Based
              in New York, working everywhere.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-body mb-6">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {["Works", "Stories", "Gallery", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-white/50 text-xs tracking-[0.2em] uppercase font-body hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-body mb-6">
              Social
            </p>
            <ul className="flex flex-col gap-3">
              {["Instagram", "Behance", "X (Twitter)", "LinkedIn"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/50 text-xs tracking-[0.2em] uppercase font-body hover:text-yellow-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs font-body tracking-[0.2em]">
            © {new Date().getFullYear()} TELLARHEAVEN. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <p className="text-white/20 text-xs font-body tracking-[0.2em]">
              Available for commissions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
