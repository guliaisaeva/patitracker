"use client";
import Breadcrumbs from "@/app/components/managers/breadcrumbs";
import { useTranslation } from "react-i18next";
import PrivacyPolicyTableEdit from "@/app/components/privacyPolicy/edit-form";

export default function Page({
  params,
}: {
  params: { id: number; languageId: number };
}) {
  const id = params.id;
  const { t } = useTranslation();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("privacy.privacy"), href: "/dashboard/privacyPolicy" },
          {
            label: t("privacy.update"),
            href: `/dashboard/privacyPolicy/${id}/edit`,
            active: true,
          },
        ]}
      />
      <PrivacyPolicyTableEdit />
    </main>
  );
}
