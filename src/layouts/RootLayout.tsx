import { Outlet, NavLink } from "react-router-dom";
import Footer from "../components/Footer";

export default function RootLayout() {
  const baseClass = "hover:text-white transition-colors relative";

  const activeClass =
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-white";

  return (
    <div>
      <main className="relative">
        {/* Navbar */}
        <nav className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-12 py-5">
          <NavLink
            to="/"
            className="text-white text-2xl tracking-wide"
            style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400 }}
          >
            Makeup
          </NavLink>

          <div className="hidden md:flex gap-7 text-xs font-medium tracking-widest uppercase text-white/90">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ""}`
              }
            >
              Sobre nós
            </NavLink>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ""}`
              }
            >
              Blog
            </NavLink>
          </div>
        </nav>

        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
