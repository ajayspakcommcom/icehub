"use client";
import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
import { Container, Grid } from "@mui/material";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';


const Header = dynamic(() => import('@/components/header/header'));
const Loading = dynamic(() => import('@/components/loading/loading'));
const BlogTask = dynamic(() => import('@/components/detail-task/blog-task'));


export default function DetailTask() {

    const { data: session, status } = useSession({ required: true });
    const router = useRouter();

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
            <div className="create-task-wrapper">
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            {router.query.type === 'blog' && <BlogTask userId={router.query.userId as string} taskId={router.query.taskId as string} />}
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
}
