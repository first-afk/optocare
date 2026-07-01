"use client";

import clsx from "clsx";
import {
  BriefcaseBusiness,
  Eye,
  Library,
  NewspaperIcon,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Layout({ children }) {
  const pathname = usePathname();
  const navItems = [
    { path: "/admin", label: "Overview", icon: Library },
    { path: "/admin/news", label: "News Management", icon: NewspaperIcon },
    { path: "/admin/jobs", label: "Job Listings", icon: BriefcaseBusiness },
  ];

  return (
    <div className="flex max-w-300">
      <nav className="hidden lg:flex flex-col w-64 border-r border-outline/70 py-6 transition-colors duration-200">
        <Link href="/">
          <div className="flex items-center gap-3 mb-8 px-4">
            <div className="size-10 rounded-xl bg-blue-900 dark:bg-primary flex justify-center items-center">
              <Eye className="size-6 text-white" />
            </div>
            <div className="flex flex-col text-left gap ">
              <h1 className="text-lg font-bold tracking-wide text-blue-900 dark:text-white">
                OptoVision
              </h1>
              <p className="text-xs uppercase tracking-widest">
                Management portal
              </p>
            </div>
          </div>
        </Link>
        <div className="flex flex-col gap-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2.5 border-r-3 transition-all duration-200",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/10 text-primary font-medium"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 border-transparent",
                )}
              >
                <item.icon className="size-5" />
                <span className="text-base">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-outline/70 px-4 pb-safe lg:hidden transition-colors duration-200 z-99">
        <div className="max-w-lg mx-auto flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={clsx(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-primary font-medium"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-600",
                )}
              >
                <item.icon className="size-5" />
                {/* <span className="text-xs font-medium">{item.label}</span> */}
              </Link>
            );
          })}
        </div>
      </nav>

      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;
