"use client";
import Form from "@/app/components/managers/edit-form";
import Breadcrumbs from "@/app/components/managers/breadcrumbs";
import { useTranslation } from "react-i18next";

export default function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { t } = useTranslation();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("manager.managers"), href: "/dashboard/managers" },
          {
            label: t("manager.update"),
            href: `/dashboard/managers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form managerId={id} />
    </main>
  );
}
