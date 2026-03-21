export interface Post {
  slug: string;
  title: string;
  date: string;
  image?: { asset: { _ref: string } };
  excerpt: string;
  body: any[];
}
