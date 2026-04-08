import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import divider from "../assets/divider.svg";
import logo from "/logoPng.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;

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
  }, [isHome]);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out overflow-hidden"
        style={{
          transform: isHome
            ? visible
              ? "translateY(0)"
              : "translateY(-110%)"
            : "translateY(0)",
        }}
      >
        {/* Bar */}
        <div className="relative flex items-center justify-between px-8 pt-5 pb-2">
          {/* Background (FIXED) */}
          <div
            className="absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none"
            style={{
              opacity: isHome ? (atTop ? 0 : 1) : 1,
            }}
          />

          {/* Logo */}
          <Link to="/" className="relative">
            <img
              src={logo}
              alt="Tellar Heaven"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Nav */}
          <nav className="relative hidden md:flex gap-10 text-xs tracking-[0.25em] uppercase text-white">
            <a
              href="/#latest"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Latest Works
            </a>

            <a
              href="/stories"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Stories
            </a>

            <Link
              to="/gallery"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Gallery
            </Link>

            <a
              href="/#contact"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Contact
            </a>
          </nav>

          {/* Mobile button */}
          <button
            className="relative md:hidden flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className="block w-6 h-px bg-white" />
            <span className="block w-4 h-px bg-white" />
          </button>
        </div>

        {/* Divider */}
        <div
          className="w-full transition-opacity duration-500 pointer-events-none"
          style={{
            height: "80px",
            margin: "-35px 0",
            backgroundImage: `url(${divider})`,
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            backgroundPosition: "center",
            filter: "brightness(0)",
            opacity: isHome ? (atTop ? 0 : 1) : 1,
          }}
        />
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-5 right-8 text-white text-2xl"
            onClick={() => setOpen(false)}
          >
            ×
          </button>

          <a
            href="/#works"
            onClick={() => setOpen(false)}
            className="font-display text-4xl text-white hover:text-yellow-400 transition-colors"
          >
            Works
          </a>

          <a
            href="/#stories"
            onClick={() => setOpen(false)}
            className="font-display text-4xl text-white hover:text-yellow-400 transition-colors"
          >
            Stories
          </a>

          <Link
            to="/gallery"
            onClick={() => setOpen(false)}
            className="font-display text-4xl text-white hover:text-yellow-400 transition-colors"
          >
            Gallery
          </Link>

          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="font-display text-4xl text-white hover:text-yellow-400 transition-colors"
          >
            Contact
          </a>
        </div>
      )}
    </>
  );
}
