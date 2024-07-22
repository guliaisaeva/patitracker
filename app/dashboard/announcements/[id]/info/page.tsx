import Form from '@/app/components/pets/petType/infoPage';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Evcil Hayvan Türü', href: '/dashboard/pets/petType' },
          {
            label: 'Evcil Hayvan Tür Bilgisi',
            href: `/dashboard/pets/petType/${id}/info`,
            active: true,
          },
        ]}
      />
      <Form PetTypeId={id}  />
    </main>
  );
}
