"use client";
import Breadcrumbs from "@/app/components/managers/breadcrumbs";
import { useTranslation } from "react-i18next";
import TermsOfUseTableInfo from "@/app/components/termsOfUse/edit-form";
import TermsOfUseTableEdit from "@/app/components/termsOfUse/edit-form";
import { useSelector } from "react-redux";

export default function Page({
  params,
}: {
  params: { id: number; languageId: number };
}) {
  const id = params.id;
  const languageId = params.languageId;
  const { t } = useTranslation();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("terms.termsOfUse"), href: "/dashboard/termsOfUse" },
          {
            label: t("terms.update"),
            href: `/dashboard/termsOfUse/${id}/edit`,
            active: true,
          },
        ]}
      />
      <TermsOfUseTableEdit languageId={languageId} />
    </main>
  );
}
