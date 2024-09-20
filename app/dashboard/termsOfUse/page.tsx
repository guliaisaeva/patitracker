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

const ITEMS_PER_PAGE = 10;

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    selectedPetType?: string;
  };
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const initialSelectedPetType = searchParams?.selectedPetType || "";

  const petTypes = useSelector(selectPetTypes);
  const petBreeds = useSelector(selectPetBreeds);
  const [filteredResultsCount, setFilteredResultsCount] = useState(0);
  const [selectedPetType, setSelectedPetType] = useState<string>(
    initialSelectedPetType
  );

  useEffect(() => {
    dispatch(getAllPetTypes());
  }, [dispatch]);

  const handlePetTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPetType(value);
    router.replace(`/dashboard/pets/petBreed?selectedPetType=${value}`);
  };

  // useEffect(() => {
  //   if (query.trim() && selectedPetType) {
  //     dispatch(
  //       searchPetBreeds({
  //         petTypeId: Number(selectedPetType),
  //         searchWord: query,
  //         languageId: 2,

  //       })
  //     );
  //   } else {
  //     dispatch(resetSearchResults());
  //   }
  // }, [query, selectedPetType, currentPage, dispatch]);

  useEffect(() => {
    // if (petBreeds) {
    //   const filteredPetBreeds = petBreeds?.filter((petBreed) =>
    //     petBreed?.breedName?.toLowerCase().includes(query.toLowerCase())
    //   ).length;
    //   setFilteredResultsCount(filteredPetBreeds);
    // }
    // if (petBreeds && petBreeds.length > 0) {
    //   setFilteredResultsCount(petBreeds.length);
    // }
  }, [petBreeds, query]);

  const totalPages = Math.ceil(filteredResultsCount / ITEMS_PER_PAGE);

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
