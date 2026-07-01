"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import NavbarClient from "./NavbarClient";
import NavItems from "./ui/NavItems";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarClient>
      <nav className="navbar ">
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={126}
                height={80}
              />
            </Link>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="md:hidden rounded-lg border border-outline/70 bg-surface p-2 text-primary"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden items-center gap-8 md:flex">
            <NavItems className="flex items-center gap-5" />
            <div className="flex items-center gap-3">
              <Show when="signed-out">
                <SignInButton className="btn-secondary" />
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </div>
        </div>

        {isOpen ? (
          <div className="md:hidden absolute w-full left-0 right-0 top-0 mt-18 rounded-3xl border border-outline/70 bg-surface p-4 shadow-lg transition-colors">
            <NavItems className="flex flex-col gap-3" />
            <div className="mt-4 flex flex-col gap-3">
              <Show when="signed-out">
                <SignInButton className="btn-secondary w-full" />
              </Show>
              <Show when="signed-in">
                <UserButton className="w-full" />
              </Show>
            </div>
          </div>
        ) : null}
      </nav>
    </NavbarClient>
  );
};

export default Navbar;
