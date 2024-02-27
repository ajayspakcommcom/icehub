"use client";
import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
import { Container, Grid } from "@mui/material";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { getUserTaskDetail } from "@/services/user-task";



const Header = dynamic(() => import('@/components/header/header'));
const Loading = dynamic(() => import('@/components/loading/loading'));
const BlogTask = dynamic(() => import('@/components/detail-task/blog-task'));


export default function DetailTask() {

    const { data: session, status } = useSession({ required: true });
    const router = useRouter();

    useEffect(() => {

        console.log('Type : ', router.query.type);
        console.log('userId : ', router.query.userId);
        console.log('taskId : ', router.query.taskId);
        console.log('taskTitle : ', router.query.taskTitle);

        const fetchUserTaskDetail = async () => {
            try {
                const response = await getUserTaskDetail(router.query.userId as string, router.query.taskId as string, localStorage.getItem('token')!);
                console.log('response', response.data.data);
                //setAssignedTaskListData(formattedTasks);
                //setLoading(false);
            } catch (error: any) {
                //setError(error.message);
                //setLoading(false);
            }
        };

        fetchUserTaskDetail();

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
