import Form from "@/app/components/devices/edit-form";
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
            label: t("device.update"),
            href: `/dashboard/devices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form deviceId={id} />
    </main>
  );
}
