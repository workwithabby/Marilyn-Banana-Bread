"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Banana,
  ChevronLeft,
  ChevronRight,
  Cookie,
  MousePointerClick,
  Nut,
  X,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";

import plainThumb from "@/assets/Plain Banana Bread/plain-thumbnail.jpg";
import plain01 from "@/assets/Plain Banana Bread/plain-01.jpg";
import plain02 from "@/assets/Plain Banana Bread/plain-02.jpg";
import chipsThumb from "@/assets/Chocolate Chips/chocochips-thumbnail.jpg";
import chips01 from "@/assets/Chocolate Chips/chocochips-01.jpg";
import chips02 from "@/assets/Chocolate Chips/chocochips-02.jpg";
import cashewsThumb from "@/assets/Chocolate Chips and Cashews/chococashews-thumbnail.jpg";
import cashews01 from "@/assets/Chocolate Chips and Cashews/chococashews-01.jpg";
import cashews02 from "@/assets/Chocolate Chips and Cashews/chococashews-02.jpg";

type Product = {
  icon: LucideIcon;
  name: string;
  price: string;
  description: string;
  alt: string;
  thumbnail: StaticImageData;
  samples: StaticImageData[];
};

const products: Product[] = [
  {
    icon: Banana,
    name: "Plain Banana Bread",
    price: "150",
    description:
      "Soft, moist, and naturally sweet banana bread, freshly baked with ripe bananas.",
    alt: "Slices of plain banana bread",
    thumbnail: plainThumb,
    samples: [plainThumb, plain01, plain02],
  },
  {
    icon: Cookie,
    name: "Chocolate Chips",
    price: "170",
    description:
      "Classic homemade banana bread with sweet chocolate chips baked into every bite.",
    alt: "Banana bread studded with chocolate chips",
    thumbnail: chipsThumb,
    samples: [chipsThumb, chips01, chips02],
  },
  {
    icon: Nut,
    name: "Chocolate Chips + Cashews",
    price: "190",
    description:
      "Our delicious banana bread made with rich chocolate chips and crunchy cashews.",
    alt: "Banana bread with chocolate chips and cashews",
    thumbnail: cashewsThumb,
    samples: [cashewsThumb, cashews01, cashews02],
  },
];

const imgVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -48 : 48 }),
};

export default function Menu() {
  const [active, setActive] = useState<Product | null>(null);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const openViewer = (p: Product) => {
    setActive(p);
    setSampleIndex(0);
    setDirection(1);
  };

  const changeSample = (delta: number) => {
    if (!active) return;
    setDirection(delta);
    setSampleIndex(
      (sampleIndex + delta + active.samples.length) % active.samples.length,
    );
  };

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") {
        setDirection(1);
        setSampleIndex((i) => (i + 1) % active.samples.length);
      }
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setSampleIndex((i) => (i - 1 + active.samples.length) % active.samples.length);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
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
            <Reveal key={p.name} delay={0.12 * i}>
              <article
                onClick={() => openViewer(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openViewer(p);
                  }
                }}
                className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-md sm:rounded-[1.5rem]"
              >
                <div className="relative block aspect-[4/3] w-full overflow-hidden bg-cream/70 text-green-bright">
                  <Image
                    src={p.thumbnail}
                    alt={p.alt}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-green-strong/0 transition group-hover:bg-green-strong/5" />
                  <span className="absolute bottom-2.5 right-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 text-green-bright shadow-sm ring-1 ring-border backdrop-blur-sm transition group-hover:scale-105 sm:bottom-3 sm:right-3 sm:h-11 sm:w-11">
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:items-center sm:p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
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
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close photo viewer"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-green-strong transition hover:rotate-90 hover:bg-cream-deep"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-brown sm:mb-4">
                {active.description}
              </p>

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cream ring-1 ring-border sm:rounded-2xl">
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
                      alt={`${active.name} sample ${sampleIndex + 1}`}
                      fill
                      sizes="(min-width:640px) 48rem, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <motion.button
                  type="button"
                  onClick={() => changeSample(-1)}
                  aria-label="Previous photo"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-2.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-green-strong shadow-md ring-1 ring-border backdrop-blur-sm transition hover:bg-surface sm:left-3"
                >
                  <ChevronLeft size={22} aria-hidden="true" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => changeSample(1)}
                  aria-label="Next photo"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-2.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-green-strong shadow-md ring-1 ring-border backdrop-blur-sm transition hover:bg-surface sm:right-3"
                >
                  <ChevronRight size={22} aria-hidden="true" />
                </motion.button>

                <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-green-strong shadow-sm ring-1 ring-border backdrop-blur-sm sm:bottom-3">
                  {sampleIndex + 1} / {active.samples.length}
                </span>
              </div>
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
