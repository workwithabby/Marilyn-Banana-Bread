import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

type Product = {
  emoji: string;
  name: string;
  price: string;
  description: string;
};

const products: Product[] = [
  {
    emoji: "🍌",
    name: "Plain Banana Bread",
    price: "140",
    description:
      "Soft, moist, and naturally sweet banana bread, freshly baked with ripe bananas.",
  },
  {
    emoji: "🍫",
    name: "Chocolate Chips",
    price: "160",
    description:
      "Classic homemade banana bread with sweet chocolate chips baked into every bite.",
  },
  {
    emoji: "🍫🥜",
    name: "Chocolate Chips + Cashews",
    price: "180",
    description:
      "Our delicious banana bread made with rich chocolate chips and crunchy cashews.",
  },
];

export default function Menu() {
  return (
    <section id="menu" className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-green-bright">
            The Menu
          </p>
          <h2 className="font-display text-3xl leading-tight text-green-strong sm:text-4xl">
            Our Banana Bread
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.name}
              className="group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-surface shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-cream/70">
                <span className="text-5xl" aria-hidden="true">
                  {p.emoji}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg leading-snug text-green-strong sm:text-xl">
                    {p.name}
                  </h3>
                  <PriceTag amount={p.price} />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brown">
                  {p.description}
                </p>
                <a
                  href={SITE.facebookUrl}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-green px-4 py-2.5 text-sm font-semibold text-cream-ink transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  Order Now
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceTag({ amount }: { amount: string }) {
  return (
    <span className="flex shrink-0 items-baseline gap-0.5">
      <span className="text-xs font-semibold text-muted">₱</span>
      <span className="font-hand text-2xl leading-none text-hand sm:text-3xl">
        {amount}
      </span>
    </span>
  );
}