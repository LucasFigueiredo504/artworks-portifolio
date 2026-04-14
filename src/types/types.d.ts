import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type ImageFile = {
  title: string;
  slug: string;
  description: string;
  image: SanityImageSource;
  category: string; // resolved to title string via GROQ ->
};

export type Section = {
  type: "text-image" | "text";
  text: string;
  image?: SanityImageSource;
  alignment?: "left" | "right";
};

export type Story = {
  slug: string;
  title: string;
  description: string;
  banner: SanityImageSource;
  last_updated_at: string;
  sections: Section[];
};

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export {};
