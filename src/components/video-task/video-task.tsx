import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import axios from 'axios';
import { createUserTask, getUserTaskDetail, uploadUserTaskVideo } from '@/services/user-task';
import Task from '@/models/Task';
import dynamic from 'next/dynamic';
const SuccessMessage = dynamic(() => import('@/components/success-message/success-message'));

interface CaseStudyTaskProps {
  userId: string;
  taskId: string;
  heading: string;
  isEditMode?: boolean;
}

interface VideoType {
  _id: string;
  user: string;
  task: string;
  blogTitle?: string | null;
  blogParagraph?: string | null;
  caseStudyTitle?: string | null;
  csDiagnosis?: string | null;
  csTreatment?: string | null;
  csQuestion1?: string | null;
  csQuestion2?: string | null;
  csDoctorName?: string | null;
  videoTitle?: string | null;
  videoUrl?: string | null;
  infographicTitle?: string | null;
  infographic1?: string | null;
  infographic2?: string | null;
  infographic3?: string | null;
  infographic4?: string | null;
  infographic5?: string | null;
  infographic6?: string | null;
  selectedBlog?: string | null;
  selectedInfographic?: string | null;
  submitted: boolean;
  completionDate?: Date | null;
  likes: string[];
  createdBy?: string | null;
  updatedBy?: string | null;
  updatedDate?: Date | null;
  deletedBy?: string | null;
  deletedDate?: Date | null;
  approvedByAdmin: boolean;
  rejectionReason?: string | null;
  createdDate: Date;
  __v: number;
}

const VideoTask: React.FC<CaseStudyTaskProps> = ({ userId, taskId, heading, isEditMode }) => {

  const [content, setContent] = useState({ userId, taskId, videoTitle: heading });
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<any>();

  const [updatedContent, setUpdatedContent] = React.useState<VideoType | null>(null);


  useEffect(() => {


    const getTaskDetail = async () => {

      try {
        const respData = await getUserTaskDetail(userId, taskId, localStorage.getItem('token')!);
        console.log('Data', respData);

        setUpdatedContent(respData.data.data);

      } catch (error: any) {
        console.error('Error saving:', error);
      }
    };

    if (isEditMode) {
      getTaskDetail();
      // console.log('Edit mode', isEditMode);
      // console.log('userId', userId);
      // console.log('taskId', taskId);
      // console.log('heading', heading);
    }



  }, [userId, taskId]);


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {


    const file = e.target.files?.[0];
    if (!file) return;

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
    <>
      {
        isEditMode && updatedContent?.videoUrl &&
        <div className='edit-video-wrapper'>
          <video controls>
            <source src={updatedContent?.videoUrl} type="video/ogg" />
          </video>
        </div>
      }
      <div className={`video-task-main-wrapper ${isEditMode && 'relative-edit-wrapper'}`}>
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
    </>
  );
};

export default React.memo(VideoTask);
