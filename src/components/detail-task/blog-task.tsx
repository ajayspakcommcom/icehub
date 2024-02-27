import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import { createUserTask, getUserTaskDetail } from '@/services/user-task';
import Task from '@/models/Task';

import dynamic from 'next/dynamic';
const SuccessMessage = dynamic(() => import('@/components/success-message/success-message'));


interface BlogProps {
  userId: string;
  taskId: string;
}

interface Content {
  userId?: string;
  taskId?: string;
  blogTitle?: string;
  blogParagraph?: string;
  selectedBlog?: string;
}


const BlogTask: React.FC<BlogProps> = ({ userId, taskId }) => {

  const [content, setContent] = useState<Content>();
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<any>();


  useEffect(() => {

    const fetchUserTaskDetail = async () => {
      try {
        const response = await getUserTaskDetail(userId as string, taskId as string, localStorage.getItem('token')!);
        console.log('response', response.data.data);

        setContent(previousState => {
          return { ...previousState, blogTitle: response.data.data.blogTitle, blogParagraph: response.data.data.blogParagraph, selectedBlog: response.data.data.selectedBlog }
        });

        //setAssignedTaskListData(formattedTasks);
        //setLoading(false);
      } catch (error: any) {
        //setError(error.message);
        //setLoading(false);
      }
    };

    fetchUserTaskDetail();

    return () => console.log('');
  }, [userId, taskId]);

  return (

    <div className='blog-task-wrapper'>
      <div id="content" className={content?.selectedBlog}>
        <h1 className='h1'>{content?.blogTitle}</h1>
        <div>
          <div id='blogParagraph'>
            {content?.blogParagraph}
          </div>
        </div>
      </div>

    </div>
  );
};

export default React.memo(BlogTask);
