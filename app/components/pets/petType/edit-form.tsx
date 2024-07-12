"use client"
// import { PetsOutlined,LanguageOutlined } from '@mui/icons-material';
// import Link from 'next/link';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch} from '@/lib/store';
// import { useEffect, useState} from 'react';
// import { getPetDetail, PetType, selectLanguages,fetchLanguages, selectPetDetail ,updatePetType, UpdatePetType} from '@/lib/features/pet/petTypesSlice';
// import { Button } from '../../button';


// export default function EditPetsForm({PetTypeId }: { PetTypeId: number}) {
//   const dispatch = useDispatch<AppDispatch>();
//   const selectedPetTypeById = useSelector(selectPetDetail);
//   const languages = useSelector(selectLanguages);
//   const [formState, setFormState] = useState<PetType | null>(null);
//   useEffect(() => {
//     if (PetTypeId) {
//       dispatch(getPetDetail(PetTypeId));
//     }
//   }, [dispatch, PetTypeId]);

//   useEffect(() => {
//     dispatch(fetchLanguages());
//   }, [dispatch]);

//   useEffect(() => {
//     if (selectedPetTypeById) {
//       setFormState(selectedPetTypeById);
//     }
//   }, [selectedPetTypeById]);



//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (formState && validateFormState(formState)) {
//       try {
//         await dispatch(updatePetType(formState)).unwrap();
//         alert('Pet type updated successfully.');
//       } catch (error) {
//         alert('Failed to update pet type. Please try again.');
//         console.error('Update Pet Type Error:', error);
//       }
//     } else {
//       alert('Please fill out all required fields.');
//     }
//   };

//   const validateFormState = (formState: PetType): boolean => {
//     // Example validation logic; adjust as per your actual requirements
//     return !!formState.typeName && !!formState.typeId;
//   };
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormState(prevState => (prevState ? { ...prevState, [name]: value } : null));
//   };

//   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { value } = e.target;
//     setFormState(prevState => (prevState ? { ...prevState, languageId: parseInt(value) } : null));
//   };

//   if (!formState) {
//     return <div>Loading...</div>;
//   }
  
//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
  
//         <div className="mb-4">
//           <label htmlFor="typeName" className="mb-2 block text-sm font-medium">
//             Evcil Hayvan Tür İsmi
//           </label>
//           <div className="relative">
//             <input
//               id="typeName"
//               name="typeName"
//               type="text"
//               value={formState?.typeName || ''}
//               className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               aria-describedby="userName-error"
//               onChange={handleInputChange}
//             />
//             <PetsOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//           <div id="userName-error" aria-live="polite" aria-atomic="true">
//             {/* Error handling if needed */}
//           </div>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="typeId" className="mb-2 block text-sm font-medium">
// Evcil Hayvan ID          </label>
//           <div className="relative">
//             <input
//               id="typeId"
//               name="typeId"
//               type="text"
//               value={formState?.typeId }
//               onChange={handleInputChange}
//               className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               aria-describedby="userName-error"
//             />
//             <PetsOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//           <div id="userName-error" aria-live="polite" aria-atomic="true">
//             {/* Error handling if needed */}
//           </div>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="languageId" className="mb-2 block text-sm font-medium">
//        Dil
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//             <select
//                 id="languageId"
//                 name="languageId"
//                 value={formState?.languageId}
//                 onChange={handleLanguageChange}
//                 className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//               >
//                 <option value="">Dil Seçin</option>
//                 {languages?.map((language) => (
//                 <option
//                   key={language?.languageId}
//                   value={language.languageId.toString()}
//                 >
//                   {language.languageName}
//                 </option>
//               ))}
//               </select>
//             </div>
//           </div>
//           <div id="fullName-error" aria-live="polite" aria-atomic="true">
//             {/* Error handling if needed */}
//           </div>
//         </div>

//       </div>

//       {/* Action Buttons */}
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/pets/petType"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Güncelle
//         </Link>
//         <Button type="submit">Edit Device</Button>
//       </div>
//     </form>

import { PetsOutlined, LanguageOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { useEffect, useState } from 'react';
import { getPetDetail, PetType, selectLanguages, fetchLanguages, selectPetDetail, updatePetType, UpdatePetType } from '@/lib/features/pet/petTypesSlice';
import { Button } from '../../button';
import { useRouter } from "next/navigation";

export default function EditPetsForm({ PetTypeId }: { PetTypeId: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const selectedPetTypeById = useSelector(selectPetDetail);
  const languages = useSelector(selectLanguages);
  const [formState, setFormState] = useState<UpdatePetType | null>(null);

  useEffect(() => {
    if (PetTypeId) {
      dispatch(getPetDetail(PetTypeId));
    }
  }, [dispatch, PetTypeId]);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPetTypeById) {
      setFormState({
        petTypeId: selectedPetTypeById?.typeId,
        languageId: selectedPetTypeById?.languageId,
        petType: selectedPetTypeById?.typeName
      });
    }
  }, [selectedPetTypeById]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState && validateFormState(formState)) {
      try {
        await dispatch(updatePetType(formState));
      
      alert('Pet type updated successfully.');
      router.replace('/dashboard/pets/petType');

    } catch (error) {
        alert('Failed to update pet type. Please try again.');
        console.error('Update Pet Type Error:', error);
      }
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const validateFormState = (formState: UpdatePetType): boolean => {
    return !!formState?.petType && !!formState?.petTypeId && !!formState?.languageId;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState: any) => (prevState ? { ...prevState, [name]: value } : null));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormState((prevState: any) => (prevState ? { ...prevState, languageId: parseInt(value) } : null));
  };

  if (!formState) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="petType" className="mb-2 block text-sm font-medium">
            Evcil Hayvan Tür İsmi
          </label>
          <div className="relative">
            <input
              id="petType"
              name="petType"
              type="text"
              value={formState?.petType || ''}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="userName-error"
              onChange={handleInputChange}
            />
            <PetsOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="userName-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="petTypeId" className="mb-2 block text-sm font-medium">
            Evcil Hayvan ID
          </label>
          <div className="relative">
            <input
              id="petTypeId"
              name="petTypeId"
              type="number"
              value={formState?.petTypeId}
              onChange={handleInputChange}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="userName-error"
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
              <select
                id="languageId"
                name="languageId"
                value={formState?.languageId}
                onChange={handleLanguageChange}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              >
                <option value="">Dil Seçin</option>
                {languages?.map((language) => (
                  <option
                    key={language?.languageId}
                    value={language.languageId.toString()}
                  >
                    {language.languageName}
                  </option>
                ))}
              </select>
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
          Cancel
        </Link>
        <Button type="submit">Edit Pet Type</Button>
      </div>
    </form>
  );
}