import React from 'react';
import { getSession, useSession, signOut, } from 'next-auth/react';
import { Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/admin/layout/Header'));
const Footer = dynamic(() => import('@/components/admin/layout/Footer'));
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
      <Header />
      <Container>
        <h1>Home Banner List</h1>
      </Container>
      <Footer />
    </>
  )



}


