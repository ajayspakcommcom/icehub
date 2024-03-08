import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowId, GridValueGetterParams } from '@mui/x-data-grid';
import { fetAllUser } from '@/services/user';
import { Button } from '@mui/material';
import { getUserData } from '@/libs/common';
import { assignAdminTask } from '@/services/task';

interface AssignTaskProps {
    queryTaskId: string;
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
    //{ field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.', sortable: false, width: 200, valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}` }
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

const AssignTask: React.FC<AssignTaskProps> = ({ queryTaskId }) => {

    const [userData, setUserData] = React.useState<User[] | null>(null);
    const [taskDetails, setTaskDetails] = React.useState<{ assignedTo: any[], updatedBy: string, updatedDate: Date } | null>(null);

    const onRowsSelectionHandler = (ids: any[]) => {

        const idList: string[] = [...ids];

        const assignedObject = idList.map(id => ({
            user: id,
            isSubmitted: false,
            createdDate: new Date()
        }));

        console.log('assignedObject', assignedObject);

        setTaskDetails((prevState: any) => ({
            ...prevState,
            assignedTo: assignedObject
        }));

    };



    React.useEffect(() => {

        const fetchApprovedTaskList = async () => {

            try {
                const response = await fetAllUser(localStorage.getItem('token')!);
                const respUserData = response.data.data;

                const modifiedUserData = respUserData.map((item: any) => {
                    const { _id, ...rest } = item;
                    return { id: _id, ...rest };
                });

                setUserData(modifiedUserData);
                //setLoading(false);
            } catch (error: any) {
                //setError(error.message);
                //setLoading(false);
            }
        };

        fetchApprovedTaskList();

        return () => console.log();
    }, []);

    const assignedTaskHandler = () => {

        setTaskDetails((prevState: any) => ({
            ...prevState,
            taskId: queryTaskId,
            updatedBy: getUserData()?._id!
        }));

        console.log('taskDetails', taskDetails);

        const taskData = {
            "type": "ASSIGN-ADMIN-TASK",
            "taskId": queryTaskId,
            "updatedBy": getUserData()?._id!,
            ...taskDetails,
        };


        const handleAssignAdminTask = async () => {
            try {
                const token = localStorage.getItem('token')!;
                const response = await assignAdminTask(token, taskData);
                console.log('Task updated successfully:', response);
            } catch (error) {
                console.error('Error creating task:', error);
            }
        };

        handleAssignAdminTask();

    };

    return (
        <>
            {userData && userData.length > 0 &&
                <>
                    <DataGrid
                        rows={userData}
                        columns={columns}
                        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                    />
                    <div className='right mt-15'>
                        <Button variant="contained" color='success' onClick={assignedTaskHandler}>Assign</Button>
                    </div>
                </>
            }
        </>
    );
};

export default React.memo(AssignTask);
