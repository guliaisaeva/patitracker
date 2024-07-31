"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { AppDispatch } from "@/lib/store";
import {
  getAnnouncementDetail,
  selectAnnouncementDetail,
} from "@/lib/features/announcement/announceSlice";
import { getUsersAsync } from "@/lib/features/users/usersSlice";
import Link from "next/link";
import trFlag from "@/public/images/turkey.png";
import ukFlag from "@/public/images/uk.png";
import { useTranslation } from "react-i18next";
export default function AnnouncementInfoForm({
  announcementId,
}: {
  announcementId: number;
}) {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const announcementDetail = useSelector(selectAnnouncementDetail);
  const [trTitle, setTrTitle] = useState("");
  const [trDetail, setTrDetail] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [enDetail, setEnDetail] = useState("");

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    if ({ announcementId }) {
      dispatch(getAnnouncementDetail(announcementId));
    }
  }, [dispatch, announcementId]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="my-6" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <Image
          src={trFlag}
          alt="Turkish Flag"
          width={36}
          height={36}
          className="rounded-full"
        />

        <div className="mb-4">
          <label htmlFor="trTitle" className="mb-2 block text-sm font-medium">
            {t("announcement.form.title")}
          </label>
          <input
            id="trTitle"
            name="trTitle"
            value={announcementDetail?.title || ""}
            className="block w-full rounded-md text-gray-500 border border-gray-200 py-2 px-3 text-sm"
            required
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="trDetail" className="mb-2 block text-sm font-medium">
            {t("announcement.form.detail")}
          </label>
          <textarea
            id="trDetail"
            name="trDetail"
            value={announcementDetail?.detail || ""}
            onChange={(e) => setTrDetail(e.target.value)}
            className="block  text-gray-500  w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            style={{ height: "150px", width: "100%" }}
            readOnly
          />
        </div>
        <Image
          src={ukFlag}
          alt="English Flag"
          width={36}
          height={36}
          className="rounded-full"
        />
        <div className="mb-4">
          <label htmlFor="enTitle" className="mb-2 block text-sm font-medium">
            {t("announcement.form.title")}
          </label>
          <input
            id="enTitle"
            name="enTitle"
            value={enTitle}
            onChange={(e) => setEnTitle(e.target.value)}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="enDetail" className="mb-2 block text-sm font-medium">
            {t("announcement.form.detail")}
          </label>
          <textarea
            id="enDetail"
            name="enDetail"
            value={enDetail}
            onChange={(e) => setEnDetail(e.target.value)}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            style={{ height: "150px", width: "100%" }}
            readOnly
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/announcements"
          className="flex h-10 items-center rounded-lg bg-green-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          {t("close")}
        </Link>
        {/* <Button type="submit">Edit Device</Button> */}
      </div>
    </form>
  );
}
