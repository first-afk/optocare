"use client";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SearchInput = () => {
  const pathname = usePathname();
  //   const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("title") || "";
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {}, [searchQuery, searchParams, pathname]);

  return (
    <div className="relative border border-primary rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input
        type="text"
        placeholder="search jobs ..."
        className="outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
