"use client";

import {
  fetchTermsOfUse,
  selectAllTerms,
  updateTermsOfUse,
} from "@/lib/features/termsPrivacy/termsPrivacySlice";
import { AppDispatch } from "@/lib/store";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export default function TermsOfUseTableEdit() {
  const router = useRouter();
  const params = useParams(); // Access route parameters (id)
  const searchParams = useSearchParams();
  const id = params.id; // Extract the id from URL
  const languageId = searchParams.get("languageId");
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const termsOfUse = useSelector(selectAllTerms);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (id && languageId) {
      const term = termsOfUse.find(
        (term) =>
          term.id === Number(id) && term.languageId === Number(languageId)
      );
      if (term) {
        setTitle(term.title);
        setDetail(term.detail);
      } else {
        dispatch(fetchTermsOfUse(Number(languageId)));
      }
    }
  }, [id, languageId, dispatch, termsOfUse]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (title && detail) {
      const updatedTerm = {
        id: Number(id),
        title,
        detail,
        languageId: Number(languageId),
      };
      await dispatch(updateTermsOfUse(updatedTerm));
      await dispatch(fetchTermsOfUse());
      router.push(`/dashboard/termsOfUse`);
    }
  };

  return (
    <div>
      <h1>{t("Edit Terms of Use")}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">{t("Title")}</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="detail">{t("Detail")}</label>
          <textarea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
          />
        </div>
        <button type="submit">{t("Save Changes")}</button>
      </form>
    </div>
  );
}
