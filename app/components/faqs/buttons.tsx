import { InformationCircleIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { deleteDeviceAsync } from '@/lib/features/devices/devicesSlice';
import { deleteAnnouncement } from '@/lib/features/announcement/announceSlice';


export function CreateQuestion() {
  return (
    <Link
      href="/dashboard/faqs/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Yeni Soru Ekle</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
export function QuestionInfo({ id }: { id: string }) {

  return (
    <Link
      href={`/dashboard/faqs/${id}/info`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <InformationCircleIcon className="w-5" />
    </Link>
  );
}


export function UpdateQuestion({ id }: { id: string }) {

  return (
    <Link
      href={`/dashboard/faqs/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteQuestion({ id }: { id: number }) {
  // const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    try {
      await dispatch(deleteAnnouncement(id)).unwrap();
      alert('Announcement deleted successfully.');
    } catch (error) {
      alert('Failed to delete announcement. Please try again.');
      console.error('Delete Announcement Error:', error);
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
