'use client'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { selectPetBreeds, getAllPetBreeds } from '@/lib/features/pet/petBreedSlice';
import NoResultsMessage from '@/app/components/noResultMessage';
import { DeletePetBreed, PetBreedInfo, UpdatePetBreed } from './buttons';

const ITEMS_PER_PAGE = 10;

export default function PetBreedTable({
  query,
  currentPage,
  selectedPetType,
}: {
  query: string;
  currentPage: number;
  selectedPetType: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const petBreeds = useSelector(selectPetBreeds);
  const status = useSelector((state: RootState) => state.petBreeds.status);
  const error = useSelector((state: RootState) => state.petBreeds.error);

  useEffect(() => {
    if (selectedPetType) {
      dispatch(getAllPetBreeds(selectedPetType));
    }
  }, [dispatch, selectedPetType]);


  const filteredPetBreeds = petBreeds?.filter(petBreed =>
    petBreed.breedName.toLowerCase().includes(query.toLowerCase())
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const petBreedsToShow = filteredPetBreeds?.slice(startIndex, endIndex);

  if (status === 'loading') {
    return <div>Loading pet breeds...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading pet breeds: {error}</div>;
  }

  if (!petBreedsToShow || petBreedsToShow.length === 0) {
    return <NoResultsMessage />;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
         
        <div className="md:hidden">
            {petBreedsToShow.map((petBreed) => (
              <div
                key={petBreed.breedId}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
           
                    <p className="text-sm text-gray-500">{petBreed.breedName}</p>
                  </div>
                </div>
          
                  <div className="flex justify-end gap-2">
                  <PetBreedInfo id={String(petBreed.breedId)} />
                    <UpdatePetBreed id={String(petBreed.breedId)} />
                    <DeletePetBreed id={Number(petBreed.breedId)} />
                  </div>
                </div>
            ))}
          </div>
          <table className="min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
              <th scope="col" className="px-3 py-5 font-medium">
                  İD
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Evcil Hayvan Cins İsmi
                </th>
             
              
              </tr>
            </thead>
            <tbody className="bg-white">
              {petBreedsToShow.map((petBreed: any) => (
                <tr
                  key={petBreed.breedId}
                  className="w-full border-b py-3 text-sm last-of-type:border-none"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {petBreed.breedId}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {petBreed.breedName}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                    <PetBreedInfo id={String(petBreed.breedId)} />
                    <UpdatePetBreed id={petBreed.breedId} />
                    <DeletePetBreed id={petBreed.breedId} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}