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
    <section id="order" className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.25em] text-green-bright sm:mb-3 sm:text-sm">
            Simple as That
          </p>
          <h2 className="font-display text-2xl leading-tight text-green-strong sm:text-4xl">
            How to Order
          </h2>
        </div>

        <ol className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="relative rounded-[1.5rem] bg-surface p-5 shadow-sm ring-1 ring-border sm:p-7"
            >
              <span className="font-display text-3xl text-border sm:text-4xl">
                {step.number}
              </span>
              <h3 className="mt-2 font-display text-lg leading-snug text-green-strong sm:mt-3 sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brown sm:mt-2 sm:text-base">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col items-center gap-3 text-center sm:mt-12 sm:gap-4">
          <p className="max-w-xl text-base text-brown sm:text-lg">
            Ready for a fresh loaf? Message Mom directly on Facebook to place
            your order.
          </p>
          <a
            href={SITE.facebookUrl}
            className="inline-flex items-center gap-2 rounded-full bg-green px-7 py-3.5 text-base font-semibold text-cream-ink shadow-md transition hover:-translate-y-0.5 hover:shadow-lg sm:px-8 sm:py-4 sm:text-lg"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Message Us on Facebook
          </a>
        </div>
      </div>
    </section>
  );
}