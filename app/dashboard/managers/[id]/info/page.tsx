import Form from '@/app/components/managers/infoPage';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';
// import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  // const [invoice, customers] = await Promise.all([
  //   fetchInvoiceById(id),
  //   fetchCustomers(),
  // ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Yöneticiler', href: '/dashboard/managers' },
          {
            label: 'Yönetici Bilgisi',
            href: `/dashboard/managers/${id}/info`,
            active: true,
          },
        ]}
      />
      <Form managerId={id}  />
    </main>
  );
}
