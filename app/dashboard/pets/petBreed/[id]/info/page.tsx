import Form from '@/app/components/pets/petBreed/infoPage';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Evcil Hayvan Cinsi', href: '/dashboard/pets/petBreed' },
          {
            label: 'Evcil Hayvan Cins Bilgisi',
            href: `/dashboard/pets/petBreed/${id}/info`,
            active: true,
          },
        ]}
      />
      <Form breedId={id}   />
    </main>
  );
}
