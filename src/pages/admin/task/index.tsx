import React from 'react';
import { getSession, useSession, signOut, } from 'next-auth/react';
import { Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('@/components/admin/layout/Layout'));
const Loading = dynamic(() => import('@/components/admin/loading/loading'));
const TaskList = dynamic(() => import('@/components/admin/task/task-list'));






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
        <TaskList />
      </AdminLayout>
    </>
  )



}


