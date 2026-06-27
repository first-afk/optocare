import Image from "next/image";
import React from "react";
import Button from "./ui/Button";

const heroItems = [
  {
    id: 1,
    header: "clinical excellence network",
    subheader: "advancing optometry together",
    subtext:
      "Empowering vision care professionals with cutting-edge resources, career advancement opportunities, and a thriving collaborative community",
  },
];

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="image-wrapper relative w-full h-full max-h-[80vh]">
        <Image
          src="/images/optovision_hero.png"
          alt="hero image"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover rounded-b-xl"
        />
      </div>
      <div className="flex flex-col text-wrapper justify-center items-center">
        {heroItems.map(({ id, header, subheader, subtext }) => (
          <div
            key={id}
            className="flex flex-col justify-center items-center text-center mt-15"
          >
            <h1 className="capitalize font-semibold text-xl mb-4">{header}</h1>
            <h2 className="text-3xl font-bold capitalize">{subheader}</h2>
            <p className="text-sm py-5 md:w-2/3 text-center">{subtext}</p>
          </div>
        ))}
        <div className="space-x-7">
          <Button variant="primary">Join Network</Button>
          <Button variant="outline">learn more</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
