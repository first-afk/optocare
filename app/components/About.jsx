import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="p-5 mx-3 md:flex md:flex-row flex-col-center">
      <div className="relative w-full h-full size-[72px]">
        <Image
          src="/images/about_image.png"
          alt="hero image"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <div>
        <h1 className="text-sm text-primary font-bold">About Optivision</h1>
        <h2 className="text-2xl font-bold capitalize">
          Setting the standard for eye care excellence.
        </h2>
        <p className="py-5">
          Founded on the principles clinical and patient-centric care.
          OptoVision serves as the premier network for optometric professionals.
        </p>
        <p>
          We believe that by providing practitioners with unparalleled
          resources, seamless continuing education, and a robust support
          community, we elevate the standard of care for patients everywhere.
          Our platform is designed to minimize administrative friction so you
          can focus on what matters most: clear vision.
        </p>
        <div className="flex py-3">
          <div className="border-l-2 border-l-primary text-primary w-1/2 p-2">
            <p className="text-2xl font-black">15k+</p>
            <p className="text-sm">Active members</p>
          </div>
          <div className="border-l-2 border-l-secondary w-1/2 p-2">
            <p className="text-2xl font-black">98%</p>
            <p className="text-sm">Satisfaction rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
