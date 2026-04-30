import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardCard = ({
  topic,
  description,
  variant="",
  className="",
  icon="",
  children,
}) => {
  const variantColors = {
    primary: "#afc1ff",
    secondary: "#fcd400",
    tertiary: "#465165",
  };

  return (
    <article className={`m-3 md:h-56 border-2 border-[#c3c6d6] rounded-lg ${className}`}>
      {(topic || description) && (
          <div className=" md:w-3/4">
            <div
              className="size-12 flex-center mx-5 mt-5 rounded"
              style={{ backgroundColor: `${variantColors[variant]}` }}
            >
              <Image
                src={`/icons/${icon}.svg`}
                alt={`${icon} icon`}
                width={35}
                height={35}
              />
            </div>
            <div className="flex flex-col gap-3 mx-5 py-5">
              <h1 className="text-2xl font-bold capitalize">{topic}</h1>
              <p className="text-sm text-[#737685] font-medium">{description}</p>
            </div>
            {children}
          </div>
        )}
    </article>
  );
};

export default DashboardCard;
