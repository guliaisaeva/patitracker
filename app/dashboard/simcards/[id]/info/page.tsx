import Form from '@/app/components/simcards/infoPage';
import Breadcrumbs from '@/app/components/invoices/breadcrumbs';
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
          { label: 'Sim Kartlar', href: '/dashboard/simcards' },
          {
            label: 'Sim Kart Bilgisi',
            href: `/dashboard/simcards/${id}/info`,
            active: true,
          },
        ]}
      />
      <Form simCardId={id}  />
    </main>
  );
}
