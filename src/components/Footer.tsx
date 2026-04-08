import { Divider } from "./Divider";
import { Link, useLocation } from "react-router-dom";
import logo from "/logoPng.png";
import dragon from "../assets/dragon_decoration.svg";

export default function Footer() {
  const location = useLocation(); // get current route
  const isHome = location.pathname === "/"; // only show on home

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

      <footer className="bg-black border-t border-white/10 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
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
                <li>
                  <Link
                    to="/#works"
                    className="text-white/50 text-xs tracking-[0.2em] uppercase font-body hover:text-yellow-400 transition-colors duration-300"
                  >
                    Latest Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/stories"
                    className="text-white/50 text-xs tracking-[0.2em] uppercase font-body hover:text-yellow-400 transition-colors duration-300"
                  >
                    Stories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className="text-white/50 text-xs tracking-[0.2em] uppercase font-body hover:text-yellow-400 transition-colors duration-300"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#contact"
                    className="text-white/50 text-xs tracking-[0.2em] uppercase font-body hover:text-yellow-400 transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <p className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-body mb-6">
                Social
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="https://www.instagram.com/tellarheaven/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 text-xs tracking-[0.2em] uppercase font-body hover:text-yellow-400 transition-colors duration-300"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/tellarheaven"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 text-xs tracking-[0.2em] uppercase font-body hover:text-yellow-400 transition-colors duration-300"
                  >
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.deviantart.com/tellarheaven"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 text-xs tracking-[0.2em] uppercase font-body hover:text-yellow-400 transition-colors duration-300"
                  >
                    Deviantart
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            <p className="text-white/20 text-xs font-body tracking-[0.2em] mx-auto">
              © {new Date().getFullYear()} TELLARHEAVEN. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
