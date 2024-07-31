"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import {
  addQuestion,
  selectQuestionsError,
  selectQuestionsStatus,
} from "@/lib/features/faq/faqSlice";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import trFlag from "@/public/images/turkey.png";
import ukFlag from "@/public/images/uk.png";
import Link from "next/link";

export default function Form() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const status = useSelector(selectQuestionsStatus);
  const error = useSelector(selectQuestionsError);

  const [trTitle, setTrTitle] = useState("");
  const [trDetail, setTrDetail] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [enDetail, setEnDetail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const questionsToSend = [];

    // Turkish Question
    if (trTitle || trDetail) {
      questionsToSend.push({
        title: trTitle,
        detail: trDetail,
        mobileLanguageId: 1, // Turkish
      });
    }

    // English Question
    if (enTitle || enDetail) {
      questionsToSend.push({
        title: enTitle,
        detail: enDetail,
        mobileLanguageId: 2, // English
      });
    }

    try {
      for (const question of questionsToSend) {
        await dispatch(addQuestion(question)).unwrap();
      }
      setTrTitle("");
      setTrDetail("");
      setEnTitle("");
      setEnDetail("");
      alert(t("device.messages.createSuccess"));
      router.replace("/dashboard/faqs");
    } catch (err) {
      console.error("Failed to add question:", err);
      alert(t("device.messages.createFailure"));
    }
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
            {t("faq.form.title")}{" "}
          </label>
          <input
            id="trTitle"
            name="trTitle"
            value={trTitle}
            onChange={(e) => setTrTitle(e.target.value)}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            required
            placeholder={t("faq.form.enterTitleTr")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="trDetail" className="mb-2 block text-sm font-medium">
            {t("faq.form.detail")}{" "}
          </label>
          <textarea
            id="trDetail"
            name="trDetail"
            value={trDetail}
            onChange={(e) => setTrDetail(e.target.value)}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder={t("faq.form.enterDetailTr")}
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
            {t("faq.form.title")}{" "}
          </label>
          <input
            id="enTitle"
            name="enTitle"
            value={enTitle}
            placeholder={t("faq.form.enterTitleEn")}
            onChange={(e) => setEnTitle(e.target.value)}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="enDetail" className="mb-2 block text-sm font-medium">
            {t("faq.form.detail")}{" "}
          </label>
          <textarea
            id="enDetail"
            name="enDetail"
            value={enDetail}
            onChange={(e) => setEnDetail(e.target.value)}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder={t("faq.form.enterDetailTr")}
          />
        </div>

        {status === "failed" && error && (
          <div className="mb-4 text-red-500">{error}</div>
        )}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/faqs"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            {t("cancel")}
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={status === "loading"}
          >
            {status === t("load")
              ? t("faq.submit.creating")
              : t("faq.submit.create")}
          </button>
        </div>
      </div>
    </form>
  );
}
