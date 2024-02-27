import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import { createUserTask } from '@/services/user-task';
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
}


const BlogTask: React.FC<BlogProps> = ({ userId, taskId }) => {

  const [content, setContent] = useState<Content>();
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<any>();


  useEffect(() => {

    setContent(previousState => {
      return { ...previousState, blogTitle: 'Heading', blogParagraph: 'Paragraph' }
    });

    return () => console.log('');
  }, [userId, taskId]);

  return (

    <div className='blog-task-wrapper'>

      <div id="content" className={'selectedTheme'}>
        <h1>{content?.blogTitle}</h1>
        <div>
          {content?.blogParagraph}
        </div>
      </div>

    </div>
  );
};

export default React.memo(BlogTask);
