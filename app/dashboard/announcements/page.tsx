"use client";

import Pagination from "@/app/components/managers/pagination";
import Search from "@/app/components/search";
import Table from "@/app/components/announcements/table";
import { lusitana } from "@/app/components/fonts";
import { InvoicesTableSkeleton } from "@/app/components/skeletons";
import { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { CreateAnnouncement } from "@/app/components/announcements/buttons";
import {
  getAllAnnouncement,
  selectAnnouncements,
} from "@/lib/features/announcement/announceSlice";
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
  const announcements = useSelector(selectAnnouncements);
  const totalAnnouncements = announcements ? announcements.length : 0;
  const totalPages = Math.ceil(totalAnnouncements / ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(getAllAnnouncement());
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>
          {t("announcement.announcements")}
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={t("announcement.search.placeholder")} />
        <CreateAnnouncement />
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
