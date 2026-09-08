import { ThermometerSun, Refrigerator, Snowflake, Lightbulb } from "lucide-react";
import { SITE } from "@/lib/site";
import Reveal from "./Reveal";

const storageTips = [
  {
    icon: ThermometerSun,
    method: "Room Temperature",
    duration: "1–2 days",
    tip: "Seal it in an airtight container or wrap it well to keep the loaf soft and moist.",
  },
  {
    icon: Refrigerator,
    method: "Refrigerate",
    duration: "Up to 5 days",
    tip: "Tightly wrapped in the fridge, it keeps its moisture and makes for a denser, cool slice.",
  },
  {
    icon: Snowflake,
    method: "Freeze",
    duration: "Up to 2 months",
    tip: "Slice, wrap, and freeze so you can thaw exactly the pieces you crave.",
  },
];

export default function Storage() {
  return (
    <section id="storage" className="bg-cream py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.25em] text-green-bright sm:mb-3 sm:text-sm">
              Keep It Fresh
            </p>
            <h2 className="font-display text-2xl leading-tight text-green-strong sm:text-4xl">
              How to Store Your Banana Bread
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brown sm:mt-6 sm:text-lg">
              Freshly baked is best, but every next day is still delicious. Here&apos;s
              how to keep your loaves soft, moist, and ready whenever you are.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-6">
          {storageTips.map((tip, i) => (
            <Reveal key={tip.method} delay={0.12 * i}>
              <article className="flex h-full flex-col rounded-[1.5rem] bg-surface p-5 shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-md sm:p-7">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/70 text-green-strong"
                  aria-hidden="true"
                >
                  <tip.icon size={24} strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-lg leading-snug text-green-strong sm:text-xl">
                  {tip.method}
                </h3>
                <p className="mt-1 font-hand text-2xl leading-none text-hand sm:text-3xl">
                  {tip.duration}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-brown">
                  {tip.tip}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 rounded-[1.5rem] bg-green p-5 text-cream-ink shadow-md sm:mt-8 sm:p-7">
            <div className="flex items-start gap-3 sm:gap-4">
              <span
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/15 text-cream-ink"
                aria-hidden="true"
              >
                <Lightbulb size={20} strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display text-base sm:text-lg">
                  {SITE.name}&apos;s Pro Tip
                </p>
                <p className="mt-1.5 text-sm leading-relaxed sm:text-base">
                  Slice the loaf before freezing. Wrap each slice in plastic wrap and foil.
                  When you’re ready to eat, thaw only what you need and
                  warm it in the microwave for a fresh, just-baked taste.
                </p>
                <p className="mt-3 font-hand text-xl text-cream-ink/85">
                  — Mom
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}