import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div>
      <main className="relative">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
