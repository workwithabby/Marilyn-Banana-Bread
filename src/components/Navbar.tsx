"use client";

import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#storage", label: "Storage" },
  { href: "#order", label: "Order" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8 sm:py-4">
        <a
          href="#home"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green text-lg text-cream-ink sm:h-10 sm:w-10 sm:text-xl">
            🍌
          </span>
          <span className="font-display text-xl text-green-strong sm:text-2xl">
            {SITE.name}
          </span>
        </a>

        <div className="flex items-center">
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-brown transition-colors hover:text-green-bright"
              >
                {l.label}
              </a>
            ))}
            <a
              href={SITE.facebookUrl}
              className="inline-flex items-center gap-2 rounded-full bg-green px-4 py-2.5 text-sm font-semibold text-cream-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Order
            </a>
          </nav>

          <ThemeToggle className="ml-2" />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-md p-2.5 text-green-strong md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-surface px-5 pb-5 pt-2 md:hidden"
          aria-label="Mobile"
        >
          <div className="flex justify-end pb-1.5 md:hidden">
            <ThemeToggle />
          </div>
          <div className="flex flex-col gap-3.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-brown transition-colors hover:text-green-bright"
              >
                {l.label}
              </a>
            ))}
            <a
              href={SITE.facebookUrl}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-green px-4 py-3 text-base font-semibold text-cream-ink"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Order via Facebook
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}