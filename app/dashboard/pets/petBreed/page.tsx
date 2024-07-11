"use client"

import Pagination from '@/app/components/managers/pagination';
import Search from '@/app/components/search';
import Table from '@/app/components/pets/petType/table';
import { CreatePetType } from '@/app/components/pets/petType/buttons';
import { lusitana } from '@/app/components/fonts';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectPetTypes } from '@/lib/features/pet/petTypesSlice';
const ITEMS_PER_PAGE = 10; 
export default  function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
const petTypes = useSelector(selectPetTypes);
const totalPetTypes = petTypes ? petTypes.length : 0;
const totalPages = Math.ceil(totalPetTypes / ITEMS_PER_PAGE);


return (
  <>
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Evcil Hayvan Türü</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Evcil Hayvan Türü Ara..." />
        <CreatePetType />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
  
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>

</>
  );
}
