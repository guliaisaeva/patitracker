"use client";
import Form from "@/app/components/pets/petBreed/create-form";
import Breadcrumbs from "@/app/components/managers/breadcrumbs";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("petBreed.petBreeds"), href: "/dashboard/pets/petBreed" },
          {
            label: t("petBreed.create"),
            href: "/dashboard/pets/petBreed/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
