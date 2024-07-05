import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface StatusProps {
  statusType: 'active' | 'working';
  status: boolean;
}

export default function DeviceStatus({ statusType, status }: StatusProps) {
  const statusText = (type: 'active' | 'working', status: boolean) => {
    switch (type) {
      case 'active':
        return status ? 'Aktif' : 'Aktif değil';
      case 'working':
        return status ? 'Arızalı' : 'Çalışıyor';
      default:
        return '';
    }
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': !status,
          'bg-green-500 text-white': status,
        },
      )}
    >
      {statusText(statusType, status)}
      {status ? (
        <CheckIcon className="ml-1 w-4 text-white" />
      ) : (
        <ClockIcon className="ml-1 w-4 text-gray-500" />
      )}
    </span>
  );
}
