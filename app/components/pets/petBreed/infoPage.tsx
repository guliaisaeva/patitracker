
"use client"
import { PetsOutlined,LanguageOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { useEffect, useState } from 'react';
import { getPetDetail, selectPetDetail } from '@/lib/features/pet/petTypesSlice';

export default function PetTypeInfoForm({PetTypeId }: { PetTypeId: number} ) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedPetTypeById = useSelector(selectPetDetail);

  const languageText =
  selectedPetTypeById?.languageId === 1
    ? 'Turkish'
    : selectedPetTypeById?.languageId === 2
    ? 'English'
    : '';

  useEffect(() => {
    if ({PetTypeId}) {
      dispatch(getPetDetail(PetTypeId));
    }
  }, [dispatch, PetTypeId]);




  if (!selectedPetTypeById) {
    return <div>Loading...</div>; 
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here if needed
  };





  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
  
        <div className="mb-4">
          <label htmlFor="typeName" className="mb-2 block text-sm font-medium">
            Evcil Hayvan Tür İsmi
          </label>
          <div className="relative">
            <input
              id="typeName"
              name="typeName"
              type="text"
              value={selectedPetTypeById?.typeName || ''}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="userName-error"
              readOnly
            />
            <PetsOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="userName-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="typeId" className="mb-2 block text-sm font-medium">
Evcil Hayvan ID          </label>
          <div className="relative">
            <input
              id="typeId"
              name="typeId"
              type="text"
              value={selectedPetTypeById?.typeId || ''}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="userName-error"
              readOnly
            />
            <PetsOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="userName-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="languageId" className="mb-2 block text-sm font-medium">
       Dil
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="languageId"
                name="languageId"
                type="text"
                value={languageText}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="fullName-error"
                readOnly
              />
              <LanguageOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="fullName-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/pets/petType"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Kapat
        </Link>
        {/* <Button type="submit">Edit Device</Button> */}
      </div>
    </form>
  );
}


