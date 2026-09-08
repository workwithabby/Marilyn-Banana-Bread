import Image from "next/image";

const aboutImage =
  "https://images.pexels.com/photos/4384242/pexels-photo-4384242.jpeg";

export default function About() {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] bg-cream ring-1 ring-border">
          <Image
            src={aboutImage}
            alt="Homemade banana bread baked by Mom"
            width={1024}
            height={683}
            className="aspect-[3/2] w-full object-cover lg:aspect-auto lg:h-[26rem]"
          />
        </div>

        <div className="max-w-xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-green-bright">
            Our Story
          </p>
          <h2 className="font-display text-3xl leading-tight text-green-strong sm:text-4xl">
            Made by Mom, Baked with Love
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brown">
            Every loaf is homemade and freshly baked by Mom.
            What started as her love for baking has grown into a small business.
            Each banana bread is made with love and care, one batch at a time.
          </p>
          <p className="mt-6 font-hand text-3xl text-green-bright">
            — Mom
          </p>
        </div>
      </div>
    </section>
  );
}