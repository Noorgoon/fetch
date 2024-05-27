"use client";

import { addQuery } from "@/app/core/query/queryMaker";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export function Options({ pageCount }: { pageCount: string | number }) {
  const { replace } = useRouter();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    addQuery(
      {
        size: event.target.value,
      },
      replace
    );
  };

  return (
    <div className=" flex ">
      <label
        htmlFor="perPage"
        className="block text-sm font-medium text-gray-700"
      >
        تعداد در صفحه
      </label>
      <select
        id="perPage"
        name="perPage"
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        defaultValue={pageCount}
        onChange={handleChange}
      >
        <option value={10}>۱۰</option>
        <option value={20}>۲۰</option>
        <option value={30}>۳۰</option>
      </select>
    </div>
  );
}
