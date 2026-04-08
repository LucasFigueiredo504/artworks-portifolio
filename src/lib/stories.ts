import type { Story } from "../types/types";
import { imageFiles } from "./files";

export const stories: Story[] = [
  {
    slug: "chaos-rush",
    title: "Chaos rush",
    description:
      "After the tellarrebels incident, a group of heroes must gather as much power as dfast as possible to try to stop a catastrophy from happening in the galaxy...",
    banner: "image",
    last_updated_at: "2026-04-08T00:00:00-03:00",
    sections: [
      {
        type: "text",
        text: "A semi god its chosen once in a millennium by it, Artemia is now the chosen one and after she was killed by Fuwen, she is now being reconstructed by the tree",
        image: imageFiles[0],
        alignment: "left",
      },
    ],
  },
  {
    slug: "tellar-rebels",
    title: "Tellar Rebels",
    description:
      "Four powerfull wariors join forces to take down the ruler of the galaxy and his army. But not everything works like intended...",
    banner: imageFiles[1].image,
    last_updated_at: "2026-04-08T00:00:00-03:00",
    sections: [
      {
        type: "text",
        text: "After betraying his friends, Fuwen reach his goals by becoming the new ruler of Darkness.",
        image: imageFiles[1],
        alignment: "right",
      },
    ],
  },
];
