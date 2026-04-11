import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Divider } from "./Divider";
import { Link, useLocation } from "react-router-dom";
import logo from "/logoPng.png";
import dragon from "../assets/dragon_decoration.svg";

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const footerRef = useRef(null);
  const inView = useInView(footerRef, { once: true, margin: "-60px" });

  return (
    <div className="bg-white relative">
      {isHome && (
        <img
          src={dragon}
          alt="Dragon decoration"
          className="absolute -top-40 md:-top-56 left-0 w-52 md:w-68 pointer-events-none select-none"
        />
      )}

      <Divider flip />

      <footer
        className="bg-black border-t border-white/10 py-16 px-8"
        ref={footerRef}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/">
                <img
                  src={logo}
                  alt="Tellar Heaven"
                  className="h-24 w-auto object-contain mb-4"
                />
              </Link>
              <p className="text-white/40 text-xs font-body leading-relaxed max-w-xs mt-4">
                "Just an artist looking to become better and better and make my
                imagination come true"
              </p>
            </div>

            {/* Nav links */}
            <div>
              <p className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-body mb-6">
                Navigate
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  { to: "/#works", label: "Latest Works" },
                  { to: "/stories", label: "Stories" },
                  { to: "/gallery", label: "Gallery" },
                  { to: "/#contact", label: "Contact" },
                ].map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: 0.2 + i * 0.07,
                    }}
                  >
                    <Link
                      to={item.to}
                      className="text-white/50 text-xs tracking-[0.2em] uppercase font-body hover:text-yellow-400 transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <p className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-body mb-6">
                Social
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  {
                    href: "https://www.instagram.com/tellarheaven/",
                    label: "Instagram",
                  },
                  { href: "https://x.com/tellarheaven", label: "X (Twitter)" },
                  {
                    href: "https://www.deviantart.com/tellarheaven",
                    label: "Deviantart",
                  },
                ].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: 0.3 + i * 0.07,
                    }}
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 text-xs tracking-[0.2em] uppercase font-body hover:text-yellow-400 transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Bottom */}
          <motion.div
            className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 w-full"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          >
            <p className="text-white/20 text-xs font-body tracking-[0.2em] ">
              © {new Date().getFullYear()} TELLARHEAVEN. All rights reserved.
            </p>
            <p className="text-white/20 text-xs font-body tracking-[0.2em] ">
              Developed by{" "}
              <a
                href="https://next-frontend-portifolio.vercel.app/"
                target="blank"
                className="underline hover:text-yellow-400 transition-colors duration-300"
              >
                Lucas Figueredo
              </a>
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
