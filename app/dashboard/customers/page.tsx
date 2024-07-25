"use client";
import Pagination from "@/app/components/managers/pagination";
import Search from "@/app/components/search";
import Table from "@/app/components/customers/table";
import { lusitana } from "@/app/components/fonts";
import { InvoicesTableSkeleton } from "@/app/components/skeletons";
import { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { getUsersAsync, selectUsers } from "@/lib/features/users/usersSlice";
import { CreateUser } from "@/app/components/customers/buttons";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 10;

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const users = useSelector(selectUsers);
  const totalUsers = users ? users.length : 0;
  const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>{t("user.users")}</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={t("user.search.placeholder")} />
        <CreateUser />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
