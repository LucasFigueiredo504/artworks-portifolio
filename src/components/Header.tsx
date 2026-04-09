import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "motion/react";
import divider from "../assets/divider.svg";
import logo from "/logoPng.png";

const navItems = [
  { label: "Latest Works", href: "/#latest", type: "a" },
  { label: "Stories", href: "/stories", type: "a" },
  { label: "Gallery", href: "/gallery", type: "link" },
  { label: "Contact", href: "/#contact", type: "a" },
];

const mobileNavItems = [
  { label: "Works", href: "/#works", type: "a" },
  { label: "Stories", href: "/#stories", type: "a" },
  { label: "Gallery", href: "/gallery", type: "link" },
  { label: "Contact", href: "/#contact", type: "a" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const location = useLocation();
  const isHome = location.pathname === "/";

  const isActive = (href: string) => {
    const path = href.startsWith("/#") ? null : href.split("#")[0];
    return path !== null && location.pathname === path;
  };

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const current = window.scrollY;
      if (current < lastScrollY.current) setVisible(true);
      else if (current > 80) setVisible(false);
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
        <div className="relative flex items-center justify-between px-8 pt-5 pb-2">
          <div
            className="absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none"
            style={{ opacity: isHome ? (atTop ? 0 : 1) : 1 }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link to="/" className="relative">
              <img
                src={logo}
                alt="Tellar Heaven"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="relative hidden md:flex gap-10 text-xs tracking-[0.25em] uppercase text-white">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 0.1 + i * 0.08,
                }}
                className="relative pb-1"
              >
                {item.type === "link" ? (
                  <Link
                    to={item.href}
                    className="hover:text-yellow-400 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="hover:text-yellow-400 transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                )}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-yellow-400"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </motion.div>
            ))}
          </nav>

          {/* Mobile button */}
          <motion.button
            className="relative md:hidden flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <span className="block w-6 h-px bg-white" />
            <span className="block w-4 h-px bg-white" />
          </motion.button>
        </div>

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

          {mobileNavItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.07 }}
              className="relative"
            >
              {item.type === "link" ? (
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl text-white hover:text-yellow-400 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl text-white hover:text-yellow-400 transition-colors"
                >
                  {item.label}
                </a>
              )}
              {isActive(item.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-yellow-400" />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
