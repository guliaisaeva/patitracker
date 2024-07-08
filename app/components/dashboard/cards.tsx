"use client"

import { useEffect } from 'react';
import {
  UserGroupIcon,
  InboxIcon,
  DocumentIcon,
IdentificationIcon
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/components/fonts';
// import { fetchCardData } from '@/app/lib/data';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';

import { selectUsers,selectUsersStatus, selectUsersError, getUsersAsync  } from '@/lib/features/users/usersSlice';
import { selectDevices,getDevicesAsync } from '@/lib/features/devices/devicesSlice';
const iconMap = {
  collected: DocumentIcon,
  customers: UserGroupIcon,
  pending: IdentificationIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const devices = useSelector(selectDevices);
  useEffect(() => {
    // Dispatch the getUsersAsync thunk action creator directly
    dispatch(getUsersAsync());
    dispatch(getDevicesAsync());
  }, [dispatch]);
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Kullanıcı Sayısı" value={users?.length??0} type="customers" />
      <Card title="Hayvan Türü" value={"totalPendingInvoices"} type="pending" />
      <Card title="Cihaz Sayısı" value={devices?.length??0} type="invoices" />
      <Card
        title="Sim Kart Sayısı"
        value={"numberOfCustomers"}
        type="collected"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
