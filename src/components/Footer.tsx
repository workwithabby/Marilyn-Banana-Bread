"use client";

import { ArrowUp } from "lucide-react";
import { SITE } from "@/lib/site";
import { POLICIES } from "@/lib/policies";
import { usePolicies } from "@/components/legal/ConsentProvider";
import Reveal from "./Reveal";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#storage", label: "Storage" },
  { href: "#order", label: "Order" },
];

export default function Footer() {
  const { openPolicy } = usePolicies();

  const backToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className="bg-green-deep text-cream-ink">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <Reveal>
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
                  className="text-sm text-cream-ink/75 transition-colors duration-200 hover:text-cream-ink"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={backToTop}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-cream-ink/10 px-5 py-2.5 text-sm font-medium text-cream-ink ring-1 ring-cream-ink/20 transition duration-200 hover:bg-cream-ink/20 active:scale-95"
            >
              <ArrowUp
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />
              Back to top
            </button>
          </div>
        </Reveal>

        <div className="mt-8 border-t border-cream-ink/15 pt-6 sm:mt-10">
          <nav
            aria-label="Policies"
            className="flex flex-wrap justify-center gap-x-5 gap-y-2.5"
          >
            {POLICIES.map((policy) => (
              <button
                key={policy.id}
                type="button"
                onClick={() => openPolicy(policy.id)}
                className="cursor-pointer rounded-sm text-xs text-cream-ink/70 underline-offset-4 transition-colors duration-200 hover:text-cream-ink hover:underline"
              >
                {policy.label}
              </button>
            ))}
          </nav>

          <p className="mt-4 text-center text-xs text-cream-ink/70">
            © 2026 {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
