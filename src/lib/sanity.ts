import { createClient } from "@sanity/client";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import type { ImageFile, Story } from "../types/types";

export const client = createClient({
  projectId: import.meta.env.VITE_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

//
// ========================
// IMAGE FILE QUERIES
// ========================
//

export async function getImageFiles(): Promise<ImageFile[]> {
  return client.fetch(`
    *[_type == "imageFile"] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      description,
      image {
        asset->
      },
      "category": category->title
    }
  `);
}

export async function getImageFileBySlug(slug: string): Promise<ImageFile> {
  return client.fetch(
    `*[_type == "imageFile" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      description,
      image {
        asset->
      },
      "category": category->title
    }`,
    { slug },
  );
}

export async function getLatestImageFiles(): Promise<ImageFile[]> {
  return client.fetch(`
   *[_type == "imageFile" && (dontDisplayInLatest != true)]
    | order(_createdAt desc) [0..4] {
      title,
      "slug": slug.current,
      description,
      image {
        asset->
      },
      "category": category->title
    }
  `);
}

export async function getRandomImageFiles(): Promise<ImageFile[]> {
  const files: ImageFile[] = await client.fetch(`
    *[_type == "imageFile"] [0..19] {
      title,
      "slug": slug.current,
      description,
      image {
        asset->
      },
      "category": category->title
    }
  `);

  return files.sort(() => Math.random() - 0.5).slice(0, 5);
}

export async function getStories(): Promise<Story[]> {
  return client.fetch(`
    *[_type == "story"] | order(last_updated_at desc) {
      title,
      "slug": slug.current,
      description,

      banner->{
        title,
        "slug": slug.current,
        description,
        image {
          asset->
        }
      },

      last_updated_at,

      sections[] {
        type,
        text,
        alignment,
        image->{
          title,
          "slug": slug.current,
          description,
          image {
            asset->
          }
        }
      }
    }
  `);
}

export async function getStoryBySlug(slug: string): Promise<Story> {
  return client.fetch(
    `*[_type == "story" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      description,

      banner->{
        title,
        "slug": slug.current,
        description,
        image {
          asset->
        }
      },

      last_updated_at,

      sections[] {
        type,
        text,
        alignment,
        image->{
          title,
          "slug": slug.current,
          description,
          image {
            asset->
          }
        }
      }
    }`,
    { slug },
  );
}
