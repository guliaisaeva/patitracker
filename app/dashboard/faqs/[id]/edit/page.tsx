import Form from "@/app/components/faqs/edit-form";
import Breadcrumbs from "@/app/components/managers/breadcrumbs";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Sorular", href: "/dashboard/faqs" },
          {
            label: "Edit Sorular",
            href: `/dashboard/faqs/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form questionId={id} />
    </main>
  );
}
