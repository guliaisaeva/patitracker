import Form from '@/app/components/announcements/edit-form';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Duyurular', href: '/dashboard/announcements' },
          {
            label: 'Edit Duyurular',
            href: `/dashboard/announcements/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form announcementId={id}   />
    </main>
  );
}
