import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";
import { Banana, Cookie, Nut } from "lucide-react";
import { catalog, type CatalogItem } from "./catalog";

import plainThumb from "@/assets/Plain Banana Bread/plain-thumbnail.jpg";
import plain01 from "@/assets/Plain Banana Bread/plain-01.jpg";
import plain02 from "@/assets/Plain Banana Bread/plain-02.jpg";
import chipsThumb from "@/assets/Chocolate Chips/chocochips-thumbnail.jpg";
import chips01 from "@/assets/Chocolate Chips/chocochips-01.jpg";
import chips02 from "@/assets/Chocolate Chips/chocochips-02.jpg";
import cashewsThumb from "@/assets/Chocolate Chips and Cashews/chococashews-thumbnail.jpg";
import cashews01 from "@/assets/Chocolate Chips and Cashews/chococashews-01.jpg";
import cashews02 from "@/assets/Chocolate Chips and Cashews/chococashews-02.jpg";
import doubleChocoThumb from "@/assets/Double Chocolate Chips/doublechoco-thumbnail.jpg";
import doubleChoco01 from "@/assets/Double Chocolate Chips/doublechoco-01.jpg";
import doubleChoco02 from "@/assets/Double Chocolate Chips/doublechoco-02.jpg";
import doubleChoco03 from "@/assets/Double Chocolate Chips/doublechoco-03.jpg";
import biscoffThumb from "@/assets/Biscoff/biscoff-thumbnail.jpg";
import biscoff01 from "@/assets/Biscoff/biscoff-01.jpg";
import biscoff02 from "@/assets/Biscoff/biscoff-02.jpg";

export type Product = CatalogItem & {
  icon: LucideIcon;
  alt: string;
  thumbnail: StaticImageData;
  samples: StaticImageData[];
};

const item = (name: string): CatalogItem => {
  const found = catalog.find((c) => c.name === name);
  if (!found) throw new Error(`Missing catalog item: ${name}`);
  return found;
};

export const products: Product[] = [
  {
    ...item("Plain Banana Bread"),
    icon: Banana,
    alt: "Slices of plain banana bread",
    thumbnail: plainThumb,
    samples: [plainThumb, plain01, plain02],
  },
  {
    ...item("Chocolate Chips"),
    icon: Cookie,
    alt: "Banana bread studded with chocolate chips",
    thumbnail: chipsThumb,
    samples: [chipsThumb, chips01, chips02],
  },
  {
    ...item("Chocolate Chips + Cashews"),
    icon: Nut,
    alt: "Banana bread with chocolate chips and cashews",
    thumbnail: cashewsThumb,
    samples: [cashewsThumb, cashews01, cashews02],
  },
  {
    ...item("Double Chocolate Chips"),
    icon: Cookie,
    alt: "Banana bread loaded with double chocolate chips",
    thumbnail: doubleChocoThumb,
    samples: [doubleChocoThumb, doubleChoco01, doubleChoco02, doubleChoco03],
  },
  {
    ...item("Biscoff"),
    icon: Cookie,
    alt: "Banana bread drizzled with Biscoff spread",
    thumbnail: biscoffThumb,
    samples: [biscoffThumb, biscoff01, biscoff02],
  },
];
