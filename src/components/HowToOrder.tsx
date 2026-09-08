import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

const steps = [
  {
    number: "1",
    title: "Choose Your Flavor",
    description: "Pick your favorite banana bread.",
  },
  {
    number: "2",
    title: "Message Us",
    description: "Send us your order through Facebook Messenger.",
  },
  {
    number: "3",
    title: "Confirm Your Order",
    description: "We'll reply with the details for your order and delivery.",
  },
];

export default function HowToOrder() {
  return (
    <section id="order" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-green-bright">
            Simple as That
          </p>
          <h2 className="font-display text-3xl leading-tight text-green-strong sm:text-4xl">
            How to Order
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="relative rounded-[1.5rem] bg-surface p-7 shadow-sm ring-1 ring-border"
            >
              <span className="font-display text-4xl text-border">
                {step.number}
              </span>
              <h3 className="mt-3 font-display text-xl leading-snug text-green-strong">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-brown">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-lg text-brown">
            Ready for a fresh loaf? Message Mom directly on Facebook to place
            your order.
          </p>
          <a
            href={SITE.facebookUrl}
            className="inline-flex items-center gap-2 rounded-full bg-green px-8 py-4 text-lg font-semibold text-cream-ink shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Message Us on Facebook
          </a>
        </div>
      </div>
    </section>
  );
}