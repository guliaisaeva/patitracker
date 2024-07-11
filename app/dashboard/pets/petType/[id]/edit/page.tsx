import Form from '@/app/components/pets/petType/edit-form';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Yöneticiler', href: '/dashboard/managers' },
          {
            label: 'Edit Managers',
            href: `/dashboard/managers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form PetTypeId={id}  />
    </main>
  );
}
