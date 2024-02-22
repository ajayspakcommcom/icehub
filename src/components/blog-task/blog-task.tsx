import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import axios from 'axios';

interface BlogProps {
  heading: string;
  paragraph: string;
  selectedLayout: string;
}

const BlogTask: React.FC<BlogProps> = ({ heading, paragraph, selectedLayout }) => {

  const [content, setContent] = useState({ heading, paragraph, selectedLayout });

  const [selectedTheme, setSelectedTheme] = useState<string>(selectedLayout);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    if (event.target.id.toLowerCase() === 'heading') {
      setContent(previousState => {
        return { ...previousState, heading: event.target.value }
      });
    }

    if (event.target.id.toLowerCase() === 'paragraph') {
      setContent(previousState => {
        return { ...previousState, paragraph: event.target.value }
      });
    }

  };

  const isFormValid = (): boolean => {
    return Object.values(content).every(value => (value ?? '').trim() !== '');
  };


  useEffect(() => {

  }, []);


  const saveContent = async () => {
    console.log('content', content);
    // try {
    //   const response = await axios.post('http://example.com/save', content);
    //   console.log('Saved:', response.data);
    // } catch (error) {
    //   console.error('Error saving:', error);
    // }
  };

  const changeThemeHandler = (event: React.MouseEvent<HTMLImageElement>): void => {

    if (event.currentTarget.id.toLocaleLowerCase() === 'white-theme') {
      setSelectedTheme('white-theme');
      setContent(previousState => {
        return { ...previousState, selectedLayout: 'white-theme' }
      });
    }

    if (event.currentTarget.id.toLocaleLowerCase() === 'black-theme') {
      setSelectedTheme('black-theme');
      setContent(previousState => {
        return { ...previousState, selectedLayout: 'black-theme' }
      });
    }

    if (event.currentTarget.id.toLocaleLowerCase() === 'pink-theme') {
      setSelectedTheme('pink-theme');
      setContent(previousState => {
        return { ...previousState, selectedLayout: 'pink-theme' }
      });
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
        <input type='text' id='heading' className='h1' maxLength={25} minLength={5} onChange={changeHandler} value={content.heading} />
        <div>
          <textarea id="paragraph" name="paragraph" rows={6} onChange={changeHandler} value={content.paragraph}></textarea>
        </div>
      </div>

      <div className='btn-wrapper'>
        <Button variant="contained" size="large" className="ice-btn" disabled={!isFormValid()} onClick={() => saveContent()}> {'Save'} </Button>
      </div>

    </div>
  );
};

export default React.memo(BlogTask);
