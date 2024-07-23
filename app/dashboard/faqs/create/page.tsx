import Form from '@/app/components/faqs/create-form';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sorular', href: '/dashboard/faqs' },
          {
            label: 'Create Question',
            href: '/dashboard/faqs/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
