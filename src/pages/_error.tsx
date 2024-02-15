import React, { FunctionComponent } from 'react';
import { NextPageContext } from 'next';
import { Typography } from '@mui/material';
import dynamic from 'next/dynamic';
const Error = dynamic(() => import('@/components/error/index'), { ssr: false });

interface CustomErrorPageProps {
  statusCode?: number;
}

const CustomErrorPage: FunctionComponent<CustomErrorPageProps> = () => {

  return (
    <>
      <Error />
    </>
    
  );
};



export default CustomErrorPage;
