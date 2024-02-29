import React from 'react';
import { getSession, useSession, signOut, } from 'next-auth/react';
import { Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

export default function Test() {

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        console.log('Video Width:', video.videoWidth);
        console.log('Video Height:', video.videoHeight);

        if (video.videoWidth > 1000) {
          console.log('>1000');

        }

      };

      video.src = URL.createObjectURL(file);

    }
  };


  return (
    <>
      <input type="file" name='file' id='file' onChange={handleFileUpload} accept="video/*" />
    </>
  )



}


