import Image from "next/image";
import React from "react";
import Button from "./Button";

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
      <div className="image-wrapper relative w-full h-full">
        <Image
          src="/images/optovision_hero.png"
          alt="hero image"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <div className="flex-col-center text-wrapper justify-center items-center">
        {heroItems.map(({ id, header, subheader, subtext }) => (
          <div key={id} className="flex-col-center text-center mt-20">
            <h1 className="capitalize font-bold">{header}</h1>
            <h2 className="text-5xl font-bold capitalize py-5">{subheader}</h2>
            <p className="text-lg py-4 md:w-2/3">{subtext}</p>
          </div>
        ))}
        <div className="space-x-7">
          <Button variant="primary">
            Join Network
          </Button>
          <Button variant="outline">
            learn more
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
