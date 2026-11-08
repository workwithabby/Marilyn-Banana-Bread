import type { StaticImageData } from "next/image";

import assortedThumb from "@/assets/Assorted Chocolate Chip Muffins/assortedccm-thumbnail.jpg";
import assorted01 from "@/assets/Assorted Chocolate Chip Muffins/assortedccm-01.jpg";
import assorted02 from "@/assets/Assorted Chocolate Chip Muffins/assortedccm-02.jpg";
import assorted03 from "@/assets/Assorted Chocolate Chip Muffins/assortedccm-03.jpg";

export type MuffinFlavor = {
  name: string;
  price: string;
  description: string;
};

export type Muffin = MuffinFlavor & {
  unit: string;
  badge?: string;
  alt: string;
  thumbnail: StaticImageData;
  samples: StaticImageData[];
};

export const muffinFlavors: MuffinFlavor[] = [
  {
    name: "Chocolate Chips Almond Banana Muffins",
    price: "140",
    description: "Banana muffins loaded with chocolate chips and crunchy almonds.",
  },
  {
    name: "Assorted Chocolate Chip Muffins",
    price: "150",
    description:
      "A delightful combination of different flavors in one box.",
  },
  {
    name: "Banana Muffins with Biscoff Drizzle",
    price: "160",
    description: "Soft banana muffins topped with chocolate chips and almonds, finished with a sweet Biscoff drizzle.",
  },
  {
    name: "Double Chocolate Chips Banana Muffins",
    price: "150",
    description: "Extra chocolatey banana muffins topped with chocolate chips.",
  },
];

const featuredName = "Assorted Chocolate Chip Muffins";

const featured = muffinFlavors.find((m) => m.name === featuredName);

if (!featured) throw new Error(`Missing muffin flavor: ${featuredName}`);

export const featuredMuffin: Muffin = {
  ...featured,
  unit: "per box of 4",
  badge: "New",
  alt: "Assorted chocolate chip banana muffins",
  thumbnail: assortedThumb,
  samples: [assortedThumb, assorted01, assorted02, assorted03],
};

const otherMuffinOrder = [
  "Chocolate Chips Almond Banana Muffins",
  "Double Chocolate Chips Banana Muffins",
  "Banana Muffins with Biscoff Drizzle",
];

export const otherMuffinFlavors = otherMuffinOrder.map((name) => {
  const found = muffinFlavors.find((m) => m.name === name);
  if (!found) throw new Error(`Missing muffin flavor: ${name}`);
  return found;
});
