import Form from '@/app/components/customers/infoPage';
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
          { label: 'Kullanicilar', href: '/dashboard/customers' },
          {
            label: 'Customer Info',
            href: `/dashboard/customers/${id}/info`,
            active: true,
          },
        ]}
      />
      <Form userId={parseInt(id)} />
    </main>
  );
}
