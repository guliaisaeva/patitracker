
// "use client";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addDeviceAsync,
//   selectDevicesStatus,
//   selectDevicesError,
//   DeviceToAdd,
// } from "@/lib/features/devices/addDeviceSlice";
// import { AppDispatch } from "@/lib/store";
// import { useRouter } from "next/navigation";
// import { addPetType, AddPetType, fetchLanguages, selectLanguages } from "@/lib/features/pet/petTypesSlice";
// import Image from "next/image";

// export default function Form() {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();
//   const status = useSelector(selectDevicesStatus);
//   const error = useSelector(selectDevicesError);
//   const languages = useSelector(selectLanguages);


//   const [petTypeData, setPetTypeData] = useState<AddPetType>({
//     petType: '',
//     languageId: 1,
//   });
//   const [petTypeDataEn, setPetTypeDataEn] = useState<AddPetType>({
//     petType: '',
//     languageId: 2,
//   });

//   // useEffect(() => {
//   //   if()
//   //   dispatch(fetchLanguages());
//   // }, [dispatch]);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       if (petTypeData.petType && petTypeDataEn.petType) {
//         // Handle case where both Turkish and English inputs are filled
//         await Promise.all([
//           dispatch(addPetType(petTypeData)),
//           dispatch(addPetType(petTypeDataEn)),
//         ]);
//       } else if (petTypeData.petType) {
//         // Only Turkish input is filled
//         await dispatch(addPetType(petTypeData));
//       } else if (petTypeDataEn.petType) {
//         // Only English input is filled
//         await dispatch(addPetType(petTypeDataEn));
//       } else {
//         // Handle case where neither input is filled (optional)
//         alert("Please fill at least one pet type.");
//         return;
//       }

//       // Reset the form inputs after successful submission
//       setPetTypeData({
//         petType: '',
//         languageId: 1,
//       });
//       setPetTypeDataEn({
//         petType: '',
//         languageId: 2,
//       });

//       alert('Pet types added successfully');
//       router.replace('/dashboard/pets/petType');

//     } catch (err) {
//       console.error('Failed to add pet types:', err);
//       alert('Failed to add pet types');
//     }
//   };
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === 'petType_tr') {
//       setPetTypeData((prevData) => ({
//         ...prevData,
//         petType: value,
//       }));
//     } else if (name === 'petType_en') {
//       setPetTypeDataEn((prevData) => ({
//         ...prevData,
//         petType: value,
//       }));
//     }
//   };


//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         <div className="mb-4">
//           <label htmlFor="petType_tr" className="mb-2 flex flex-row items-center gap-3 text-sm font-medium">
//           <Image
//           src="/turkey.png" 
//           alt="Turkish Flag"
//           width={36}
//           height={36}
//           objectFit="cover"      
//            className="rounded-full"
//         />   Yeni Evcil Hayvan Türü        </label>
         
//           <input
//             type="text"
//             id="petType_tr"
//             name="petType_tr"
//             value={petTypeData.petType}
//             onChange={handleChange}
//             className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//             placeholder="Örn:Köpek"
//           />
//          </div>
      
//          <div className="mb-4">
//           <label htmlFor="petType_en" className="mb-2 flex flex-row items-center gap-3 text-sm font-medium">
//           <Image
//           src="/uk.png" 
//           alt="Turkish Flag"
//           width={36}
//           height={36}
//           objectFit="cover"      
//            className="rounded-full"
//         />   New Pet Type        </label>
         
//           <input
//             type="text"
//             id="petType_en"
//             name="petType_en"
//             value={petTypeDataEn.petType}
//             onChange={handleChange}
//             className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            
//             placeholder="Exp: Dog"

//           />
//          </div>
   
//         {status === "failed" && error && (
//           <div className="mb-4 text-red-500">{error}</div>
//         )}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={status === "loading"}
//           >
//             {status === "loading" ? "Creating..." : "Add Pet Type(s)"}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPetBreed,
  getAllPetBreeds,
  selectPetBreeds,
} from "@/lib/features/pet/petBreedSlice";
import Image from "next/image";
import { AppDispatch } from "@/lib/store";
import { getAllPetTypes, selectPetTypes } from "@/lib/features/pet/petTypesSlice";


export default function Form() {
  const dispatch = useDispatch<AppDispatch>();
  const petTypes = useSelector(selectPetTypes);
  const petBreeds = useSelector(selectPetBreeds);

  const [selectedPetType, setSelectedPetType] = useState<string>(''); // State to hold selected pet type ID

  const [petTypeData, setPetTypeData] = useState({
    petType: '',
    languageId: 1, // Turkish language ID
    petBreedId: 0,
    breedName: '',
  });

  const [petTypeDataEn, setPetTypeDataEn] = useState({
    petType: '',
    languageId: 2, // English language ID
    petBreedId: 0,
    breedName: '',
  });

  useEffect(() => {
    dispatch(getAllPetTypes());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPetType) {
      dispatch(getAllPetBreeds(selectedPetType));
    }
  }, [dispatch, selectedPetType]);

  const handlePetTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = event.target.value;
    setSelectedPetType(typeId);

    // Reset pet breed selection when pet type changes
    setPetTypeData(prevData => ({
      ...prevData,
      petBreedId: 0,
    }));
    setPetTypeDataEn(prevData => ({
      ...prevData,
      petBreedId: 0,
    }));
  };



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'petType_tr') {
      setPetTypeData(prevData => ({
        ...prevData,
        breedName: value,
      }));
    } else if (name === 'petType_en') {
      setPetTypeDataEn(prevData => ({
        ...prevData,
        breedName: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Add Turkish pet breed if fields are filled
      if (petTypeData.breedName && petTypeData.petBreedId) {
        await dispatch(addPetBreed({
          breedId: Number(petTypeData.petBreedId),
          languageId: petTypeData.languageId,
          breedName: petTypeData.breedName,
          petTypeId: 0
        }));
      }

      // Add English pet breed if fields are filled
      if (petTypeDataEn.breedName && petTypeDataEn.petBreedId) {
        await dispatch(addPetBreed({
          breedId: Number(petTypeDataEn.petBreedId),
          languageId: petTypeDataEn.languageId,
          breedName: petTypeDataEn.breedName,
          petTypeId: 0
        }));
      }

      // Reset the form inputs after successful submission
      setPetTypeData({
        petType: '',
        languageId: 1,
        petBreedId: 0,
        breedName: '',
      });
      setPetTypeDataEn({
        petType: '',
        languageId: 2,
        petBreedId: 0,
        breedName: '',
      });

      alert('Pet breeds added successfully');
    } catch (err) {
      console.error('Failed to add pet breeds:', err);
      alert('Failed to add pet breeds');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
        <div className="mb-4">
          <label htmlFor="petType_tr" className="mb-2 flex flex-row items-center gap-3 text-sm font-medium">
            <Image
              src="/turkey.png"
              alt="Turkish Flag"
              width={36}
              height={36}
              objectFit="cover"
              className="rounded-full"
            />
            Yeni Evcil Hayvan Cinsi
          </label>
          <input
            type="text"
            id="petType_tr"
            name="petType_tr"
            value={petTypeData.breedName}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder="Örn: Köpek"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="petType_en" className="mb-2 flex flex-row items-center gap-3 text-sm font-medium">
            <Image
              src="/uk.png"
              alt="English Flag"
              width={36}
              height={36}
              objectFit="cover"
              className="rounded-full"
            />
            New Pet Type
          </label>
          <input
            type="text"
            id="petType_en"
            name="petType_en"
            value={petTypeDataEn.breedName}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder="Exp: Dog"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Pet Breed(s)
          </button>
        </div>
      </div>
    </form>
  );
}
