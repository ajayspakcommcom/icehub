import React from 'react';
import { getSession, useSession, signOut, } from 'next-auth/react';
import { Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const generateDummyData = (count: any) => {

  const dummyData = [];
  for (let i = 0; i < count; i++) {
    dummyData.push({ id: i + 1, content: `Feed item ${i + 1}`, likes: Math.floor(Math.random() * 100), dislikes: Math.floor(Math.random() * 50) });
  }
  return dummyData;

};

const FeedItem = (item: any) => {
  const [likes, setLikes] = React.useState(item.likes || 0);
  const [dislikes, setDislikes] = React.useState(item.dislikes || 0);

  const handleLike = () => {
    // Update likes count
    setLikes(likes + 1);
    // You can also send an API request to update the backend with the like action
  };

  const handleDislike = () => {
    // Update dislikes count
    setDislikes(dislikes + 1);
    // You can also send an API request to update the backend with the dislike action
  };

  return (
    <div className="feed-item">
      <p>{item.content}</p>
      <div>
        <button onClick={handleLike}>Like ({likes})</button>
        <button onClick={handleDislike}>Dislike ({dislikes})</button>
      </div>
    </div>
  );
};

export default function Test() {

  const dummyFeedItems = generateDummyData(10);

  return (
    <div className="feed">
      {dummyFeedItems.map((item, index) => (
        <FeedItem key={index} item={item} />
      ))}
    </div>
  );




}


