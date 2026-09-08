"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import bananaBreadImage from "../assets/banana-bread.jpg";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 lg:pb-24 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-green-bright">
            Fresh from the kitchen of Mom
          </p>
          <h1 className="font-display text-5xl leading-[1.05] text-green-strong sm:text-6xl lg:text-7xl">
            Homemade Banana Bread, Baked with Love
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown">
            Freshly baked in small batches by Mom, with comforting flavors
            everyone loves and a touch of homemade goodness in every loaf.
          </p>
          <a
            href={SITE.facebookUrl}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-green px-8 py-4 text-base font-semibold text-cream-ink shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <MessageCircle size={19} aria-hidden="true" />
            Order via Facebook
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          className="relative mx-auto mt-14 max-w-4xl lg:mt-16"
        >
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/70 blur-3xl"
          />
          <BreadPhoto />
        </motion.div>
      </div>
    </section>
  );
}

function BreadPhoto() {
  return (
    <figure className="relative overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-border">
      <Image
        src={bananaBreadImage}
        alt="A fresh loaf of homemade banana bread"
        width={1024}
        height={683}
        priority
        className="h-56 w-full object-cover sm:h-72 lg:h-96"
      />
      <figcaption className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-4 py-1.5 text-xs font-medium text-green-strong backdrop-blur-sm sm:text-sm">
        Made in small batches by Mom 💛
      </figcaption>
    </figure>
  );
}