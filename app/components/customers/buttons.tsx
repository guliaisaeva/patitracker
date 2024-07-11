import { PlusIcon, TrashIcon,InformationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch} from '@/lib/store';
import { deleteDeviceAsync } from '@/lib/features/devices/devicesSlice';

// import { deleteInvoice } from '@/app/lib/actions';

export function CreateDevice() {
  return (
    <Link
      href="/dashboard/devices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Cihaz Ekle</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UserInfo({ id }: { id: string }) {

  return (
    <Link
      href={`/dashboard/customers/${id}/info`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <InformationCircleIcon className="w-5" />
    </Link>
  );
}

export function DeleteDevice({ id }: { id: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    try {
      await dispatch(deleteDeviceAsync(id));
    alert(`Device with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Failed to delete invoice:', error);
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
