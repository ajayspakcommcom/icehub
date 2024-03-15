import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('@/components/admin/layout/Layout'));
const Loading = dynamic(() => import('@/components/admin/loading/loading'));
const HomeBannerList = dynamic(() => import('@/components/admin/home-banner/home-banner-list'));


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
        <HomeBannerList />
      </AdminLayout>
    </>
  )
}

export default index;


