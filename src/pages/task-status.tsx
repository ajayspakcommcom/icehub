"use client";
import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
import { Container, Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const Header = dynamic(() => import('@/components/header/header'));
const FeedItem = dynamic(() => import('@/components/feed-item/feed-item'));
const TaskStatusComp = dynamic(() => import('@/components/task-status/task-status'));
const Loading = dynamic(() => import('@/components/loading/loading'));

interface Session {
  token: string;
  user: any
}


export default function TastStatus() {

  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  const sessionData = session as Session | null;

  useEffect(() => {

    //console.log('token', localStorage.getItem('token'));

    // const fetchAssignedTaskList = async () => {
    //   const resp = await assignedTaskList(localStorage.getItem('token')!);
    //   console.log(resp);
    // };

    // fetchAssignedTaskList();


    // const fetchSubmittedTaskList = async () => {
    //   const resp = await submittedTaskList(localStorage.getItem('token')!);
    //   console.log('Subbmiited Task: ', resp);
    // };

    // fetchSubmittedTaskList();




    return () => console.log('');
  }, [router]);

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
