"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MousePointerClick,
  Star,
  X,
} from "lucide-react";
import Reveal from "./Reveal";
import { products, type Product } from "@/lib/products";

const imgVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -48 : 48 }),
};

export default function Menu() {
  const [active, setActive] = useState<Product | null>(null);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const openViewer = (p: Product) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setActive(p);
    setSampleIndex(0);
    setDirection(1);
  };

  const closeViewer = () => setActive(null);

  const changeSample = (delta: number) => {
    if (!active) return;
    setDirection(delta);
    setSampleIndex(
      (sampleIndex + delta + active.samples.length) % active.samples.length,
    );
  };

  useEffect(() => {
    if (!active) return;
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        return;
      }
      if (e.key === "ArrowRight") {
        setDirection(1);
        setSampleIndex((i) => (i + 1) % active.samples.length);
      }
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setSampleIndex(
          (i) => (i - 1 + active.samples.length) % active.samples.length,
        );
      }
      if (e.key === "Tab") {
        const panel = dialogRef.current;
        if (!panel) return;
        const focusables = Array.from(
          panel.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const current = document.activeElement;
        if (!panel.contains(current)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && current === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && current === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      lastFocused.current?.focus();
    };
  }, [active]);

  return (
    <section id="menu" className="bg-cream py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.25em] text-green-bright sm:mb-3 sm:text-sm">
              The Menu
            </p>
            <h2 className="font-display text-2xl leading-tight text-green-strong sm:text-4xl">
              Our Banana Bread
            </h2>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted sm:mt-4">
              <MousePointerClick size={16} aria-hidden="true" />
              Click a flavor to browse its photos
            </p>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-3.5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} y={20} scale>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border transition duration-200 ease-spring hover:-translate-y-1 hover:shadow-md group-active:scale-[0.985] sm:rounded-[1.5rem]">
                <button
                  type="button"
                  onClick={() => openViewer(p)}
                  aria-haspopup="dialog"
                  aria-label={`View photos of ${p.name}`}
                  className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:-outline-offset-4 sm:rounded-[1.5rem]"
                />
                <div className="relative block aspect-[4/3] w-full overflow-hidden bg-cream/70 text-green-bright">
                  <Image
                    src={p.thumbnail}
                    alt={p.alt}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-green-strong/0 transition group-hover:bg-green-strong/5" />
                  {p.badge && (
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-green px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-cream-ink shadow-sm ring-1 ring-green-deep/30 -rotate-2 sm:bottom-3.5 sm:left-3.5 sm:px-2.5 sm:py-1 sm:text-[11px] sm:tracking-[0.15em]">
                      <Star
                        size={10}
                        strokeWidth={1.5}
                        className="shrink-0 sm:size-3"
                        aria-hidden="true"
                      />
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute bottom-2.5 right-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 text-green-bright shadow-sm ring-1 ring-border backdrop-blur-sm transition duration-200 group-hover:scale-110 group-hover:ring-green/40 sm:bottom-3 sm:right-3 sm:h-11 sm:w-11">
                    <p.icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <h3 className="font-display text-base leading-snug text-green-strong sm:text-xl">
                      {p.name}
                    </h3>
                    <PriceTag amount={p.price} />
                  </div>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-brown sm:mt-3">
                    {p.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} photos`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:items-center sm:p-6"
            onClick={closeViewer}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              ref={dialogRef}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-surface shadow-xl ring-1 ring-border sm:max-h-[90vh] sm:rounded-[1.5rem]"
            >
              <div className="overflow-y-auto overscroll-contain p-4 sm:p-7">
                <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4 sm:gap-4">
                  <div>
                    <h3 className="font-display text-base leading-snug text-green-strong sm:text-2xl">
                      {active.name}
                    </h3>
                    <p className="mt-1 font-hand text-2xl leading-none text-hand sm:mt-1.5">
                      ₱{active.price}
                    </p>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={closeViewer}
                    aria-label="Close photo viewer"
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-cream text-green-strong transition duration-200 hover:rotate-90 hover:bg-cream-deep active:scale-90"
                  >
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-brown sm:mb-4">
                  {active.description}
                </p>

                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) changeSample(1);
                    else if (info.offset.x > 60) changeSample(-1);
                  }}
                  className="relative aspect-[4/3] cursor-grab overflow-hidden rounded-xl bg-cream ring-1 ring-border active:cursor-grabbing sm:rounded-2xl"
                >
                  <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                    <motion.div
                      key={sampleIndex}
                      className="absolute inset-0"
                      custom={direction}
                      variants={imgVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <Image
                        src={active.samples[sampleIndex]}
                        alt={`${active.name} photo ${sampleIndex + 1} of ${active.samples.length}`}
                        fill
                        sizes="(min-width:640px) 48rem, 100vw"
                        className="object-cover"
                        draggable={false}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => changeSample(-1)}
                    aria-label="Previous photo"
                    className="absolute left-2.5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-surface/90 text-green-strong shadow-md ring-1 ring-border backdrop-blur-sm transition duration-200 hover:bg-surface active:scale-90 sm:left-3"
                  >
                    <ChevronLeft size={22} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => changeSample(1)}
                    aria-label="Next photo"
                    className="absolute right-2.5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-surface/90 text-green-strong shadow-md ring-1 ring-border backdrop-blur-sm transition duration-200 hover:bg-surface active:scale-90 sm:right-3"
                  >
                    <ChevronRight size={22} aria-hidden="true" />
                  </button>

                  <span
                    role="status"
                    className="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-green-strong shadow-sm ring-1 ring-border backdrop-blur-sm sm:bottom-3"
                  >
                    {sampleIndex + 1} / {active.samples.length}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
