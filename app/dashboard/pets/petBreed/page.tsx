"use client"

import Pagination from '@/app/components/managers/pagination';
import Search from '@/app/components/search';
import Table from '@/app/components/pets/petBreed/table';
import { CreatePetBreed } from '@/app/components/pets/petBreed/buttons';
import { lusitana } from '@/app/components/fonts';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPetTypes, selectLanguages, selectPetTypes } from '@/lib/features/pet/petTypesSlice';
import { AppDispatch } from '@/lib/store';
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
const petTypes = useSelector(selectPetTypes);


const totalPetTypes = petTypes ? petTypes.length : 0;
const totalPages = Math.ceil(totalPetTypes / ITEMS_PER_PAGE);

const [selectedPetType, setSelectedPetType] = useState<string>('');


useEffect(() => {
  dispatch(getAllPetTypes());
}, [dispatch]);


const handlePetTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedPetType(event.target.value);
};

// const hasBreeds = useSelector(state => {
//   // Replace with actual selector logic to check if there are breeds for selectedPetType
//   const breeds = state.petBreeds.breedsByType[selectedPetType];
//   return breeds && breeds.length > 0;
// });

return (
  <>
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Evcil Hayvan Cinsi</h1>
      </div>
      <div className="flex mt-6 gap-4">
          <select
            value={selectedPetType}
            onChange={handlePetTypeChange}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            >
            <option value="">Evcil Hayvan Türü Seçiniz</option>
            {petTypes.map((petType) => (
              <option key={petType.typeId} value={petType.typeId.toString()}>
                {petType.typeName}
              </option>
            ))}
          </select>
        </div>
 
        {selectedPetType && (
          <>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
 
        <Search placeholder="Evcil Hayvan Cinsi Ara..." />
        <CreatePetBreed />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} selectedPetType={selectedPetType}  />
      </Suspense>
  
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      </>
        )}
    </div>

</>
  );
}
