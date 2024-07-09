import Form from '@/app/components/devices/create-form';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  // const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Devices', href: '/dashboard/devices' },
          {
            label: 'Create Device',
            href: '/dashboard/devices/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
