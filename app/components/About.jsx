import Image from "next/image";
import aboutImage from "./../../public/images/about_image.png";
import React from "react";

const About = () => {
  return (
    <div className="about-section">
      <div className="relative w-full md:w-1/2 h-full size-10">
        <Image
          src={aboutImage}
          alt="about image"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover rounded-lg shadow-md shadow-secondary"
        />
      </div>
      <div className="md:w-1/2">
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
          <div className="border-l-2 border-l-blue-700 w-1/2 p-2">
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
