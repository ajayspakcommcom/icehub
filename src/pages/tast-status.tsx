"use client";
import React from "react";
import dynamic from 'next/dynamic';
import { Container, Grid } from "@mui/material";

const Header = dynamic(() => import('@/components/header/header'));
const FeedItem = dynamic(() => import('@/components/feed-item/feed-item'));
const TaskStatusComp = dynamic(() => import('@/components/task-status/task-status'));


export default function TastStatus() {

  return (
    <>
      <Header />
      <div className="feed-wrapper">
        <Container>
          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <div className="feed-center-section">
                <TaskStatusComp />
              </div>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
