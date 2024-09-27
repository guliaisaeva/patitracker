"use client";
import { lusitana } from "@/app/components/fonts";
import { useTranslation } from "react-i18next";
import LanguageTabs from "@/app/components/languageTabs";

export default function Page({ languageId }: { languageId: number }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>
            {t("terms.termsOfUse")}
          </h1>
        </div>
        <div className="flex mt-6 gap-4">
          <LanguageTabs selectedLanguageId={languageId} />
        </div>
      </div>
    </>
  );
}
