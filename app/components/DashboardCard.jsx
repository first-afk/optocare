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
    <article className={`m-3 md:h-56 dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200 drop-shadow-xl shadow-gray-900 rounded-lg ${className}`}>
      {(topic || description) && (
          <div className=" md:w-3/4">
            <div
              className="h-12 w-12 flex items-center justify-center mx-5 mt-5 rounded-xl"
              style={{ backgroundColor: `${variantColors[variant]}` }}
            >
              <Image
                src={`/icons/${icon}.svg`}
                alt={`${icon} icon`}
                width={30}
                height={30}
              />
            </div>
            <div className="flex flex-col gap-3 mx-5 py-5">
              <h1 className="text-2xl font-bold capitalize">{topic}</h1>
              <p className="text-sm font-medium">{description}</p>
            </div>
            {children}
          </div>
        )}
    </article>
  );
};

export default DashboardCard;
