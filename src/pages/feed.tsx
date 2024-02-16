"use client";
import React from "react";
import dynamic from 'next/dynamic';
import { Container, Grid } from "@mui/material";

const Header = dynamic(() => import('@/components/header/header'));
const FeedFilter = dynamic(() => import('@/components/feed-filter/feed-filter'));
const AnnouncementBanner = dynamic(() => import('@/components/announcement-banner/announcement-banner'));
const FeedItem = dynamic(() => import('@/components/feed-item/feed-item'));
const LiabraryWidget = dynamic(() => import('@/components/liabrary-widget/liabrary-widget'));



export default function SignInOne() {

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
