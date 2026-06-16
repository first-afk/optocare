import {
  BriefcaseBusiness,
  Eye,
  Library,
  NewspaperIcon,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const layout = () => {
  const navItems = [
    { path: "/admin", label: "Overview", icon: Library },
    { path: "/admin/news", label: "News Management", icon: NewspaperIcon },
    { path: "/admin/jobs", label: "Job Listings", icon: BriefcaseBusiness },
    { path: "/admin/settings", label: "Job Listings", icon: Settings2 },
  ];
  return (
    <nav className="hidden lg:flex flex-col w-64 bg-surface border-r border-outline/70 p-6 transition-colors duration-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-primary flex justify-center items-center">
          <Eye className="size-7 text-white" />
        </div>
        <h1 className="text-2xl text-slate-800 dark:text-white">OptoVision</h1>
      </div>
      <div className="flex flex-col gap-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={`${item.path}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 border-l-3 transition-all duration-200 ${isActive ? "bg-blue-50 dark:bg-blue-900/10 text-primary font-medium" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 border-transparent"}`
            }
          >
            <item.icon className="size-5" />
            <span className="text-base">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default layout;
