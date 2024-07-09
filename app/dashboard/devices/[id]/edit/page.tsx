import Form from '@/app/components/managers/edit-form';
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
          { label: 'Cihazlar', href: '/dashboard/devices' },
          {
            label: 'Edit Devices',
            href: `/dashboard/devices/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* <Form invoice={invoice} customers={customers} /> */}
    </main>
  );
}
