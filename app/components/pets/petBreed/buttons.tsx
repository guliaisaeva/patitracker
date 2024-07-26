import {
  InformationCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  deletePetBreed,
  getAllPetBreeds,
} from "@/lib/features/pet/petBreedSlice";
import { useTranslation } from "react-i18next";

export function CreatePetBreed() {
  const { t } = useTranslation();
  return (
    <Link
      href="/dashboard/pets/petBreed/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{t("petBreed.create")}</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
export function PetBreedInfo({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/pets/petBreed/${id}/info`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <InformationCircleIcon className="w-5" />
    </Link>
  );
}

export function UpdatePetBreed({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/pets/petBreed/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteBreed({
  id,
  petTypeId,
}: {
  id: number;
  petTypeId: string;
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(deletePetBreed(id));
      dispatch(getAllPetBreeds(petTypeId));

      alert(t("petBreed.messages.deleteSuccess"));
    } catch (error) {
      console.error("Failed to delete pet breed:", error);
      alert(t("petBreed.messages.deleteFailure"));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">{t("delete")}</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
