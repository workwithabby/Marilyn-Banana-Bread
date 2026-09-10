import Image from "next/image";
import { MapPin } from "lucide-react";
import Reveal from "./Reveal";

const aboutImage =
  "https://images.pexels.com/photos/4384242/pexels-photo-4384242.jpeg";

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:px-8 sm:gap-12 lg:grid-cols-2">
        <Reveal y={32}>
          <div className="overflow-hidden rounded-[2rem] bg-cream ring-1 ring-border">
            <Image
              src={aboutImage}
              alt="Homemade banana bread baked by Mom"
              width={1024}
              height={683}
              className="aspect-[3/2] w-full object-cover lg:aspect-auto lg:h-[26rem]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15} y={32}>
          <div className="max-w-xl">
            <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.25em] text-green-bright sm:mb-3 sm:text-sm">
              Our Story
            </p>
            <h2 className="font-display text-2xl leading-tight text-green-strong sm:text-4xl">
              Made by Mom, Baked with Love
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brown sm:mt-6 sm:text-lg">
              Every loaf is homemade and freshly baked by Mom.
              What started as her love for baking has grown into a small business.
              Each banana bread is made with love and care, one batch at a time.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-brown sm:mt-5 sm:text-base">
              <MapPin size={18} strokeWidth={1.75} className="text-green-bright" aria-hidden="true" />
              We&apos;re based in Marikina City.
            </p>
            <p className="mt-4 font-hand text-2xl text-green-bright sm:mt-5 sm:text-3xl">
              — Mom
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}