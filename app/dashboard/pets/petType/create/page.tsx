import Form from '@/app/components/pets/petType/create-form';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Evcil Hayvan Türü', href: '/dashboard/pets/petType' },
          {
            label: 'Evcil Hayvan Türü Ekle',
            href: '/dashboard/pets/petType/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
