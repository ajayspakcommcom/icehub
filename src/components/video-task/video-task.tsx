import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import axios from 'axios';
import { createUserTask } from '@/services/user-task';
import Task from '@/models/Task';

interface CaseStudyTaskProps {
  userId: string;
  taskId: string;
  heading: string;
  createTaskType: string,
}



const VideoTask: React.FC<CaseStudyTaskProps> = ({ userId, taskId, heading, createTaskType }) => {

  const [content, setContent] = useState({ userId, taskId, videoTitle: heading, createTaskType });
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<any>();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    if (event.target.id.toLowerCase() === 'heading') {
      setContent(previousState => {
        return { ...previousState, caseStudyTitle: event.target.value }
      });
    }

    // if (event.target.id.toLowerCase() === 'intake') {
    //   setContent(previousState => {
    //     return { ...previousState, csQuestion2: event.target.value }
    //   });
    // }

  };

  const isFormValid = (): boolean => {
    return Object.values(content).every(value => value.trim() !== '');
  };


  useEffect(() => {

    // setContent(previousState => {
    //   return { ...previousState }
    // });

  }, [userId, taskId]);


  const saveContent = async () => {
    console.log('content', content);
    // try {
    //   const response = await createUserTask(content as Task, localStorage.getItem('token')!, 'video');
    //   console.log(response);
    //   if (response.status === 201) {
    //     setSuccess(response.data.message)
    //     setTimeout(() => {
    //       setSuccess(null);
    //     }, 3000);
    //   }

    // } catch (error: any) {
    //   console.error('Error saving:', error);
    // }
  };

  return (
    <div className='video-task-wrapper'>

      <h1>Upload your video</h1>

      <Image src={require('../../../public/images/upload.png')} alt={'upload video'} />

      <div className='btn-wrapper'>
        <Button variant="contained" size="large" className="ice-btn" disabled={!isFormValid()} onClick={() => saveContent()}> {'Upload'} </Button>
      </div>


    </div >
  );
};

export default React.memo(VideoTask);
