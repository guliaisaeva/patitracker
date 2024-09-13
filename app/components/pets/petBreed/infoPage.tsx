"use client";
import { PetsOutlined } from "@mui/icons-material";
import Link from "next/link";
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
  selectBreedDetail,
  selectPetBreeds,
  updatePetBreed,
} from "@/lib/features/pet/petBreedSlice";
import { Button } from "../../button";
import { useTranslation } from "react-i18next";

import {
  fetchLanguages,
  selectLanguages,
} from "@/lib/features/languages/languagesSlice";

interface FormProps {
  selectedPetType: string;
  breedId: number;
}

export default function InfoBreedForm({ breedId, selectedPetType }: FormProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const petTypes = useSelector(selectPetTypes);
  const languages = useSelector(selectLanguages);

  const selectedBreedDetail = useSelector(selectBreedDetail);
  const [formState, setFormState] = useState<{
    breedId: number | null;
    petTypeId: number | null;
    breedName: string;
    petBreedsLocalized: { languageId: number; breedName: string }[];
  }>({
    breedId: breedId,
    petTypeId: Number(selectedPetType),
    breedName: "",
    petBreedsLocalized: [],
  });

  useEffect(() => {
    dispatch(getAllPetTypes());
    dispatch(fetchLanguages());
  }, []);

  useEffect(() => {
    if (breedId) {
      dispatch(getPetBreedDetail(breedId));
    }
  }, [breedId]);

  useEffect(() => {
    if (selectedBreedDetail) {
      setFormState({
        breedId: selectedBreedDetail.breedId || null,
        breedName: selectedBreedDetail.breedName || "",
        petTypeId: selectedBreedDetail.petTypeId || null,
        petBreedsLocalized:
          selectedBreedDetail.languages.map((lang: any) => ({
            languageId: lang.id || 0,
            breedName: lang.text || "",
          })) || [],
      });
    }
  }, [selectedBreedDetail]);

  if (!formState.breedId) {
    return <div>{t("load")}</div>;
  }
  return (
    <form className="my-6">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="petTypeId" className="mb-2 block text-sm font-medium">
            {t("petType.petTypes")}{" "}
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              id="petTypeId"
              name="petTypeId"
              defaultValue={formState.petTypeId?.toString()}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              aria-readonly
            >
              <option defaultValue="">{t("petBreed.select.petType")}</option>
              {petTypes.map((petType) => (
                <option key={petType.typeId} defaultValue={petType.typeId}>
                  {petType.typeName}
                </option>
              ))}
            </select>
          </div>
          <div id="petTypeId-error" aria-live="polite" aria-atomic="true"></div>
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
            defaultValue={formState.breedName}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder={t("petBreed.form.enterPetType")}
            readOnly
          />
          {/* {errors.breedName && (
            <p className="text-red-500 text-sm mt-1">{errors.breedName}</p>
          )} */}
        </div>
        {languages.map((language) => {
          const localizedBreed = formState.petBreedsLocalized.find(
            (locale) => locale.languageId === language.languageId
          );

          return (
            <div className="mb-4" key={language.languageId}>
              <label
                htmlFor={`breedName${language.languageId}`}
                className="mb-2 block text-sm font-medium flex flex-row items-center gap-3 justify-between"
              >
                {t("petBreed.form.newPetType")}
                <p>
                  {language.languageAbbreviation}/{language.languageName}
                </p>
              </label>
              <div className="relative">
                <input
                  id={`breedName${language.languageId}`}
                  name={`breedName${language.languageId}`}
                  type="text"
                  defaultValue={localizedBreed ? localizedBreed.breedName : ""}
                  className="text-gray-500 peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  readOnly
                />
                <PetsOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          );
        })}
      </div>
      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/pets/petBreed"
          className="flex h-10 items-center rounded-lg bg-green-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          {t("close")}
        </Link>
      </div>
    </form>
  );
}
