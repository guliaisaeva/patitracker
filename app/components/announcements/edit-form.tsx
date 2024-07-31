"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import {
  getAnnouncementDetail,
  selectAnnouncementDetail,
  updateAnnouncement,
} from "@/lib/features/announcement/announceSlice";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import { useTranslation } from "react-i18next";
import trFlag from "@/public/images/turkey.png";
import ukFlag from "@/public/images/uk.png";

export default function UpdateAnnouncementForm({
  announcementId,
}: {
  announcementId: number;
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const selectedAnnouncementDetail = useSelector(selectAnnouncementDetail);

  const [trTitle, setTrTitle] = useState("");
  const [trDetail, setTrDetail] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [enDetail, setEnDetail] = useState("");

  useEffect(() => {
    dispatch(getAnnouncementDetail(announcementId));
  }, [dispatch, announcementId]);

  useEffect(() => {
    if (selectedAnnouncementDetail) {
      if (selectedAnnouncementDetail.mobileLanguageId === 1) {
        setTrTitle(selectedAnnouncementDetail.title);
        setTrDetail(selectedAnnouncementDetail.detail);
      } else if (selectedAnnouncementDetail.mobileLanguageId === 2) {
        setEnTitle(selectedAnnouncementDetail.title);
        setEnDetail(selectedAnnouncementDetail.detail);
      }
    }
  }, [selectedAnnouncementDetail]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const announcementsToSend = [];

    if (trTitle || trDetail) {
      announcementsToSend.push({
        id: selectedAnnouncementDetail?.id || announcementId,
        title: trTitle,
        detail: trDetail,
        mobileLanguageId: 1,
        isRead: selectedAnnouncementDetail?.isRead || false,
      });
    }

    if (enTitle || enDetail) {
      announcementsToSend.push({
        id: selectedAnnouncementDetail?.id || announcementId,
        title: enTitle,
        detail: enDetail,
        mobileLanguageId: 2,
        isRead: selectedAnnouncementDetail?.isRead || false,
      });
    }

    try {
      for (const announcement of announcementsToSend) {
        const result = dispatch(updateAnnouncement(announcement)).unwrap();
        console.log("Update result:", result);
      }
      alert(t("announcement.messages.updateSuccess"));
      router.replace("/dashboard/announcements");
    } catch (error) {
      alert("announcement.messages.updateFailure");
      console.error("Update Announcement Error:", error);
    }
  };
  return (
    <form className="my-6" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 ">
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
            value={trTitle}
            onChange={(e) => setTrTitle(e.target.value)}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder={t("announcement.form.enterTitleTr")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="trDetail" className="mb-2 block text-sm font-medium">
            {t("announcement.form.detail")}
          </label>
          <textarea
            id="trDetail"
            name="trDetail"
            value={trDetail}
            onChange={(e) => setTrDetail(e.target.value)}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder={t("announcement.form.enterTitleTr")}
            style={{ height: "150px", width: "100%" }}
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
            placeholder={t("announcement.form.enterTitleEn")}
            onChange={(e) => setEnTitle(e.target.value)}
            className=" text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
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
            placeholder={t("announcement.form.enterDetailEn")}
            style={{ height: "150px", width: "100%" }}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/announcements"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          {t("cancel")}
        </Link>
        <Button type="submit">{t("update")}</Button>
      </div>
    </form>
  );
}
