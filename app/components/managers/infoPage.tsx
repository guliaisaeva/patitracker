
"use client"
import {
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/components/button';
import Image from 'next/image';
import { selectManagerById ,getManagerByIdAsync,getAllCitiesAsync,selectCities, selectDistricts, getAllDistrictsAsync} from '@/lib/features/managers/managersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function ManagersInfoForm({ managerId }: { managerId: string} ) {

  const dispatch = useDispatch<AppDispatch>();
  const selectedManagerById = useSelector(selectManagerById);
  const cities = useSelector(selectCities);
  const districts = useSelector(selectDistricts);
  const [selectedCityId, setSelectedCityId] = useState<any | null>(
    selectedManagerById?.userAddressModel?.cityId || null
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<any | null>(
    selectedManagerById?.userAddressModel?.districtId || null
  );

  useEffect(() => {
    if ({managerId}) {
      dispatch(getManagerByIdAsync(managerId));
    }
  }, [dispatch, managerId]);
  useEffect(() => {
 
      dispatch(getAllCitiesAsync());
  
  }, [dispatch]);

  useEffect(() => {
    if (selectedCityId !== null) {
      dispatch(getAllDistrictsAsync(selectedCityId));
    }
  }, [dispatch, selectedCityId]);

  if (!selectedManagerById) {
    return <div>Loading...</div>; 
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here if needed
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = parseInt(e.target.value);
    setSelectedCityId(cityId);
    setSelectedDistrictId(null); 
  };


  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = parseInt(e.target.value);
    setSelectedDistrictId(districtId);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Display Profile Image */}
        <div className="mb-4 flex items-center justify-center">
          {selectedManagerById?.profileImageUrl ? (
            <div className="relative w-20 h-20 rounded-full  overflow-hidden">
              <Image
                src={selectedManagerById.profileImageUrl}
                layout="fill"
                objectFit="contain"
                alt={`${selectedManagerById.firstName}'s profile picture`}
              />
            </div>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
              <span className="text-gray-600 text-lg">{selectedManagerById?.firstName?.charAt(0)}</span>
            </div>
          )}
        </div>


        <div className="mb-4">
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            Yönetici İsmi
          </label>
          <div className="relative">
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={selectedManagerById?.firstName || ''}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="userName-error"
              readOnly
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="userName-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            Yönetici İsmi
          </label>
          <div className="relative">
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={selectedManagerById?.lastName || ''}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="userName-error"
              readOnly
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="userName-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Yönetici E-postası
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                value={selectedManagerById?.email || ''}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="fullName-error"
                readOnly
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="fullName-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium">
Yötetici Telefon Numarası         </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                defaultValue={selectedManagerById?.phoneNumber || ''}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
                readOnly
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>

        <label htmlFor="userAddressModel" className="mb-2 block text-sm font-medium flex justify-center">
        Yönetici Adres Bilgileri            </label>
    
        <div className="mb-4">
          <label htmlFor="userCity" className="mb-2 block text-sm font-medium">
İl      </label>
          <div className="relative mt-2 rounded-md">
    
            <select
           id="userCity"
              name="userCity"
              value={selectedCityId || ''}
              onChange={handleCityChange}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            >
              <option value="">İl Seçin</option>
              {cities?.map((city) => (
                <option key={city?.cityId} value={city?.cityId}>
                  {city.cityName} 
                </option>
              ))}
            </select>
          </div>
          <div id="phoneNumber-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
          <label htmlFor="districtId" className="mb-2 block text-sm font-medium">
İlçe      </label>
          <div className="relative mt-2 rounded-md">
    
            <select
         id="userDistrict"
         name="userDistrict"
         value={selectedDistrictId || ''}
           onChange={handleDistrictChange}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            >
         <option value="">İlçe Seçin</option>
              {districts?.map((district) => (
                <option key={district?.districtId} value={district?.districtId}>
                  {district.districtName}
                </option>
              ))}
            </select>
          </div>
          <div id="phoneNumber-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
        

 
 

      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/devices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Kapat
        </Link>
        {/* <Button type="submit">Edit Device</Button> */}
      </div>
    </form>
  );
}


