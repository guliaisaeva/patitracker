"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import NoResultsMessage from "@/app/components/noResultMessage";
import { useTranslation } from "react-i18next";
import {
  fetchTermsOfUse,
  selectPrivacyPoliciesByLanguage,
} from "@/lib/features/termsPrivacy/termsPrivacySlice";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { UpdateTermsOfUse } from "./buttons";
import {
  fetchLanguages,
  selectLanguages,
} from "@/lib/features/languages/languagesSlice";
interface TermsOfUseTableProps {
  languageId?: number;
}
export default function TermsOfUseTable({ languageId }: TermsOfUseTableProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [selectedLanguageId, setSelectedLanguageId] = useState(languageId || 1);

  // useEffect(() => {
  //   dispatch(fetchLanguages());
  // }, [dispatch]);
  const termsOfUse = useSelector((state: RootState) =>
    selectPrivacyPoliciesByLanguage(state, selectedLanguageId)
  );

  const status = useSelector((state: RootState) => state.termsPrivacy.status);
  useEffect(() => {
    if (languageId) {
      dispatch(fetchTermsOfUse(languageId));
    }
  }, [dispatch, languageId]);

  if (status === "loading") {
    return <div>{t("terms.submit.loading")}</div>;
  }

  if (!termsOfUse || termsOfUse.length === 0) {
    return <NoResultsMessage />;
  }
  return (
    <div className="mt-6 flow-root">
      {termsOfUse?.map((item) => (
        <div key={item.id} className="mb-2 w-full  bg-white p-4">
          <div className="flex justify-end">
            <UpdateTermsOfUse id={item.id} languageId={item.languageId} />
          </div>
          <h2 className="text-sm text-gray-500 text-center font-bold p-2">
            {item.title}
          </h2>
          {/* <p> {item.detail}</p> */}
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: item.detail }}
          />
        </div>
      ))}
    </div>
  );
}
