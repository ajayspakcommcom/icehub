"use client";
import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
import { Container, Grid } from "@mui/material";
import { getSession, useSession, signOut, } from 'next-auth/react';
import { feedList } from "@/services/feed";

const Header = dynamic(() => import('@/components/header/header'));
const FeedFilter = dynamic(() => import('@/components/feed-filter/feed-filter'));
const AnnouncementBanner = dynamic(() => import('@/components/announcement-banner/announcement-banner'));
const FeedItem = dynamic(() => import('@/components/feed-item/feed-item'));
const LiabraryWidget = dynamic(() => import('@/components/liabrary-widget/liabrary-widget'));
const Loading = dynamic(() => import('@/components/loading/loading'));
import { FeedTask } from '@/models/FeedTask';




export default function Feed() {

  const { data: session, status } = useSession({ required: true });
  const [feedOrigionalDataList, setFeedOrigionalDataList] = React.useState<FeedTask[]>([]);
  const [feedDataList, setFeedDataList] = React.useState<FeedTask[]>([]);


  useEffect(() => {

    const fetchFeedList = async () => {
      try {
        const response = await feedList(localStorage.getItem('token')!);
        console.log('list', response.data.data);
        setFeedOrigionalDataList(response.data.data);
        setFeedDataList(response.data.data);
      } catch (error: any) {
        //setError(error.message);        
      }
    }

    fetchFeedList();

  }, []);


  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    return (
      <>
        <div>You must be logged in to view this content.</div>
      </>
    )
  }

  const handleFilterSelect = (selectedFilter: string) => {
    const origionalData = feedOrigionalDataList.filter((item: FeedTask) => item.task.taskType.toLowerCase() === selectedFilter.toLowerCase());
    setFeedDataList(origionalData);
  };


  return (
    <>
      <div id="feed-header">
        <Header />
      </div>

      <div className="feed-wrapper">
        <Container>
          <Grid container className="feed-container">
            <Grid item xs={3}>
              <div id="left">
                <FeedFilter setSelectedFilter={handleFilterSelect} />
              </div>
            </Grid>
            <Grid item xs={6} id="center">
              <div className="feed-center-section">
                <AnnouncementBanner />
                {feedDataList.map((feedItem, index) => (
                  <FeedItem key={index} feedItemTask={feedItem} />
                ))}
              </div>
            </Grid>
            <Grid item xs={3} id="right">
              <div id="right">
                <LiabraryWidget />
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
