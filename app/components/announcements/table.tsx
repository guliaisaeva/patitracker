"use client";

import { useEffect } from "react";
import { DeleteDevice, DeviceInfo } from "@/app/components/devices/buttons";
import DeviceStatus from "@/app/components/devices/status";
import { formatDateToLocal } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  selectDevices,
  selectDevicesStatus,
  selectDevicesError,
  getDevicesAsync,
} from "@/lib/features/devices/devicesSlice";
import NoResultsMessage from "../noResultMessage";
import { getAllAnnouncement, selectAnnouncements } from "@/lib/features/announcement/announceSlice";
import AnnouncementStatus from "./status";
import {UpdateAnnouncement } from "./buttons";

const ITEMS_PER_PAGE = 10;

export default function DevicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const announcements = useSelector(selectAnnouncements);
  const status = useSelector(selectDevicesStatus);
  const error = useSelector(selectDevicesError);

  useEffect(() => {
    dispatch(getAllAnnouncement());

  }, [dispatch]);


  // Filter devices based on search query
  const filteredAnnouncement = announcements?.filter(
    (announcements) =>
      announcements?.title?.toLowerCase().includes(query.toLowerCase()) ||
    announcements?.detail?.toLowerCase().includes(query.toLowerCase()) 
  );

  // Calculate pagination offsets
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const announcementToShow = filteredAnnouncement?.slice(startIndex, endIndex);

  // if (status === "loading") {
  //   return <div>Loading devices...</div>;
  // }

  if (status === "failed") {
    return <div>Error loading devices: {error}</div>;
  }

  if (!announcementToShow || announcementToShow?.length === 0) {
    return <NoResultsMessage />;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {announcementToShow?.map((announcement: any) => (
              <div
                key={announcement.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{announcement.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{announcement.detail}</p>
                  </div>
                  <DeviceStatus statusType="active" status={announcement.isRead} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
               
                  <div className="flex justify-end gap-2">
                    <DeviceInfo id={String(announcement.id)} />
                    <DeleteDevice id={String(announcement.id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                   İD
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
Duyuru Başlığı                </th>
                <th scope="col" className="px-3 py-5 font-medium">
Duyuru Detayları                </th>
                <th scope="col" className="px-3 py-5 font-medium">
Okunma Durumu            </th>
                
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {announcementToShow?.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{announcement.id}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {announcement.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {announcement.detail}
                  </td>
       
                  <td className="whitespace-nowrap px-3 py-3">
                    <AnnouncementStatus statusType="read" status={announcement.isRead} />
                  </td>
                 
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <DeviceInfo id={String(announcement.id)} />
                      <UpdateAnnouncement id={String(announcement.id)} />
                      <DeleteDevice id={String(announcement.id)} />
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
