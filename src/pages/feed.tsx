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




export default function Feed() {

  const { data: session, status } = useSession({ required: true });


  useEffect(() => {

    const fetchFeedList = async () => {
      try {
        const response = await feedList(localStorage.getItem('token')!);
        const taskData = response.data.data;
        console.log('feed List', taskData);

        //setSubmittedTaskListData(taskData);
        //setLoading(false);
      } catch (error: any) {
        //setError(error.message);
        //setLoading(false);
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


  return (
    <>
      <Header />
      <div className="feed-wrapper">
        <Container>
          <Grid container>
            <Grid item xs={3}>
              <FeedFilter />
            </Grid>
            <Grid item xs={6}>
              <div className="feed-center-section">
                <AnnouncementBanner />
                <FeedItem />
                <FeedItem />
                <FeedItem />
              </div>
            </Grid>
            <Grid item xs={3}>
              <LiabraryWidget />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
