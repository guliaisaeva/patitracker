import Form from '@/app/components/pets/petType/infoPage';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';
// import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

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
          { label: 'Evcil Hayvan Türü', href: '/dashboard/pets/' },
          {
            label: 'Yönetici Bilgisi',
            href: `/dashboard/managers/${id}/info`,
            active: true,
          },
        ]}
      />
      <Form PetTypeId={id}   />
    </main>
  );
}
