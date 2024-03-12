import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUserTaskDetail } from '@/services/user-task';

interface CaseStudyTaskProps {
  userId: string;
  taskId: string;
  onGetTitleName: (name:string) => void;
}


const VideoTask: React.FC<CaseStudyTaskProps> = ({ userId, taskId, onGetTitleName }) => {

  const [content, setContent] = useState<any>();
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<any>();

  useEffect(() => {


    const fetchUserTaskDetail = async () => {
      try {
        const response = await getUserTaskDetail(userId as string, taskId as string, localStorage.getItem('token')!);
        const resp = response.data.data;
        console.log('response', resp);
        onGetTitleName(response.data.data.videoTitle)
        setContent(resp);
        //setAssignedTaskListData(formattedTasks);
        //setLoading(false);
      } catch (error: any) {
        //setError(error.message);
        //setLoading(false);
      }
    };

    fetchUserTaskDetail();

  }, [userId, taskId]);



  return (
    <div className='video-task-wrapper'>
      <div className='detail-task-wrapper'>
        {content && <h1>{content.videoTitle}</h1>}
        <video controls width="600">
          {content && <source src={content.videoUrl} type="video/mp4" />}
        </video>
      </div>
    </div>
  );
};

export default React.memo(VideoTask);
