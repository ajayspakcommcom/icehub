import React, { FunctionComponent, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, useSession, signOut, getCsrfToken, } from 'next-auth/react';
import { Button, Container } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';


export default function Index() {

  const router = useRouter();
  const { query } = router;

  return (
    <>
      <h1>Test</h1>
      <p>{JSON.stringify(query)}</p>
    </>
  )



}


