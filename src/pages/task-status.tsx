"use client";
import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
import { Container, Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const Header = dynamic(() => import('@/components/header/header'));
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
            {/* <Grid item xs={2}></Grid> */}
            <Grid item xs={12}>
              <div className="feed-center-section">
                <TaskStatusComp />
              </div>
            </Grid>
            {/* <Grid item xs={2}></Grid> */}
          </Grid>
        </Container>
      </div>
    </>
  );
}
