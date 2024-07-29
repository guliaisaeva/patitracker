"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import {
  getQuestionDetail,
  selectQuestionDetail,
  UpdateQuestion,
  updateQuestion,
} from "@/lib/features/faq/faqSlice";
import { useTranslation } from "react-i18next";
import trFlag from "@/public/images/turkey.png";
import ukFlag from "@/public/images/uk.png";

export default function UpdateFaqForm({ questionId }: { questionId: number }) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const selectedQuestionDetail = useSelector(selectQuestionDetail);

  const [trTitle, setTrTitle] = useState("");
  const [trDetail, setTrDetail] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [enDetail, setEnDetail] = useState("");

  useEffect(() => {
    dispatch(getQuestionDetail(questionId));
  }, [dispatch, questionId]);

  useEffect(() => {
    if (selectedQuestionDetail) {
      if (selectedQuestionDetail.mobileLanguageId === 1) {
        setTrTitle(selectedQuestionDetail.title);
        setTrDetail(selectedQuestionDetail.detail);
      } else if (selectedQuestionDetail.mobileLanguageId === 2) {
        setEnTitle(selectedQuestionDetail.title);
        setEnDetail(selectedQuestionDetail.detail);
      }
    }
  }, [selectedQuestionDetail]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const questionToSend: UpdateQuestion[] = [];

    if (trTitle || trDetail) {
      questionToSend.push({
        id: selectedQuestionDetail?.id || questionId,
        title: trTitle,
        detail: trDetail,
        mobileLanguageId: 1,
      });
    }

    if (enTitle || enDetail) {
      questionToSend.push({
        id: selectedQuestionDetail?.id || questionId,
        title: enTitle,
        detail: enDetail,
        mobileLanguageId: 2,
      });
    }

    try {
      if (questionToSend.length === 0) {
        throw new Error("No valid data to update.");
      }
      for (const question of questionToSend) {
        const result = await dispatch(updateQuestion(question)).unwrap();
      }
      alert(t("faq.messages.updateSuccess"));
      router.replace("/dashboard/faqs");
    } catch (error) {
      alert(t("faq.messages.updateFailure"));
      console.error("Update Question Error:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
            placeholder={t("faq.form.enterDetailEn")}
            style={{ height: "150px", width: "100%" }}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/faqs"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          {t("cancel")}
        </Link>
        <Button type="submit">{t("update")}</Button>
      </div>
    </form>
  );
}
