import { InformationCircleIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { deleteDeviceAsync } from '@/lib/features/devices/devicesSlice';
import { deleteSimCardAsync } from '@/lib/features/sims/simsSlice';

// import { deleteInvoice } from '@/app/lib/actions';

export function CreatePetBreed() {
  return (
    <Link
      href="/dashboard/simcards/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Sim Kart Ekle</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
export function PetBreedInfo({ id }: { id: string }) {

  return (
    <Link
      href={`/dashboard/simcards/${id}/info`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <InformationCircleIcon className="w-5" />
    </Link>
  );
}


export function UpdatePetBreed({ id }: { id: string }) {

  return (
    <Link
      href={`/dashboard/devices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePetBreed({ id }: { id: number }) {
  // const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    try {
      // Dispatch the delete action asynchronously
      await dispatch(deleteSimCardAsync(id));
    alert(`Device with ID ${id} deleted successfully.`);
      // Optionally, handle success actions like showing a notification or updating state
    } catch (error) {
      console.error('Failed to delete invoice:', error);
      // Handle errors, such as showing an error message to the user
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
     </form>
  );
}
