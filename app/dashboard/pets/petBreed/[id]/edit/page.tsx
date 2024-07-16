import Form from '@/app/components/pets/petBreed/edit-form';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  // const [invoice, customers] = await Promise.all([
  //   fetchInvoiceById(id),
  //   fetchCustomers(),
  // ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Evcil Hayvan Cinsi', href: '/dashboard/pets/petBreed' },
          {
            label: 'Edit Managers',
            href: `/dashboard//pets/petBreed/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form breedId={id}  />
    </main>
  );
}
