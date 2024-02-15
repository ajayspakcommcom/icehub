import React, { FunctionComponent, useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, useSession, signOut, getCsrfToken, } from 'next-auth/react';
import { Button, Container } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fetchProducts } from '@/services/product';


export default function Product() { 

  const { data:session, status } = useSession({required: true});
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  useEffect(() => {

    const loadData = async () => {
      if(session) {
        // const data = await fetchProducts(session.token);
        // console.log('data', data);
      }
      
    };

    loadData();

    
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <>
        <div>You must be logged in to view this content.</div>
        <Button type="button" variant="contained"  color="primary" onClick={handleClick}> Login </Button>
      </>
    ) 
  }

  return (
    <>
    <Header />
    <Container>
      <pre> {JSON.stringify(status)}</pre>
      <div>{JSON.stringify(session)}</div>
      <h1>Product</h1>
      <Button type="button" variant="contained"  color="primary" onClick={() => signOut({callbackUrl:'/login',redirect:true})}> Sign Out </Button>
    </Container>
    <Footer />
    </>
  )

  

}


