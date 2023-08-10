"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar({
  placeholder,
  route,
}: {
  placeholder: string;
  route: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${route}?q=` + search);
      } else {
        router.push(`/${route}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [route, search]);

  return (
    <div className="searchbar">
      <Image
        src="/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="no-focus searchbar_input"
      />
    </div>
  );
}
