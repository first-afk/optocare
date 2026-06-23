"use client";

import { usePathname } from "next/navigation";

export default function NavbarClient({ children }) {
  const pathname = usePathname();

  // Hide navbar on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return children;
}
