"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import {
  addAnnouncement,
  selectAnnouncementError,
  selectAnnouncementStatus,
} from "@/lib/features/announcement/announceSlice";
import {
  getUsersAsync,
  selectUserProfileId,
} from "@/lib/features/users/usersSlice";
import Link from "next/link";
import {
  fetchLanguages,
  selectLanguages,
} from "@/lib/features/languages/languagesSlice";
import { useTranslation } from "react-i18next";

export default function Form() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const status = useSelector(selectAnnouncementStatus);
  const error = useSelector(selectAnnouncementError);
  const languages = useSelector(selectLanguages);
  const userProfileId = useSelector(selectUserProfileId);

  const announcementTypeId = 1;
  const DEFAULT_USER_PROFILE_ID = 1;

  const [formData, setFormData] = useState<{
    title: string;
    detail: string;
    announcementTypeId: number;
    userProfileId: number[];
    announcementsLocalized: {
      languageId: number;
      title: string;
      detail: string;
    }[];
  }>({
    title: "",
    detail: "",
    announcementTypeId: 1,
    userProfileId: [0],
    announcementsLocalized: [
      {
        languageId: 2,
        title: "",
        detail: "",
      },
    ],
  });

  useEffect(() => {
    dispatch(getUsersAsync());
    dispatch(fetchLanguages());
  }, [dispatch]);

  useEffect(() => {
    if (languages.length > 0) {
      setFormData((prev) => ({
        ...prev,
        frequentlyAskedQuestionsLocalized: languages.map((lang) => ({
          languageId: lang.languageId,
          question: "",
          detail: "",
        })),
      }));
    }
  }, [languages]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userProfileIds: number[] = Array.isArray(userProfileId)
      ? userProfileId.filter((id): id is number => id !== null) // Filter out null values
      : [userProfileId].filter((id): id is number => id !== null); // Handle single number

    if (userProfileIds.length === 0) {
      userProfileIds.push(DEFAULT_USER_PROFILE_ID);
    }

    const announcementsToSend = [];
    // Turkish Announcement
    // if (trTitle || trDetail) {
    //   announcementsToSend.push({
    //     title: trTitle,
    //     detail: trDetail,
    //     announcementTypeId,
    //     mobileLanguageId: 1, // Turkish
    //     userProfileId: userProfileIds,
    //   });
    // }

    // // English Announcement
    // if (enTitle || enDetail) {
    //   announcementsToSend.push({
    //     title: enTitle,
    //     detail: enDetail,
    //     announcementTypeId,
    //     mobileLanguageId: 2, // English
    //     userProfileId: userProfileIds,
    //   });
    // }

    try {
      // Send announcements to API
      // for (const announcement of announcementsToSend) {
      //   dispatch(addAnnouncement(announcement));
      // }
      // setTrTitle("");
      // setTrDetail("");
      // setEnTitle("");
      // setEnDetail("");
      alert(t("announcement.messages.createSuccess"));
      router.replace("/dashboard/announcements");
    } catch (err) {
      console.error("Failed to add announcement:", err);
      alert(t("announcement.messages.createFailure"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="mb-2  text-sm font-medium flex justify-between"
          >
            {t("announcement.form.title")}
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            // onChange={(e) => setTrTitle(e.target.value)}
            className=" text-gray-500 block w-full text-gray rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder={t("announcement.form.enterTitleTr")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="detail" className="mb-2 block text-sm font-medium">
            {t("announcement.form.detail")}
          </label>
          <textarea
            id="detail"
            name="detail"
            value={formData.detail}
            // onChange={handleChange}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder={t("faq.form.enterDetail")}
            required
          />
        </div>
        {languages.map((lang) => (
          <div key={lang.languageId} className="mb-4 mt-4">
            <label
              htmlFor={`announcement_${lang.languageId}`}
              className="mb-2 mt-2 flex justify-between  text-sm font-medium"
            >
              {t("announcement.form.title")}
              {`${lang.languageAbbreviation}/ ${lang.languageName} `}
            </label>
            <input
              type="text"
              id={`announcement_${lang.languageId}`}
              name={`announcement_${lang.languageId}`}
              value={
                formData.announcementsLocalized.find(
                  (q) => q.languageId === lang.languageId
                )?.title || ""
              }
              // onChange={handleChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              placeholder={t("faq.form.enterTitle")}
            />

            <label
              htmlFor={`announcementDetail_${lang.languageId}`}
              className="mb-2 mt-2 flex justify-between  text-sm font-medium"
            >
              <p> {t("announcement.form.detail")}</p>
              {`${lang.languageAbbreviation}/${lang.languageName} `}
            </label>
            <textarea
              id={`announcementDetail_${lang.languageId}`}
              name={`announcementDetail_${lang.languageId}`}
              value={
                formData.announcementsLocalized.find(
                  (q) => q.languageId === lang.languageId
                )?.detail || ""
              }
              // onChange={handleChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              placeholder={t("faq.form.enterDetail")}
            />
          </div>
        ))}

        {status === "failed" && error && (
          <div className="mb-4 text-red-500">{error}</div>
        )}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/announcements"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            {t("cancel")}
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={status === "loading"}
          >
            {status === "loading"
              ? t("announcement.submit.creating")
              : t("announcement.submit.create")}
          </button>
        </div>
      </div>
    </form>
  );
}
