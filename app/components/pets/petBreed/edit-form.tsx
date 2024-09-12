"use client";
import { PetsOutlined, LanguageOutlined } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAllPetTypes,
  selectPetTypes,
} from "@/lib/features/pet/petTypesSlice";
import {
  getPetBreedDetail,
  PetBreed,
  selectBreedDetail,
  updatePetBreed,
} from "@/lib/features/pet/petBreedSlice";
import { Button } from "../../button";
import { useTranslation } from "react-i18next";
import trFlag from "@/public/images/turkey.png";
import ukFlag from "@/public/images/uk.png";
import {
  fetchLanguages,
  selectLanguages,
} from "@/lib/features/languages/languagesSlice";

export default function UpdateBreedForm({ breedId }: { breedId: number }) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const petTypes = useSelector(selectPetTypes);
  const languages = useSelector(selectLanguages);

  const selectedBreedDetail = useSelector(selectBreedDetail);
  const [formState, setFormState] = useState<PetBreed>({
    breedId: 0,
    petTypeId: 0,
    breedName: "",
    petBreedsLocalized: [],
  });

  useEffect(() => {
    dispatch(getAllPetTypes());
    dispatch(fetchLanguages());

    if (breedId) {
      dispatch(getPetBreedDetail(breedId));
    }
  }, [dispatch, breedId]);

  useEffect(() => {
    if (selectedBreedDetail) {
      setFormState({
        breedId: selectedBreedDetail.breedId || 0,
        breedName: selectedBreedDetail.breedName || "",
        petTypeId: selectedBreedDetail.petTypeId || 0,
        petBreedsLocalized: selectedBreedDetail.languages.map((lang: any) => ({
          languageId: lang.id,
          breedName: lang.text,
        })),
      });
    }
  }, [selectedBreedDetail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevState: PetBreed) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLocalizedChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormState((prevState) => {
        const newPetBreedsLocalized = [...prevState.petBreedsLocalized];
        newPetBreedsLocalized[index] = {
          ...newPetBreedsLocalized[index],
          [name]: value,
        };
        return {
          ...prevState,
          petBreedsLocalized: newPetBreedsLocalized,
        };
      });
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.breedName && formState.petTypeId) {
      try {
        dispatch(updatePetBreed(formState));
        alert(t("petBreed.messages.updateSuccess"));
        router.replace(
          `/dashboard/pets/petBreed?selectedPetType=${formState.petTypeId}`
        );
      } catch (error) {
        alert(t("petBreed.messages.updateFailure"));
        console.error("Update Pet Breed Error:", error);
      }
    } else {
      alert("Please fill out all required fields.");
    }
  };
  if (!formState.breedId) {
    return <div>{t("load")}</div>;
  }

  return (
    <form className="my-6" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="petTypeId" className="mb-2 block text-sm font-medium">
            {t("petType.petTypes")}{" "}
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              id="petTypeId"
              name="petTypeId"
              value={formState.petTypeId}
              onChange={handleSelectChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            >
              <option value="">{t("petBreed.select.petType")}</option>
              {petTypes.map((petType) => (
                <option key={petType.typeId} value={petType.typeId}>
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
          <label
            htmlFor="breedName"
            className="mb-2 flex flex-row items-center gap-3 text-sm font-medium justify-between"
          >
            {t("petBreed.form.newPetType")}
          </label>
          <input
            type="text"
            id="breedName"
            name="breedName"
            value={formState.breedName}
            onChange={handleInputChange}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder={t("petBreed.form.enterPetType")}
            required
          />
          {/* {errors.breedName && (
            <p className="text-red-500 text-sm mt-1">{errors.breedName}</p>
          )} */}
        </div>
        <div className="mb-4">
          <label htmlFor="breedName" className="mb-2 block text-sm font-medium">
            <Image
              src={trFlag}
              alt="Turkish Flag"
              width={36}
              height={36}
              className="rounded-full"
            />
            {t("petBreed.form.newPetType")}{" "}
          </label>
          <div className="relative">
            <input
              id="breedName"
              name="breedName"
              type="text"
              value={
                formState.petBreedsLocalized.find(
                  (locale) => locale.languageId === 1
                )?.breedName || ""
              }
              className="text-gray-500 peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="breedName-error"
              onChange={handleLocalizedChange(1)}
              // placeholder={t("petBreed.form.enterPetTypeTr")}
            />
            <PetsOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="breedName-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="breedName" className="mb-2 block text-sm font-medium">
            <Image
              src={ukFlag}
              alt="Turkish Flag"
              width={36}
              height={36}
              className="rounded-full"
            />
            {t("petBreed.form.newPetType")}{" "}
          </label>
          <div className="relative">
            <input
              id="breedName"
              name="breedName"
              type="text"
              value={
                formState.petBreedsLocalized.find(
                  (locale) => locale.languageId === 2
                )?.breedName || ""
              }
              className="text-gray-500 peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="breedName-error"
              onChange={handleLocalizedChange(2)}
              // placeholder={t("petBreed.form.enterPetTypeEn")}
            />
            <PetsOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="breedName-error" aria-live="polite" aria-atomic="true">
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
          {t("cancel")}
        </Link>
        <Button type="submit">{t("update")}</Button>
      </div>
    </form>
  );
}
