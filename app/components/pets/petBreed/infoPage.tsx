"use client";
import { PetsOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchLanguages,
  getAllPetTypes,
  selectLanguages,
  selectPetTypes,
} from "@/lib/features/pet/petTypesSlice";
import {
  getPetBreedDetail,
  selectBreedDetail,
} from "@/lib/features/pet/petBreedSlice";
import { useTranslation } from "react-i18next";

export default function InfoBreedForm({ breedId }: { breedId: number }) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const petTypes = useSelector(selectPetTypes);
  const languages = useSelector(selectLanguages);

  const selectedBreedDetail = useSelector(selectBreedDetail);
  const [formState, setFormState] = useState({
    breedId: 0,
    breedName: "",
    petTypeId: 0,
    languageId: 1,
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
        breedName: selectedBreedDetail.breedName,
        petTypeId: selectedBreedDetail.petTypeId,
        languageId: selectedBreedDetail.languageId,
      });
    }
  }, [selectedBreedDetail]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!formState.breedId) {
    return <div>{t("load")}</div>;
  }

  return (
    <form className="my-6" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="breedName" className="mb-2 block text-sm font-medium">
            {t("petType.form.petTypeTr")}{" "}
          </label>
          <div className="relative">
            <input
              id="breedName"
              name="breedName"
              type="text"
              value={formState.breedName}
              className="text-gray-500 peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="breedName-error"
              readOnly
            />
            <PetsOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="breedName-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="petTypeId" className="mb-2 block text-sm font-medium">
            {t("petType.petTypes")}{" "}
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              id="petTypeId"
              name="petTypeId"
              value={formState.petTypeId}
              onChange={handleInputChange}
              className="text-gray-600 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              disabled
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
            htmlFor="languageId"
            className="mb-2 block text-sm font-medium"
          >
            {t("petBreed.form.language")}{" "}
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              id="languageId"
              name="languageId"
              value={formState.languageId}
              onChange={handleInputChange}
              className="text-gray-600 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              disabled
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
          <div id="languageId-error" aria-live="polite" aria-atomic="true">
            {/* Error handling if needed */}
          </div>
        </div>
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
