import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Button, Container, Grid } from '@mui/material';


import dynamic from 'next/dynamic';
const BlogTask = dynamic(() => import('@/components/detail-task/blog-task'));
const CaseStudyTask = dynamic(() => import('@/components/detail-task/case-study-task'));
const VideoTask = dynamic(() => import('@/components/detail-task/video-task'));
const ApproveRejectButtons = dynamic(() => import('@/components/admin/ApproveRejectButtons/ApproveRejectButtons'));




interface AssignTaskProps {
    queryUserTaskId: string;
    queryTaskTypeId: string;
    queryUserId: string;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dob: Date | null;
    city: string;
    hospitalName: string;
    aboutYourSelf: string | null;
    imageUrl: string | null;
    specialization: string;
    designation: string;
    createdBy: string | null;
    updatedBy: string | null;
    updatedDate: Date | null;
    deletedBy: string | null;
    deletedDate: Date | null;
    createdDate: Date;
    __v: number;
}

const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First name', width: 150, editable: true },
    { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', type: 'text', width: 200, editable: true },
    { field: 'specialization', headerName: 'Specialization', type: 'text', width: 150, editable: true },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 15 },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const DetailUserTask: React.FC<AssignTaskProps> = ({ queryUserTaskId, queryTaskTypeId, queryUserId }) => {

    const [userTaskData, setUserTaskData] = React.useState<User[] | null>(null);
    const [taskTypeIdd, setTaskTypeIdd] = React.useState<string>(queryTaskTypeId);

    const onRowsSelectionHandler = (ids: any[]) => {

        // const idList: string[] = [...ids];

        // const assignedObject = idList.map(id => ({
        //     user: id,
        //     isSubmitted: false,
        //     createdDate: new Date()
        // }));

        // console.log('assignedObject', assignedObject);

        // setUserTaskDetails((prevState: any) => ({
        //     ...prevState,
        //     assignedTo: assignedObject
        // }));

    };



    React.useEffect(() => {

        console.log('queryUserTaskId', queryUserTaskId);
        console.log('queryTaskTypeId', queryTaskTypeId);
        console.log('queryUserId', queryUserId);


        //setTaskTypeIdd(queryTaskTypeId);

        // const fetchAdminUserTaskDetail = async () => {

        //     try {
        //         const response = await adminDetailUserTaskList(localStorage.getItem('token')!, queryUserTaskId);
        //         const respUserData = response.data.data;
        //         console.log('respUserData', respUserData);

        //         // const modifiedUserData = respUserData.map((item: any) => {
        //         //     const { _id, ...rest } = item;
        //         //     return { id: _id, ...rest };
        //         // });

        //         //setUserTaskData(modifiedUserData);
        //         //setLoading(false);
        //     } catch (error: any) {
        //         //setError(error.message);
        //         //setLoading(false);
        //     }
        // };

        // fetchAdminUserTaskDetail();

        return () => console.log();
    }, [queryUserTaskId, queryTaskTypeId, queryUserId]);

    const handleAccept = () => {
        console.log('Accepted');
    };

    const handleReject = (reason?: string) => {
        console.log('Rejected with reason:', reason);
    };

    if (taskTypeIdd === '65d734098abbb6154ff8afea') {
        return (
            <>
                <h1>Blog</h1>
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <BlogTask userId={queryUserId as string} taskId={queryUserTaskId as string} />
                            <ApproveRejectButtons onAccept={handleAccept} onReject={handleReject} />
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }

    if (taskTypeIdd === '65d7345d8abbb6154ff8afec') {
        return (
            <>
                <h1>Infographic</h1>
            </>
        );
    }

    if (taskTypeIdd === '65d734618abbb6154ff8afee') {
        return (
            <>
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <VideoTask userId={queryUserId as string} taskId={queryUserTaskId as string} />
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }

    if (taskTypeIdd === '65d734678abbb6154ff8aff0') {
        return (
            <>
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <CaseStudyTask userId={queryUserId as string} taskId={queryUserTaskId as string} />
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }

    return (
        <>
            <h1>User Task Detail</h1>
        </>
    )


};

export default React.memo(DetailUserTask);
