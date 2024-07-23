import Form from "@/app/components/faqs/infoPage";
import Breadcrumbs from "@/app/components/managers/breadcrumbs";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Sorular", href: "/dashboard/faqs" },
          {
            label: "Soru Bilgileri",
            href: `/dashboard/faqs/${id}/info`,
            active: true,
          },
        ]}
      />
      <Form questionId={id} />
    </main>
  );
}
