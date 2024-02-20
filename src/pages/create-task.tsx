"use client";
import React from "react";
import dynamic from 'next/dynamic';
import { Container, Grid } from "@mui/material";

const Header = dynamic(() => import('@/components/header/header'));
const CaseStudyTask = dynamic(() => import('@/components/case-study-task/case-study-task'));



export default function CreateTask() {

    const treatmentContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
    const diagnosisContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;

    return (
        <>
            <Header />
            <div className="create-task-wrapper">
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <CaseStudyTask heading={`Case Study Header Here?`} diagnosis={treatmentContent} treatment={diagnosisContent} elongated={`30`} intake={`60`} />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
}
