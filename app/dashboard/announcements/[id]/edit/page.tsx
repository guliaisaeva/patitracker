"use client";
import Form from "@/app/components/announcements/edit-form";
import Breadcrumbs from "@/app/components/managers/breadcrumbs";
import { useTranslation } from "react-i18next";

export default function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { t } = useTranslation();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: t("announcement.announcements"),
            href: "/dashboard/announcements",
          },
          {
            label: t("announcement.update"),
            href: `/dashboard/announcements/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form announcementId={id} />
    </main>
  );
}
