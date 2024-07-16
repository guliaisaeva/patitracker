// "use client";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllPetBreeds,
//   updatePetBreed,
//   selectPetBreeds,
// } from "@/lib/features/pet/petBreedSlice";
// import { AppDispatch } from "@/lib/store";
// import { getAllPetTypes, selectPetTypes } from "@/lib/features/pet/petTypesSlice";

// export default function UpdateBreedForm({ PetBreedId }: { PetBreedId: number }) {
//   const dispatch = useDispatch<AppDispatch>();
//   const petTypes = useSelector(selectPetTypes);

//   const [petBreedData, setPetBreedData] = useState({
//     breedId: 0,
//     breedName: '',
//     petTypeId: 0,
//     languageId: 1, // Turkish language ID
//   });

//   useEffect(() => {
//     dispatch(getAllPetTypes());
//   }, [dispatch]);

//   const handlePetTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const typeId = Number(event.target.value);
//     setPetBreedData(prevData => ({
//       ...prevData,
//       petTypeId: typeId,
//     }));
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setPetBreedData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       await dispatch(updatePetBreed(petBreedData));
//       alert('Pet breed updated successfully');
//     } catch (err) {
//       console.error('Failed to update pet breed:', err);
//       alert('Failed to update pet breed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         <div className="flex mt-6 gap-4">
//           <select
//             value={petBreedData.petTypeId !== 0 ? petBreedData.petTypeId.toString() : ''}
//             onChange={handlePetTypeChange}
//             className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//           >
//             <option value="">Select Pet Type</option>
//             {petTypes.map((petType) => (
//               <option key={petType.typeId} value={petType.typeId.toString()}>
//                 {petType.typeName}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mt-4">
//           <input
//             type="text"
//             name="breedName"
//             value={petBreedData.breedName}
//             onChange={handleChange}
//             className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//             placeholder="Enter Breed Name"
//           />
//         </div>
//         <button
//           type="submit"
//           className="mt-4 w-full rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
//         >
//           Update Pet Breed
//         </button>
//       </div>
//     </form>
//   );
// }



"use client";
import { PetsOutlined, LanguageOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import {
  getAllPetTypes,
  selectPetDetail,
  selectPetTypes,
} from "@/lib/features/pet/petTypesSlice";
import {
  getPetBreedDetail,
  selectBreedDetail,
  updatePetBreed,
} from "@/lib/features/pet/petBreedSlice";
import { Button } from '../../button';

export default function UpdateBreedForm({ breedId }: { breedId: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const petTypes = useSelector(selectPetTypes);
  const selectedBreedDetail = useSelector(selectBreedDetail);
  const [formState, setFormState] = useState({
    breedId: 0,
    breedName: '',
    petTypeId: 0,
    languageId: 1,
  });

  useEffect(() => {
    dispatch(getAllPetTypes());
    if (breedId) {
      dispatch(getPetBreedDetail(breedId));
    }
  }, [dispatch, breedId]);

  useEffect(() => {
    if (selectedBreedDetail) {
      setFormState({
        breedId: selectedBreedDetail.breedId || 0,        breedName: selectedBreedDetail.breedName,
        petTypeId: selectedBreedDetail.petTypeId,
        languageId: selectedBreedDetail.languageId,
      });
    }
  }, [selectedBreedDetail]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.breedName && formState.petTypeId) {
      try {
        await dispatch(updatePetBreed(formState));
        alert('Pet breed updated successfully.');
        router.replace('/dashboard/pets/petBreed');
      } catch (error) {
        alert('Failed to update pet breed. Please try again.');
        console.error('Update Pet Breed Error:', error);
      }
    } else {
      alert('Please fill out all required fields.');
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!formState.breedId) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="breedName" className="mb-2 block text-sm font-medium">
            Evcil Hayvan Tür İsmi
          </label>
          <div className="relative">
            <input
              id="breedName"
              name="breedName"
              type="text"
              value={formState.breedName}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="breedName-error"
              onChange={handleInputChange}
            />
            <PetsOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="breedName-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="petTypeId" className="mb-2 block text-sm font-medium">
            Evcil Hayvan Türü
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              id="petTypeId"
              name="petTypeId"
              value={formState.petTypeId}
              onChange={handleInputChange}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            >
              <option value="">Tür Seçin</option>
              {petTypes.map((petType) => (
                <option
                  key={petType.typeId}
                  value={petType.typeId}
                >
                  {petType.typeName}
                </option>
              ))}
            </select>
          </div>
          <div id="petTypeId-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="languageId" className="mb-2 block text-sm font-medium">
            Dil
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              id="languageId"
              name="languageId"
              value={formState.languageId}
              onChange={handleInputChange}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            >
              <option value="1">Türkçe</option>
              <option value="2">İngilizce</option>
            </select>
          </div>
          <div id="languageId-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/pets/petBreed"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          İptal
        </Link>
        <Button type="submit">Güncelle</Button>
      </div>
    </form>
  );
}