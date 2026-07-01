import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavbarClient from "./NavbarClient";

const footerItems = [
  { label: "privacy policy", href: "/" },
  { label: "terms of service", href: "/" },
  { label: "contact us", href: "/contact" },
  { label: "careers", href: "/jobs" },
];

const Footer = () => {
  return (
    <NavbarClient>
      <footer
        aria-label="footer"
        className="shadow-tertiary relative shadow-2xl flex md:flex-row md:justify-between md:items-start flex-col-reverse items-center text-xs capitalize gap-5 p-10 bg-surface mb-0"
      >
        <div className="flex flex-row gap-3 items-center">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={126}
                height={80}
              />
            </div>
          </Link>

          <p>&#169;2026 OptoVision Clinical Excellence. All rights reserved</p>
        </div>
        <div>
          <nav className="flex items-center md:gap-5 gap-2">
            {footerItems.map(({ label, href }) => (
              <Link className="" href={href} key={label}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </NavbarClient>
  );
};

export default Footer;
