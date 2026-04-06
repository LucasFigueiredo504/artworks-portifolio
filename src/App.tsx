import Header from "./components/Header";
import Hero from "./components/Hero";
import LatestWorks from "./components/LatestWroks";
import Stories from "./components/Stories";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="font-body bg-black text-white overflow-x-hidden">
      <Header />
      <Hero />
      <LatestWorks />
      <Stories />
      <Gallery />
      <Contact />
    </div>
  );
}
