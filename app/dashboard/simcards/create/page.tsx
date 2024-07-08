import Form from '@/app/components/simcards/create-form';
import Breadcrumbs from '@/app/components/invoices/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  // const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sim Kartlar', href: '/dashboard/simcards' },
          {
            label: 'Create Sim Cards',
            href: '/dashboard/simcards/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
