/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const NewsCategory = ({ genres, activeGenre }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("genre") || "";
  const [category, setCategory] = useState(query);

  const isActive = activeGenre ? activeGenre : "";

  useEffect(() => {
    let newUrl = "";
    if (category === "all" || category === "") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["genre"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "genre",
        value: category,
      });
      router.push(newUrl, { scroll: false });
    }
  }, [category]);

  return (
    <div className="flex px-4 gap-4 py-2 w-full">
      <button
        type="button"
        onClick={() => setCategory("all")}
        className={clsx("pill cursor-pointer", !isActive && "pill active")}
        value="all"
      >
        All News
      </button>
      {genres.map((newsGenre) => (
        <button
          key={newsGenre}
          value={newsGenre}
          onClick={() => setCategory(newsGenre)}
          className={clsx(
            "px-4 py-2 transition-colors cursor-pointer",
            isActive ? "pill active" : "pill",
          )}
        >
          {newsGenre}
        </button>
      ))}
    </div>
  );
};

export default NewsCategory;
