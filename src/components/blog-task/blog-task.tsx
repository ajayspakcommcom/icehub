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
  blogTitle: string;
  blogParagraph: string;
  selectedBlog: string;
  createTaskType: string,
  isEditMode?: boolean;
}


const BlogTask: React.FC<BlogProps> = ({ createTaskType, userId, taskId, blogTitle, blogParagraph, selectedBlog, isEditMode }) => {

  const [content, setContent] = useState({ createTaskType, userId, taskId, blogTitle, blogParagraph, selectedBlog });
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<any>();


  const [selectedTheme, setSelectedTheme] = useState<string>(selectedBlog);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    console.log(event.target.id.toLowerCase());

    if (event.target.id.toLowerCase() === 'blogtitle') {
      setContent(previousState => {
        return { ...previousState, blogTitle: event.target.value }
      });
    }

    if (event.target.id.toLowerCase() === 'blogparagraph') {
      setContent(previousState => {
        return { ...previousState, blogParagraph: event.target.value }
      });
    }

  };

  const isFormValid = (): boolean => {
    return Object.values(content).every(value => (value ?? '').trim() !== '');
  };


  useEffect(() => {

    setContent(previousState => {
      return { ...previousState, createTaskType: createTaskType, userId: userId, taskId: taskId, blogTitle: blogTitle }
    });

    return () => console.log('');
  }, [userId, taskId]);


  const changeThemeHandler = (event: React.MouseEvent<HTMLImageElement>): void => {

    if (event.currentTarget.id.toLocaleLowerCase() === 'white-theme') {
      setSelectedTheme('white-theme');
      setContent(previousState => {
        return { ...previousState, selectedBlog: 'white-theme' }
      });
    }

    if (event.currentTarget.id.toLocaleLowerCase() === 'black-theme') {
      setSelectedTheme('black-theme');
      setContent(previousState => {
        return { ...previousState, selectedBlog: 'black-theme' }
      });
    }

    if (event.currentTarget.id.toLocaleLowerCase() === 'pink-theme') {
      setSelectedTheme('pink-theme');
      setContent(previousState => {
        return { ...previousState, selectedBlog: 'pink-theme' }
      });
    }

  };

  const saveContent = async () => {
    console.log('content', content);
    try {
      const response = await createUserTask(content as Task, localStorage.getItem('token')!, 'blog');
      console.log(response);

      if (response.status === 201) {
        setSuccess(response.data.message)
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }

    } catch (error: any) {
      console.error('Error saving:', error);
    }
  };

  return (

    <div className='blog-task-wrapper'>
      <div className='blog-theme-wrapper'>
        <ul>
          <li><Image alt='alt' className='responsive-img' src={require('../../../public/images/blog/theme-1.png')} onClick={changeThemeHandler} id='white-theme' /></li>
          <li><Image alt='alt' className='responsive-img' src={require('../../../public/images/blog/theme-2.png')} onClick={changeThemeHandler} id='black-theme' /></li>
          <li><Image alt='alt' className='responsive-img' src={require('../../../public/images/blog/theme-3.png')} onClick={changeThemeHandler} id='pink-theme' /></li>
        </ul>
      </div>

      <div id="content" className={selectedTheme}>
        <input type='text' id='blogTitle' className='h1' maxLength={25} minLength={5} onChange={changeHandler} value={content.blogTitle} disabled={true} />
        <div>
          <textarea id="blogParagraph" name="blogParagraph" rows={6} onChange={changeHandler} value={content.blogParagraph}></textarea>
        </div>
      </div>

      <div className='btn-wrapper'>
        <Button variant="contained" size="large" className="ice-btn" disabled={!isFormValid()} onClick={() => saveContent()}> {'Save'} </Button>
        {success && <div className='registration-success'><SuccessMessage message={success} /></div>}
      </div>

    </div>
  );
};

export default React.memo(BlogTask);
