import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import axios from 'axios';
import { createUserTask, uploadUserTaskVideo } from '@/services/user-task';
import Task from '@/models/Task';
import dynamic from 'next/dynamic';
const SuccessMessage = dynamic(() => import('@/components/success-message/success-message'));

interface CaseStudyTaskProps {
  userId: string;
  taskId: string;
  heading: string;
}



const VideoTask: React.FC<CaseStudyTaskProps> = ({ userId, taskId, heading }) => {

  const [content, setContent] = useState({ userId, taskId, videoTitle: heading });
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<any>();


  useEffect(() => {

    // setContent(previousState => {
    //   return { ...previousState }
    // });

  }, [userId, taskId]);


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {


    const file = e.target.files?.[0];
    if (!file) return;

    console.log('file', file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('videoTitle', content.videoTitle);
    formData.append('userId', userId);
    formData.append('taskId', taskId);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        //console.log('File uploaded successfully');
        setSuccess('File uploaded successfully')
        setTimeout(() => {
          setSuccess(null);
        }, 3000);


      } else {
        console.error('Failed to upload file:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }

  };

  return (
    <div className='video-task-main-wrapper'>
      <div className='video-task-wrapper'>
        <h1>Upload your video</h1>
        <label htmlFor='file'>
          <Image src={require('../../../public/images/upload.png')} alt={'upload video'} />
          <input type="file" name='file' id='file' onChange={handleFileUpload} accept="video/*" />
        </label>
      </div>
      <div className='success-message-admin-wrapper'>
        {success && <div className='admin-success'><SuccessMessage message={success} /></div>}
      </div>
    </div>
  );
};

export default React.memo(VideoTask);
