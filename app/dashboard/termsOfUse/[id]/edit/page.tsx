"use client";
import Breadcrumbs from "@/app/components/managers/breadcrumbs";
import { useTranslation } from "react-i18next";
import TermsOfUseTableInfo from "@/app/components/termsOfUse/infoPage";
import TermsEditor from "@/app/components/termsOfUse/edit-form";

export default function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { t } = useTranslation();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("petBreed.petBreeds"), href: "/dashboard/pets/petBreed" },
          {
            label: t("petBreed.info"),
            href: `/dashboard/termsOfUse/${id}/edit`,
            active: true,
          },
        ]}
      />
      <TermsOfUseTableInfo />
    </main>
  );
}
