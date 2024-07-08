"use client"

import { useEffect } from 'react';
import Image from 'next/image';
import { UpdateDevice, DeleteDevice, DeviceInfo } from '@/app/components/devices/buttons';
import DeviceStatus from '@/app/components/devices/status';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';
// import { fetchFilteredInvoices } from '@/app/lib/data';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch} from '@/lib/store';
import {selectSims, selectSimsStatus, selectSimsError, getAllSimsAsync } from '@/lib/features/sims/simsSlice';
import { SimCardInfo } from '@/app/components/simcards/buttons';


export default async function DevicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  const dispatch = useDispatch<AppDispatch>();
  const sims = useSelector(selectSims);
  const status = useSelector(selectSimsStatus);
  const error = useSelector(selectSimsError);

  useEffect(() => {
    dispatch(getAllSimsAsync());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading devices...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading devices:{error}</div>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {sims?.map((device:any) => (
              <div
                key={device.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                   
                      <p>{device.id}</p>
                    </div>
                    <p className="text-sm text-gray-500">{device.deviceNumber}</p>
                  </div>
                  {/* <DeviceStatus status={device.deviceModel} /> */}
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
                 Cihaz İD
                </th>
                <th scope="col" className="px-3 py-5 font-medium">

Cihaz Numarası               </th>
                <th scope="col" className="px-3 py-5 font-medium">
Cihaz Modeli                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Sim Numarası
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
Kayıt Tarihi             </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Aktiflik Durumu                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Arıza Durumu                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sims?.map((sim) => (
                <tr
                  key={sim?.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                  
                      <p>{sim.id}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sim.phoneNumber}
                  </td>
              
                  <td className="whitespace-nowrap px-3 py-3">
                  {sim.apn}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {sim.companyName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {/* {formatDateToLocal(sim.registerDate)} */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {/* {formatDateToLocal(sim.expirationDate)} */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  <DeviceStatus statusType="active" status={sim.isActive} />
                  </td>
                 
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                    <SimCardInfo id={String(sim.id)} />
                    <DeleteDevice id={String(sim.id)} />
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
