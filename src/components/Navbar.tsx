"use client";

import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { SITE } from "@/lib/site";
import brandLogo from "@/assets/brand-logo.png";
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
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-surface/90 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 ${
        scrolled ? "border-border shadow-sm" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8 sm:py-4">
        <a
          href="#home"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src={brandLogo}
            alt={`${SITE.name} logo`}
            width={2000}
            height={2000}
            preload
            className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
          />
          <span className="font-display text-lg text-green-strong sm:text-xl">
            {SITE.name}
          </span>
        </a>

        <div className="flex items-center">
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            {links.map((l) => {
              const isActive = activeId === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-sm font-medium transition-colors duration-200 hover:text-green-bright ${
                    isActive ? "text-green-strong" : "text-brown"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-green-bright"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <a
              href={SITE.facebookUrl}
              className="inline-flex items-center gap-2 rounded-full bg-green px-4 py-2.5 text-sm font-semibold text-cream-ink shadow-sm transition duration-200 ease-spring hover:-translate-y-0.5 hover:shadow-md active:scale-95"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Order
            </a>
          </nav>

          <ThemeToggle className="ml-2" />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md p-2.5 text-green-strong transition active:scale-95 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-border bg-surface px-5 pb-5 pt-2 md:hidden"
            aria-label="Mobile"
          >
            <div className="flex justify-end pb-1.5 md:hidden">
              <ThemeToggle />
            </div>
            <div className="flex flex-col gap-3.5">
              {links.map((l, i) => {
                const isActive = activeId === l.href.slice(1);
                return (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                    className={`flex items-center justify-between text-base font-medium transition-colors hover:text-green-bright ${
                      isActive ? "text-green-strong" : "text-brown"
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-green-bright"
                        aria-hidden="true"
                      />
                    )}
                  </motion.a>
                );
              })}
              <a
                href={SITE.facebookUrl}
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-green px-4 py-3 text-base font-semibold text-cream-ink transition active:scale-95"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Order via Facebook
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-green-bright"
      />
    </header>
  );
}
