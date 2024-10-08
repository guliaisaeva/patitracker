"use client";
import { lusitana } from "@/app/components/fonts";
import { useTranslation } from "react-i18next";
import LanguageTabs from "@/app/components/languageTabs";
import TermsOfUseTable from "@/app/components/termsOfUse/table";

export default function Page({ languageId }: { languageId: number }) {
  const { t } = useTranslation();
  const renderContent = (languageId: number) => {
    return <TermsOfUseTable languageId={languageId} />;
  };
  return (
    <>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>
            {t("terms.termsOfUse")}
          </h1>
        </div>
        <div className="flex mt-6 gap-4">
          <LanguageTabs
            selectedLanguageId={languageId}
            renderContent={renderContent}
          />
        </div>
      </div>
    </>
  );
}
