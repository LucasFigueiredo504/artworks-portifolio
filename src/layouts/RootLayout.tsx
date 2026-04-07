import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <div>
      <Header />
      <main className="relative">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
