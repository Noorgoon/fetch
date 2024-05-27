import Pagination from "@/app/components/ui/pagination";
import Search from "@/app/components/ui/search";
import Table from "@/app/components/ui/table";
import { Suspense } from "react";
import TableLoading from "../components/ui/tableLoading";
import { fetchDataPageCount } from "../core/mock/getTotalPage";
import { fetchData } from "@/app/core/mock/getData";
import { Options } from "../components/ui/options";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
    size?: string;
  };
}) {
  const search = searchParams?.search || "";
  const size = searchParams?.size || 10;
  const currentPage = Number(searchParams?.page) || 1;
  const totalCount = await fetchDataPageCount(search);
  const data = await fetchData(search, currentPage, Number(size));

  return (
    <div className=" min-h-screen">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 ">
        <Search
          placeholder="دنبال مورد خاصی میگردی؟..."
          defaultValue={search}
        />
      </div>
      <div className="flex justify-end">
        <Options pageCount={size} />
      </div>
      <Suspense key={search + currentPage} fallback={<TableLoading />}>
        <Table data={data} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          totalPages={Math.ceil(totalCount / Number(size))}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
