import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { deleteManagerAsync } from '@/lib/features/managers/managersSlice';

// import { deleteInvoice } from '@/app/lib/actions';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/managers/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Yönetici Ekle</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {

  return (
    <Link
      href={`/dashboard/managers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  // const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Dispatch the delete action asynchronously
      await dispatch(deleteManagerAsync(id));
      console.log(`Invoice with ID ${id} deleted successfully.`);
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
