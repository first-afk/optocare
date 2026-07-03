import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const JobFilter = () => {
  const filters = ["all", "full time", "hybrid", "part time", "remote"];
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("job_type") || "";
  const [subject, setSubject] = useState(query);

  useEffect(() => {
    let newUrl = "";
    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["job_type"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "job_type",
        value: subject,
      });
      router.push(newUrl, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);

  return (
    <div className="w-full">
      <h2 className="mx-2 py-2 text-sm font-semibold text-primary">
        Quick filters
      </h2>
      <div className="relative flex items-center gap-2 justify-center flex-wrap">
        {filters.map((filter) => {
          const isActive = query === filter;
          return (
            <button
              key={filter}
              type="button"
              value={filter}
              onClick={() => setSubject(filter)}
              className={clsx(
                "px-4 py-2 min-w-20 flex items-center justify-center capitalize transition-colors ",
                isActive ? "pill active" : "pill",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default JobFilter;
