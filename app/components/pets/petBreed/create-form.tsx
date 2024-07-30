"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  addPetBreed,
  getAllPetBreeds,
  selectPetBreeds,
} from "@/lib/features/pet/petBreedSlice";
import Image from "next/image";
import { AppDispatch } from "@/lib/store";
import {
  getAllPetTypes,
  selectPetTypes,
} from "@/lib/features/pet/petTypesSlice";
import { useTranslation } from "react-i18next";
import trFlag from "@/public/images/turkey.png";
import ukFlag from "@/public/images/uk.png";
import Link from "next/link";
interface FormProps {
  selectedPetType: string; // Receive selected pet type from parent component or context
}
export default function Form({ selectedPetType }: FormProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const petTypes = useSelector(selectPetTypes);
  const petBreeds = useSelector(selectPetBreeds);
  // const [selectedPetType, setSelectedPetType] = useState<string>(""); // State to hold selected pet type ID

  const [petBreedData, setPetBreedData] = useState({
    breedName: "",
    languageId: 1, // Turkish language ID
  });

  const [petBreedDataEn, setPetBreedDataEn] = useState({
    breedName: "",
    languageId: 2, // English language ID
  });

  useEffect(() => {
    dispatch(getAllPetTypes());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPetType) {
      dispatch(getAllPetBreeds(selectedPetType));
    }
  }, [dispatch, selectedPetType]);

  // const handlePetTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const typeId = event.target.value;
  //   setSelectedPetType(typeId);
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "breedName_tr") {
      setPetBreedData((prevData) => ({
        ...prevData,
        breedName: value,
      }));
    } else if (name === "breedName_en") {
      setPetBreedDataEn((prevData) => ({
        ...prevData,
        breedName: value,
      }));
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (petBreedData.breedName && selectedPetType) {
        dispatch(
          addPetBreed({
            petTypeId: Number(selectedPetType),
            languageId: petBreedData.languageId,
            breedName: petBreedData.breedName,
          })
        );
      }

      if (petBreedDataEn.breedName && selectedPetType) {
        dispatch(
          addPetBreed({
            petTypeId: Number(selectedPetType),
            languageId: petBreedDataEn.languageId,
            breedName: petBreedDataEn.breedName,
          })
        );
      }

      setPetBreedData({
        breedName: "",
        languageId: 1,
      });
      setPetBreedDataEn({
        breedName: "",
        languageId: 2,
      });

      alert(t("petBreed.messages.createSuccess"));
      router.replace(
        `/dashboard/pets/petBreed?selectedPetType=${selectedPetType}`
      );
    } catch (err) {
      console.error("Failed to add pet breeds:", err);
      alert(t("petBreed.messages.createFailure"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* <div className="mb-6 block w-full ">
          <select
            value={selectedPetType}
            onChange={handlePetTypeChange}
            className="text-gray-600 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          >
            <option value="">{t("petBreed.select.petType")}</option>
            {petTypes.map((petType) => (
              <option key={petType.typeId} value={petType.typeId.toString()}>
                {petType.typeName}
              </option>
            ))}
          </select>
        </div> */}
        <div className="mb-4">
          <label
            htmlFor="breedName_tr"
            className="mb-2 flex flex-row items-center gap-3 text-sm font-medium"
          >
            <Image
              src={trFlag}
              alt="Turkish Flag"
              width={36}
              height={36}
              className="rounded-full"
            />
            {t("petBreed.form.newPetType")}
          </label>
          <input
            type="text"
            id="breedName_tr"
            name="breedName_tr"
            value={petBreedData.breedName}
            onChange={handleChange}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder={t("petBreed.form.enterPetTypeTr")}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="breedName_en"
            className="mb-2 flex flex-row items-center gap-3 text-sm font-medium"
          >
            <Image
              src={ukFlag}
              alt="English Flag"
              width={36}
              height={36}
              className="rounded-full"
            />
            {t("petBreed.form.newPetType")}
          </label>
          <input
            type="text"
            id="breedName_en"
            name="breedName_en"
            value={petBreedDataEn.breedName}
            onChange={handleChange}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder={t("petBreed.form.enterPetTypeEn")}
          />
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/pets/petBreed"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            {t("cancel")}
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {t("petBreed.submit.create")}{" "}
          </button>
        </div>
      </div>
    </form>
  );
}
