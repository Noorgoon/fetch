"use client";

import { addQuery } from "@/app/core/query/queryMaker";
import { useRouter } from "next/navigation";

export default function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage?: number;
}) {
  const { replace } = useRouter();
  // const currentPage = ;

  const changePage = (pageNumber: number | string) => {
    addQuery(
      {
        page: pageNumber.toString(),
      },
      replace
    );
  };
  // ...
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        {Array(totalPages)
          .fill("")
          .map((_, index) => (
            <li
              onClick={() => changePage(index + 1)}
              className={
                ((currentPage || 1) == index + 1
                  ? "bg-blue-300 text-blue-700"
                  : "bg-white") +
                " flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500  border border-x-0-0 border-gray-300 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              }
            >
              {index + 1}
            </li>
          ))}
      </ul>
    </nav>
  );
}
