
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
  addPetType,
  fetchLanguages,
  selectLanguages,
} from "@/lib/features/pet/petTypesSlice";
import Image from "next/image";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";


export default function Form() {
  const dispatch =useDispatch<AppDispatch>();
  const router = useRouter();
  const [petTypeData, setPetTypeData] = useState({
    petType: '',
    languageId: 1, // Turkish language ID
  });
  const [petTypeDataEn, setPetTypeDataEn] = useState({
    petType: '',
    languageId: 2, // English language ID
  });

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      if (petTypeData.petType) {
        await dispatch(addPetType(petTypeData));
      }
      if (petTypeDataEn.petType) {
        await dispatch(addPetType(petTypeDataEn));
      }

      // Reset form fields after successful submission
      setPetTypeData({ petType: '', languageId: 1 });
      setPetTypeDataEn({ petType: '', languageId: 2 });
      alert('Pet types added successfully');
      router.replace('/dashboard/pets/petType');
    } catch (error) {
      console.error('Failed to add pet types:', error);
      alert('Failed to add pet types');
    }
  };

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;

    if (name === 'petType_tr') {
      setPetTypeData({ ...petTypeData, petType: value });
    } else if (name === 'petType_en') {
      setPetTypeDataEn({ ...petTypeDataEn, petType: value });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
            Yeni Evcil Hayvan Türü
          </label>
          <input
            type="text"
            id="petType_tr"
            name="petType_tr"
            value={petTypeData.petType}
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
            value={petTypeDataEn.petType}
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
            Add Pet Type(s)
          </button>
        </div>
      </div>
    </form>
  );
}
