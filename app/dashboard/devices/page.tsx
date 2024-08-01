"use client";
import Pagination from "@/app/components/managers/pagination";
import Search from "@/app/components/search";
import Table from "@/app/components/devices/table";
import { CreateDevice } from "@/app/components/devices/buttons";
import { lusitana } from "@/app/components/fonts";
import { InvoicesTableSkeleton } from "@/app/components/skeletons";
import { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  selectDevices,
  getDevicesAsync,
} from "@/lib/features/devices/devicesSlice";
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
  const devices = useSelector(selectDevices);
  const totalDevices = devices ? devices.length : 0;
  const [filteredResultsCount, setFilteredResultsCount] = useState(0);

  useEffect(() => {
    dispatch(getDevicesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (devices) {
      const filteredDevices = devices?.filter(
        (device) =>
          device.deviceNumber.toLowerCase().includes(query.toLowerCase()) ||
          device.deviceModel.toLowerCase().includes(query.toLowerCase()) ||
          device.simNumber.toLowerCase().includes(query.toLowerCase())
      ).length;
      setFilteredResultsCount(filteredDevices);
    }
  }, [devices, query]);
  const totalPages = Math.ceil(filteredResultsCount / ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>
          {t("device.devices")}
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={t("device.search.placeholder")} />
        <CreateDevice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      {filteredResultsCount > 0 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
