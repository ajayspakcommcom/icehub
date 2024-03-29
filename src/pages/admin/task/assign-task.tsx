import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';


const AdminLayout = dynamic(() => import('@/components/admin/layout/Layout'));
const Loading = dynamic(() => import('@/components/admin/loading/loading'));
const AssignTaskComp = dynamic(() => import('@/components/admin/task/assign-task'));
const BasicBreadcrumbs = dynamic(() => import('@/components/admin/custom-breadcrumbs/basic-breadcrumbs'));


export default function Home() {

  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  const { taskId } = router.query;

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
    { label: 'Task', href: '/admin/task' },
  ];
  const currentPage = 'Assign Task';


  const handleBreadcrumbClick = (href: string) => {
    router.push(href);
  };



  return (
    <>
      <AdminLayout>
        {/* <h1>Assigned Task Id : {taskId}</h1> */}

        <BasicBreadcrumbs links={breadcrumbLinks} currentPage={currentPage} onClick={handleBreadcrumbClick} />

        <AssignTaskComp queryTaskId={taskId as string} />

      </AdminLayout>
    </>
  )



}


