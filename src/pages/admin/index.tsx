import React from 'react';
import { getSession, useSession, signOut, } from 'next-auth/react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';

const AdminLayout = dynamic(() => import('@/components/admin/layout/Layout'));
const Loading = dynamic(() => import('@/components/admin/loading/loading'));


export default function Home() {

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
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </AdminLayout>
    </>
  )



}


