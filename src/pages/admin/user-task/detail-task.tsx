import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('@/components/admin/layout/Layout'));
const Loading = dynamic(() => import('@/components/admin/loading/loading'));
const DetailUserTask = dynamic(() => import('@/components/admin/user-task/detail-user-task'));
const BasicBreadcrumbs = dynamic(() => import('@/components/admin/custom-breadcrumbs/basic-breadcrumbs'));


export default function Home() {

  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  const { userTaskId, taskTypeId, userId } = router.query;

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


  const breadcrumbLinks = [
    { label: 'User Task', href: '/admin/user-task' },
  ];
  const currentPage = 'User Created Task Detail';


  const handleBreadcrumbClick = (href: string) => {
    router.push(href);
  };



  return (
    <>
      <AdminLayout>
         <BasicBreadcrumbs links={breadcrumbLinks} currentPage={currentPage} onClick={handleBreadcrumbClick} />
        <DetailUserTask queryUserTaskId={userTaskId as string} queryTaskTypeId={taskTypeId as string} queryUserId={userId as string} />
      </AdminLayout>
    </>
  )



}


