import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('@/components/admin/layout/Layout'));
const Loading = dynamic(() => import('@/components/admin/loading/loading'));
const AnnouncementBannerList = dynamic(() => import('@/components/admin/announcement-banner/announcement-banner-list'));



const index = () => {

  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    return (
      <>
        <div>You must be logged in to view this content.</div>
      </>
    )
  }

  return (
    <>
      <AdminLayout>
        <AnnouncementBannerList />
      </AdminLayout>
    </>
  )
}

export default index;


