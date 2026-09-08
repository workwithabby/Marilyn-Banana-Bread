import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

const navLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#delivery", label: "Delivery" },
  { href: "#order", label: "Order" },
];

export default function Footer() {
  return (
    <footer className="bg-green-deep text-cream-ink">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8 md:flex-row md:items-start md:justify-between md:text-left">
          <div className="max-w-xs">
            <p className="font-display text-2xl sm:text-3xl">{SITE.name}</p>
            <p className="mt-2.5 text-sm text-cream-ink/75 sm:mt-3">{SITE.tagline}</p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap justify-center gap-x-6 gap-y-3"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-cream-ink/75 transition-colors hover:text-cream-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href={SITE.facebookUrl}
            className="inline-flex items-center gap-2 rounded-full border border-cream-ink/30 px-5 py-2.5 text-sm font-medium text-cream-ink transition hover:border-cream-ink hover:bg-cream-ink/15 hover:text-cream-ink"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Order on Facebook
          </a>
        </div>

        <div className="mt-8 border-t border-cream-ink/15 pt-6 text-center text-xs text-cream-ink/60 sm:mt-10">
          © 2026 {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}