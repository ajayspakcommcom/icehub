"use client";
import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
import { Container, Grid } from "@mui/material";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
const BasicBreadcrumbs = dynamic(() => import('@/components/admin/custom-breadcrumbs/basic-breadcrumbs'));


const Header = dynamic(() => import('@/components/header/header'));
const Loading = dynamic(() => import('@/components/loading/loading'));
const BlogTask = dynamic(() => import('@/components/detail-task/blog-task'));
const CaseStudyTask = dynamic(() => import('@/components/detail-task/case-study-task'));
const VideoTask = dynamic(() => import('@/components/detail-task/video-task'));


export default function DetailTask() {

    const { data: session, status } = useSession({ required: true });
    const [currentPage, setCurrentPage] = React.useState<string>();

    const router = useRouter();

    useEffect(() => {
        return () => console.log(router.query.type);
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


    const breadcrumbLinks = [ { label: 'Feed', href: '/feed' }];
    
    
    const handleBreadcrumbClick = (href: string) => {
    router.push(href);
    };

    const geGetTitleNameHandler = (name: string) => {
        setCurrentPage(name);
    };

    return (
        <>
            <Header />
            <div className="detail-task-wrapper">
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            {currentPage && <BasicBreadcrumbs links={breadcrumbLinks} currentPage={currentPage} onClick={handleBreadcrumbClick} />} 
                            {router.query.type === 'blog' && <BlogTask userId={router.query.userId as string} taskId={router.query.taskId as string} onGetTitleName={geGetTitleNameHandler} />}
                            {router.query.type === 'case study' && <CaseStudyTask userId={router.query.userId as string} taskId={router.query.taskId as string} onGetTitleName={geGetTitleNameHandler} />}
                            {router.query.type === 'video' && <VideoTask userId={router.query.userId as string} taskId={router.query.taskId as string} onGetTitleName={geGetTitleNameHandler} />}
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
}
