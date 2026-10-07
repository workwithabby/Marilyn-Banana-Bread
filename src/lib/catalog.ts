export type CatalogItem = {
  name: string;
  price: string;
  description: string;
  badge?: string;
};

export const catalog: CatalogItem[] = [
  {
    name: "Original",
    price: "150",
    description:
      "Soft, moist, and naturally sweet banana bread, freshly baked with ripe bananas.",
  },
  {
    name: "Chocolate Chips",
    price: "170",
    description:
      "Classic homemade banana bread with sweet chocolate chips baked into every bite.",
  },
  {
    name: "Chocolate Chips + Cashews",
    price: "190",
    description:
      "Our delicious banana bread made with rich chocolate chips and crunchy cashews.",
    badge: "Best Seller",
  },
  {
    name: "Walnut",
    price: "190",
    description:
      "Loaded with crunchy walnuts inside with even more walnuts on top for that extra nutty crunch.",
  },
  {
    name: "Double Chocolate Chips",
    price: "200",
    description:
      "Loaded with chocolate chips inside and topped with even more chocolate chips.",
  },
  {
    name: "Biscoff",
    price: "250",
    description:
      "Banana bread filled with Biscoff spread, topped with Biscoff drizzle and crushed Biscoff biscuits.",
  },
];
