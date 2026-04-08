export interface Post {
  title: string;
  date: string;
  image?: { asset: { _ref: string } };
  excerpt: string;
  body: any[];
}

export type Story = {
  slug: string;
  title: string;
  description: string;
  banner: string;
  last_updated_at: string;
  sections: {
    type: "text-image" | "text";
    text: string;
    image: ImageFile;
    alignment: "left" | "right";
  }[];
};
export type ImageFile = {
  title: string;
  slug: string;
  description: string;
  image: string;
  category: "Original character" | "Fanart" | "Landscape";
};
