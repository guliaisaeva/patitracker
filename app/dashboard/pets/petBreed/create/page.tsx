import Form from '@/app/components/pets/petBreed/create-form';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Evcil Hayvan Cinsi ', href: '/dashboard/pets/petBreed' },
          {
            label: 'Evcil Hayvan Cinsi Ekle',
            href: '/dashboard/pets/petBreed/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
