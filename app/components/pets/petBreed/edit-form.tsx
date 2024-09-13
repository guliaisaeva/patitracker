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

export default function UpdateBreedForm({
  breedId,
  selectedPetType,
}: FormProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const petTypes = useSelector(selectPetTypes);
  const languages = useSelector(selectLanguages);

  const selectedBreedDetail = useSelector(selectBreedDetail);

  interface PetBreedLocalized {
    languageId: number;
    breedName: string;
  }

  interface FormState {
    breedId: number | null;
    petTypeId: number | null;
    breedName: string;
    petBreedsLocalized: PetBreedLocalized[];
  }

  // const [formState, setFormState] = useState<FormState>({
  //   breedId: null,
  //   petTypeId: number;
  //   breedName: string;
  //   petBreedsLocalized: { languageId: number; breedName: string }[];
  // });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevState: any) => ({
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

  // const handleLocalizedChange =
  //   (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setFormState((prevState) => {
  //       const newPetBreedsLocalized = [...prevState.petBreedsLocalized];
  //       newPetBreedsLocalized[index] = {
  //         ...newPetBreedsLocalized[index],
  //         [name]: value,
  //       };
  //       return {
  //         ...prevState,
  //         petBreedsLocalized: newPetBreedsLocalized,
  //       };
  //     });
  //   };
  const handleLocalizedChange =
    (languageId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormState((prevState) => {
        // Find if a localized breed entry exists for the given languageId
        const existingLocaleIndex = prevState.petBreedsLocalized.findIndex(
          (locale) => locale.languageId === languageId
        );

        // Create a new array with updated breed names
        const newPetBreedsLocalized =
          existingLocaleIndex >= 0
            ? prevState.petBreedsLocalized.map((locale) =>
                locale.languageId === languageId
                  ? { ...locale, breedName: value }
                  : locale
              )
            : [
                ...prevState.petBreedsLocalized,
                { languageId, breedName: value },
              ];

        return {
          ...prevState,
          petBreedsLocalized: newPetBreedsLocalized,
        };
      });
    };
  // const handleLocalizedChange = (languageId: number, breedName: string) => {
  //   setFormState((prevState) => {
  //     const existingLocaleIndex = prevState.petBreedsLocalized.findIndex(
  //       (locale) => locale.languageId === languageId
  //     );

  //     const newPetBreedsLocalized =
  //       existingLocaleIndex >= 0
  //         ? prevState.petBreedsLocalized.map((locale) =>
  //             locale.languageId === languageId
  //               ? { ...locale, breedName }
  //               : locale
  //           )
  //         : [...prevState.petBreedsLocalized, { languageId, breedName }];

  //     return {
  //       ...prevState,
  //       petBreedsLocalized: newPetBreedsLocalized,
  //     };
  //   });
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.breedName || !formState.petTypeId) {
      alert(t("Please fill out all required fields."));
      return;
    }

    try {
      await dispatch(updatePetBreed(formState));
      alert(t("petBreed.messages.updateSuccess"));
      router.replace(
        `/dashboard/pets/petBreed?selectedPetType=${formState.petTypeId}`
      );
    } catch (error) {
      alert(t("petBreed.messages.updateFailure"));
      console.error("Update Pet Breed Error:", error);
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
              value={formState.petTypeId?.toString()}
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
                  value={localizedBreed ? localizedBreed.breedName : ""}
                  className="text-gray-500 peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  onChange={handleLocalizedChange(language.languageId)}
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
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          {t("cancel")}
        </Link>
        <Button type="submit">{t("update")}</Button>
      </div>
    </form>
  );
}
