import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardCard = ({
  topic,
  description,
  variant = "",
  className = "",
  icon = "",
  children,
}) => {
  const variantColors = {
    primary: "#dbeafe",
    secondary: "#fef3c7",
    tertiary: "#e2e8f0",
  };

  return (
    <article
      className={`m-3 md:h-56 dark:bg-surface bg-surface border border-outline/70 dark:shadow-[0_22px_60px_rgba(37,99,235,0.12)] rounded-[1.75rem] ${className}`}
    >
      {(topic || description) && (
        <div className="md:w-3/4">
          <div
            className="h-12 w-12 flex items-center justify-center mx-5 mt-5 rounded-[1.25rem]"
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
