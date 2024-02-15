// pages/_error.tsx

import React from 'react';
import { Button, Typography } from '@mui/material';
import styles from './error.module.scss';
import { useRouter } from 'next/router';

interface ErrorPageProps {
  statusCode?: string; 
}

const ErrorPage: React.FC<ErrorPageProps> = ({statusCode}) => {

    const router = useRouter();

    const handleNavigation = () => {
        router.push('/login');
      };

  return (
    <div className={styles.errorPage}>
      {/* <Typography variant="h1" className={styles.errorHeading}> Oops! Something went wrong. </Typography>
      <Typography variant="body1" className={styles.errorMessage}> We're sorry, but it seems an error occurred. Please try again later. </Typography>
      <Button type="button" variant="contained"  color="primary" size='large' onClick={() => handleNavigation()}> Home </Button> */}
    </div>
  );
};

export default React.memo(ErrorPage);
