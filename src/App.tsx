import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import LatestWorks from "./components/LatestWorks";
import Stories from "./components/Stories";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import { getLatestImageFiles, getRandomImageFiles } from "./lib/sanity";
import type { ImageFile } from "./types/types";

export default function App() {
  const [imageFiles, setLatestFiles] = useState<ImageFile[]>([]);
  const [randomFiles, setRandomFiles] = useState<ImageFile[]>([]);

  useEffect(() => {
    Promise.all([getLatestImageFiles(), getRandomImageFiles()]).then(
      ([latest, random]) => {
        setLatestFiles(latest);
        setRandomFiles(random);
      },
    );
  }, []);

  return (
    <div className="font-body bg-black text-white overflow-x-hidden">
      <Hero />
      <LatestWorks works={imageFiles.slice(-5)} />
      <Stories />
      <Gallery imageFiles={randomFiles} />
      <Contact />
    </div>
  );
}
