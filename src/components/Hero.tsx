"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import bananaBreadImage from "../assets/banana-bread.jpg";
import { SITE } from "@/lib/site";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:pb-24 lg:pt-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={item}
            className="mb-2.5 text-xs font-medium uppercase tracking-[0.25em] text-green-bright sm:mb-4 sm:text-sm"
          >
            Fresh from the kitchen of Mom
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-4xl leading-[1.05] text-green-strong sm:text-6xl lg:text-7xl"
          >
            Homemade Banana Bread, Baked with Love
          </motion.h1>
          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brown sm:mt-6 sm:text-lg"
          >
            Freshly baked in small batches by Mom, with comforting flavors
            everyone loves and a touch of homemade goodness in every loaf.
          </motion.p>
          <motion.div variants={item}>
            <a
              href={SITE.facebookUrl}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-green px-7 py-3.5 text-sm font-semibold text-cream-ink shadow-md transition hover:-translate-y-0.5 hover:shadow-lg sm:mt-9 sm:px-8 sm:py-4 sm:text-base"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Order via Facebook
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto mt-10 max-w-4xl sm:mt-12 lg:mt-16"
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
    <motion.figure
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-border"
    >
      <Image
        src={bananaBreadImage}
        alt="A fresh loaf of homemade banana bread"
        width={1024}
        height={683}
        priority
        className="h-44 w-full object-cover sm:h-72 lg:h-96"
      />
      <motion.figcaption
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-4 py-1.5 text-xs font-medium text-green-strong backdrop-blur-sm sm:text-sm"
      >
        Made with love 💛
      </motion.figcaption>
    </motion.figure>
  );
}