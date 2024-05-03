"use client";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) params.set("query", term);
    else params.delete("query");

    replace(`${pathName}?${params.toString()}`);
  }, 500);

  return (
    <label className="flex items-center w-full gap-2 input join-item input-bordered input-primary">
      <input
        type="text"
        className="grow"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString() ?? ""}
      />
      <SearchIcon className="w-6 h-6" />
    </label>
  );
};
