import Form from '@/app/components/devices/infoPage';
import Breadcrumbs from '@/app/components/invoices/breadcrumbs';
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
            label: 'Cihaz Bilgisi',
            href: `/dashboard/devices/${id}/info`,
            active: true,
          },
        ]}
      />
      <Form deviceId={id}  />
    </main>
  );
}
