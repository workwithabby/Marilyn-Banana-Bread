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
    <section id="menu" className="bg-cream py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
          <div className="max-w-2xl">
            <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.25em] text-green-bright sm:mb-3 sm:text-sm">
              The Menu
            </p>
            <h2 className="font-display text-2xl leading-tight text-green-strong sm:text-4xl">
              Our Banana Bread
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.name}
              className="group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-surface shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-cream/70">
                <span className="text-4xl sm:text-5xl" aria-hidden="true">
                  {p.emoji}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-base leading-snug text-green-strong sm:text-xl">
                    {p.name}
                  </h3>
                  <PriceTag amount={p.price} />
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brown sm:mt-3">
                  {p.description}
                </p>
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
      <span className="font-hand text-xl leading-none text-hand sm:text-3xl">
        {amount}
      </span>
    </span>
  );
}