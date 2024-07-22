import Form from '@/app/components/announcements/infoPage';
import Breadcrumbs from '@/app/components/managers/breadcrumbs';

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Duyurular', href: '/dashboard/announcements' },
          {
            label: 'Duyuru Bilgileri',
            href: `/dashboard/announcements/${id}/info`,
            active: true,
          },
        ]}
      />
      <Form announcementId={id}   />
    </main>
  );
}
