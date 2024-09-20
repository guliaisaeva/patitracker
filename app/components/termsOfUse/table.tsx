"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
  selectPetBreeds,
  getAllPetBreeds,
} from "@/lib/features/pet/petBreedSlice";
import NoResultsMessage from "@/app/components/noResultMessage";
import { DeleteBreed, PetBreedInfo, UpdatePetBreed } from "./buttons";
import { useTranslation } from "react-i18next";
import {
  fetchPrivacyPolicies,
  selectPrivacyPolicies,
} from "@/lib/features/termsPrivacy/termsPrivacySlice";
import { selectLanguages } from "@/lib/features/languages/languagesSlice";

interface TermsOfUseTableProps {
  languageId?: number;
}
export default function TermsOfUseTable({ languageId }: TermsOfUseTableProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const privacyPolicy = useSelector(selectPrivacyPolicies);
  const currentLanguage = useSelector(selectLanguages);

  const status = useSelector((state: RootState) => state.petBreeds.status);
  const error = useSelector((state: RootState) => state.petBreeds.error);

  useEffect(() => {
    if (languageId) {
      dispatch(fetchPrivacyPolicies(languageId));
    }
  }, [dispatch, languageId]);


  if (status === "loading") {
    return <div>Loading Terms Of Use...</div>;
  }

  if (!privacyPolicy || privacyPolicy.length === 0) {
    return <NoResultsMessage />; // Custom message for no data
  }
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-lg bg-gray-50 p-2 md:pt-0">
            {privacyPolicy?.map((item) => (
              <div
                key={item.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      {item.title}
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
