"use client";
import Form from "@/app/components/devices/infoPage";
import Breadcrumbs from "@/app/components/managers/breadcrumbs";
import { useTranslation } from "react-i18next";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const { t } = useTranslation();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("device.devices"), href: "/dashboard/devices" },
          {
            label: t("device.info"),
            href: `/dashboard/devices/${id}/info`,
            active: true,
          },
        ]}
      />
      <Form deviceId={id} />
    </main>
  );
}
