"use client"
import Pagination from '@/app/components/managers/pagination';
import Search from '@/app/components/search';
import Table from '@/app/components/devices/table';
import { CreateDevice } from '@/app/components/devices/buttons';
import { lusitana } from '@/app/components/fonts';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';

import { selectDevices,getDevicesAsync } from '@/lib/features/devices/devicesSlice';

// export const metadata: Metadata = {
//   title: 'Devices',
// };
const ITEMS_PER_PAGE = 20; 

export default  function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const dispatch = useDispatch<AppDispatch>();

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
//   const totalPages = await fetchInvoicesPages(query);
const devices = useSelector(selectDevices);
  const totalDevices = devices ? devices.length : 0;
const totalPages = Math.ceil(totalDevices / ITEMS_PER_PAGE);

useEffect(() => {
  dispatch(getDevicesAsync());
}, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Cihazlar</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Cihaz Ara..." />
        <CreateDevice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages}/>
      </div>
    </div>
  );
}
