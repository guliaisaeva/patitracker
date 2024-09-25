"use client";
import Form from "@/app/components/faqs/edit-form";
import Breadcrumbs from "@/app/components/managers/breadcrumbs";
import { useTranslation } from "react-i18next";

export default function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { t } = useTranslation();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("faq.faqs"), href: "/dashboard/faqs" },
          {
            label: t("faq.update"),
            href: `/dashboard/faqs/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form questionId={id} languageId={0} />
    </main>
  );
}
