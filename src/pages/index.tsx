import React from 'react';
import { getSession, useSession, signOut, } from 'next-auth/react';
import { Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';


export default function Home() {

  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <>
        <div>You must be logged in to view this content.</div>
        <Button type="button" variant="contained" color="primary" onClick={handleClick}> Login </Button>
      </>
    )
  }

  return (
    <>
      <Header />
      <Container>
        <pre> {JSON.stringify(status)}</pre>
        <div>{JSON.stringify(session)}</div>
        <h1>Hello World</h1>
        <Button type="button" variant="contained" color="primary" onClick={() => signOut({ callbackUrl: '/login', redirect: true })}> Sign Out </Button>
      </Container>
      <Footer />
    </>
  )



}


