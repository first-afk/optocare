"use client";
import { Search, X, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import JobFilter from "./JobFilter";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("title") || "";
  const [searchQuery, setSearchQuery] = useState("");

  const job_type = searchParams.get("job_type") || "";

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "title",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === "/jobs") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["title"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div className=" md:flex md:absolute md:top-0 md:left-0 md:bottom-0 md:w-74 md:flex-col md:rounded-none bg-surface px-4 py-3   relative rounded-2xl border border-primary/20  shadow-sm transition hover:border-primary/40 focus-within:border-primary/70">
      <div className="flex px-3 py-3 border border-outline/70 bg-surface rounded-2xl items-center">
        <Search />
        {job_type ? (
          <div className="flex ml-3 gap-2 flex-wrap">
            {job_type && (
              <span className="pill bg-primary/20 text-xs">
                {job_type}{" "}
                <button
                  onClick={() => {
                    const newUrl = removeKeysFromUrlQuery({
                      params: searchParams.toString(),
                      keysToRemove: ["job_type"],
                    });
                    router.push(newUrl, { scroll: false });
                  }}
                  className="ml-1 border border-outline rounded-full cursor-pointer"
                >
                  <XIcon size={15} />
                </button>
              </span>
            )}
          </div>
        ) : (
          <input
            type="text"
            placeholder="Search jobs ..."
            className="ml-3 borderw-full bg-transparent text-sm text-foreground outline-none placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
      </div>
      <JobFilter />
    </div>
  );
};

export default SearchInput;
