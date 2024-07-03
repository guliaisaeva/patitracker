"use client"

import { useEffect } from 'react';
import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/components/invoices/buttons';
import InvoiceStatus from '@/app/components/invoices/status';
// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
// import { fetchFilteredInvoices } from '@/app/lib/data';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch} from '@/lib/store';
import {selectManagers, selectManagersStatus, selectManagersError, getManagersAsync } from '@/lib/features/managers/managersSlice';


export default async function ManagersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  const dispatch = useDispatch<AppDispatch>();
  const managers = useSelector(selectManagers);
  const status = useSelector(selectManagersStatus);
  const error = useSelector(selectManagersError);

  useEffect(() => {
    dispatch(getManagersAsync());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading managers...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading managers: {error}</div>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {managers.map((manager) => (
              <div
                key={manager.userProfileId}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                    {manager.profileImageUrl ? (
    <Image
      src={manager.profileImageUrl}
      className="mr-2 rounded-full"
      width={28}
      height={28}
      alt={`${manager.fullName}'s profile picture`}
    />
  ) : (
    <img
      src="https://via.placeholder.com/28" // Placeholder image URL
      className="mr-2 rounded-full"
      width={28}
      height={28}
      alt={`${manager.fullName}'s profile picture`}
    />
  )}
                      <p>{manager.fullName}</p>
                    </div>
                    <p className="text-sm text-gray-500">{manager.email}</p>
                  </div>
                  <InvoiceStatus status={manager.phoneNumber} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  {/* <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div> */}
                  {/* <div className="flex justify-end gap-2">
                    <UpdateInvoice id={String(manager.userProfileId)} />
                    <DeleteInvoice id={String(manager.userProfileId)} />
                  </div> */}
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Admin İsmi 
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
Tam İsmi                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  E-Posta Adresi
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Telefon Numarası
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
Adresi                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {managers?.map((manager) => (
                <tr
                  key={manager.userProfileId}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                    {manager.profileImageUrl ? (
    <Image
      src={manager.profileImageUrl}
      className=" rounded-full"
      width={28}
      height={28}
      alt={`${manager.fullName}'s profile picture`}
    />
  ) : (
    // <img
    //   src="https://via.placeholder.com/28" // Placeholder image URL
    //   className=" rounded-full"
    //   width={28}
    //   height={28}
    //   alt={`${manager.fullName}'s profile picture`}
    // />

    <div className="mr-2 rounded-full w-7 h-7 flex items-center justify-center bg-gray-300 text-gray-600">
    {manager.fullName.charAt(0)}
  </div>
  )}
                      <p>{manager.userName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {manager.fullName}
                  </td>
              
                  <td className="whitespace-nowrap px-3 py-3">
                  {manager.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {manager.phoneNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {manager.address}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                    <UpdateInvoice id={String(manager.userProfileId)} />
                    <DeleteInvoice id={String(manager.userProfileId)} />
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
