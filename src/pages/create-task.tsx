"use client";
import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
import { Container, Grid } from "@mui/material";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Header = dynamic(() => import('@/components/header/header'));
const CaseStudyTask = dynamic(() => import('@/components/case-study-task/case-study-task'));
const BlogTask = dynamic(() => import('@/components/blog-task/blog-task'));
const Loading = dynamic(() => import('@/components/loading/loading'));
const VideoTask = dynamic(() => import('@/components/video-task/video-task'));


export default function CreateTask() {

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

    const treatmentContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
    const diagnosisContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
    const paragraphContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;


    return (
        <>
            <Header />
            <div className="create-task-wrapper">
                <Container>
                    <Grid container>
                        <Grid item xs={12}>

                            {router.query.type === 'blog' && <BlogTask createTaskType={'blog'} userId={router.query.userId as string} taskId={router.query.taskId as string} blogTitle={router.query.taskTitle as string} blogParagraph={paragraphContent} selectedBlog={'white-theme'} />}
                            {router.query.type === 'case study' && <CaseStudyTask createTaskType={'case-study'} userId={router.query.userId as string} taskId={router.query.taskId as string} heading={`${router.query.taskTitle}`} diagnosis={treatmentContent} treatment={diagnosisContent} elongated={`30`} intake={`60`} />}
                            {router.query.type === 'video' && <VideoTask userId={router.query.userId as string} taskId={router.query.taskId as string} heading={router.query.taskTitle as string} />}
                            {router.query.type === 'infographic' && <h1>Infographic</h1>}
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
}
