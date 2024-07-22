import Form from '@/app/components/announcements/create-form';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  // const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Duyurular', href: '/dashboard/announcements' },
          {
            label: 'Create Device',
            href: '/dashboard/announcements/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
