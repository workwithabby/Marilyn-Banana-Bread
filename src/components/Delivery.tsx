import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

const items = [
  { label: "Delivery areas", value: SITE.delivery.areas },
  { label: "Delivery fee", value: SITE.delivery.fee },
  { label: "Delivery schedule", value: SITE.delivery.schedule },
  { label: "Meet-up / pick-up option", value: SITE.delivery.pickup },
];

export default function Delivery() {
  return (
    <section id="delivery" className="bg-cream py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-start">
          <div className="max-w-xl">
            <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.25em] text-green-bright sm:mb-3 sm:text-sm">
              Getting It to You
            </p>
            <h2 className="font-display text-2xl leading-tight text-green-strong sm:text-4xl">
              Delivery Information
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brown sm:mt-6 sm:text-lg">
              We currently offer delivery within selected areas.
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-surface p-5 shadow-sm ring-1 ring-border sm:p-7">
            <dl className="divide-y divide-border">
              {items.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0"
                >
                  <dt className="text-sm font-medium text-green-bright">
                    {item.label}
                  </dt>
                  <dd className="font-hand text-lg text-hand sm:text-xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-2xl bg-green p-4 text-cream-ink sm:mt-7 sm:p-5">
              <p className="text-sm leading-relaxed sm:text-base">
                Message us on Facebook to confirm delivery availability and
                fees.
              </p>
              <a
                href={SITE.facebookUrl}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-green-strong transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Message Us on Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}