"use client";
import Pagination from "@/app/components/managers/pagination";
import Search from "@/app/components/search";
import Table from "@/app/components/pets/petBreed/table";
import { CreatePetBreed } from "@/app/components/pets/petBreed/buttons";
import { lusitana } from "@/app/components/fonts";
import { InvoicesTableSkeleton } from "@/app/components/skeletons";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPetTypes,
  selectPetTypes,
} from "@/lib/features/pet/petTypesSlice";
import { AppDispatch } from "@/lib/store";
import { selectPetBreeds } from "@/lib/features/pet/petBreedSlice";
import { useTranslation } from "react-i18next";
import { useSearchParams, useRouter } from "next/navigation";
import LanguageTabs from "@/app/components/languageTabs";

export default function Page() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>
            {t("terms.termsOfUse")}
          </h1>
        </div>
        <div className="flex mt-6 gap-4">
          <LanguageTabs />
        </div>
        
      </div>
    </>
  );
}
