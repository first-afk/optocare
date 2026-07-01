"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "News", href: "/news" },
];

const NavItems = ({ className = "" }) => {
  const { user } = useUser();

  return (
    <nav className={`${className}`}>
      {navItems.map(({ label, href }) => (
        <Link className="font-semibold px-2 py-1" href={href} key={label}>
          {label}
        </Link>
      ))}
      {user?.publicMetadata?.role === "admin" ? (
        <div>
          <Link className="font-semibold" href="/admin">
            Admin
          </Link>
        </div>
      ) : null}
    </nav>
  );
};

export default NavItems;
