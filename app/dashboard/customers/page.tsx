
"use client"
import Pagination from '@/app/components/managers/pagination';
import Search from '@/app/components/search';
import Table from '@/app/components/customers/table';
import { CreateDevice } from '@/app/components/devices/buttons';
import { lusitana } from '@/app/components/fonts';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { getUsersAsync, selectUsers } from '@/lib/features/users/usersSlice';


const ITEMS_PER_PAGE = 10; 

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
  const users = useSelector(selectUsers);
  const totalUsers = users ? users.length : 0;
  const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Kullanıcılar</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Kullanıcı Ara..." />
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
