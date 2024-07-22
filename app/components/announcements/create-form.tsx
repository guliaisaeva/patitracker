"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDevicesStatus,
  selectDevicesError,
} from "@/lib/features/devices/addDeviceSlice";
import Image from "next/image";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { addAnnouncement } from "@/lib/features/announcement/announceSlice";
import { getUsersAsync, selectUserProfileId } from "@/lib/features/users/usersSlice";

export default function Form() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const status = useSelector(selectDevicesStatus);
  const error = useSelector(selectDevicesError);
  const userProfileId = useSelector(selectUserProfileId);

  const [trTitle, setTrTitle] = useState('');
  const [trDetail, setTrDetail] = useState('');
  const [enTitle, setEnTitle] = useState('');
  const [enDetail, setEnDetail] = useState('');
  const announcementTypeId = 1;  
  const mobileLanguageId = 1; 
  const DEFAULT_USER_PROFILE_ID = 1;

  useEffect(() => {
     dispatch(getUsersAsync());
  }, [dispatch]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userProfileIds: number[] = Array.isArray(userProfileId)
    ? userProfileId.filter((id): id is number => id !== null) // Filter out null values
    : [userProfileId].filter((id): id is number => id !== null); // Handle single number

  // Use default ID if no valid userProfileId
  if (userProfileIds.length === 0) {
    userProfileIds.push(DEFAULT_USER_PROFILE_ID);
  }

  
    const announcementsToSend = [];
    // Turkish Announcement
    if (trTitle || trDetail) {
      announcementsToSend.push({
        title: trTitle,
        detail: trDetail,
        announcementTypeId,
        mobileLanguageId: 1,  // Turkish
        userProfileId: userProfileIds,      });
    }

    // English Announcement
    if (enTitle || enDetail) {
      announcementsToSend.push({
        title: enTitle,
        detail: enDetail,
        announcementTypeId,
        mobileLanguageId: 2,  // English
        userProfileId: userProfileIds,     });
    }

    try {
      // Send announcements to API
      for (const announcement of announcementsToSend) {
        await dispatch(addAnnouncement(announcement));
      }
      setTrTitle('');
      setTrDetail('');
      setEnTitle('');
      setEnDetail('');
      alert("Announcement(s) added successfully");
      router.replace("/dashboard/announcements");
    } catch (err) {
      console.error("Failed to add announcement:", err);
      alert("Failed to add announcement");
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <Image
              src="/turkey.png"
              alt="Turkish Flag"
              width={36}
              height={36}
              objectFit="cover"
              className="rounded-full"
            />
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
     Duyuru Başlığı          </label>
          <input
   id="trTitle"
   name="trTitle"
   value={trTitle}
   onChange={(e) => setTrTitle(e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="detail" className="mb-2 block text-sm font-medium">
    
  Duyuru Detayı          </label>
<textarea
           id="trDetail"
           name="trDetail"
           value={trDetail}
           onChange={(e) => setTrDetail(e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder="Enter Announcement Detail"
          />
        </div>
        <Image
              src="/uk.png"
              alt="English Flag"
              width={36}
              height={36}
              objectFit="cover"
              className="rounded-full"
            />
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
     Announcement Title          </label>
          <input
      id="enTitle"
      name="enTitle"
      value={enTitle}
      placeholder="Enter Title"
      onChange={(e) => setEnTitle(e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="detail" className="mb-2 block text-sm font-medium">
    
  Announcement Details          </label>
<textarea
    id="enDetail"
    name="enDetail"
    value={enDetail}
    onChange={(e) => setEnDetail(e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder="Enter Announcement Detail"
          />
        </div>

        {status === "failed" && error && (
          <div className="mb-4 text-red-500">{error}</div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Creating..." : "Create Device"}
          </button>
        </div>
      </div>
    </form>
  );
}
