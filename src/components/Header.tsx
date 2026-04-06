import { useState, useEffect, useRef } from "react";
import divider from "../assets/divider.svg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current < lastScrollY.current) {
        setVisible(true);
      } else if (current > 80) {
        setVisible(false);
      }

      setAtTop(current < 80);
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out overflow-hidden"
        style={{ transform: visible ? "translateY(0)" : "translateY(-110%)" }}
      >
        {/* Bar — bg fades at top, text/nav always visible */}
        <div className="relative flex items-center justify-between px-8 pt-5 pb-2">
          {/* Black bg that fades */}
          <div
            className="absolute inset-0 bg-black transition-opacity duration-500"
            style={{ opacity: atTop ? 0 : 1 }}
          />

          {/* Content always on top */}
          <span className="relative font-display text-sm tracking-[0.3em] uppercase text-white">
            TH
          </span>
          <nav className="relative hidden md:flex gap-10 text-xs tracking-[0.25em] uppercase text-white">
            {["Works", "Stories", "Gallery", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            className="relative md:hidden flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className="block w-6 h-px bg-white" />
            <span className="block w-4 h-px bg-white" />
          </button>
        </div>

        {/* SVG divider — fades with bg */}
        <div
          className="w-full transition-opacity duration-500"
          style={{
            height: "80px",
            margin: "-35px 0",
            backgroundImage: `url(${divider})`,
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            backgroundPosition: "center",
            filter: "brightness(0)",
            opacity: atTop ? 0 : 1,
          }}
        />
      </div>

      {/* Mobile fullscreen menu */}
      {open && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-5 right-8 text-white text-2xl"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          {["Works", "Stories", "Gallery", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-display text-4xl text-white hover:text-yellow-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
