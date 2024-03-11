import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridRowsProp, GridRowModesModel, GridRowModes, DataGrid, GridColDef, GridToolbarContainer, GridActionsCellItem, GridEventListener, GridRowId, GridRowModel, GridRowEditStopReasons } from '@mui/x-data-grid';
import { randomCreatedDate, randomTraderName, randomId, randomArrayItem } from '@mui/x-data-grid-generator';
import { createAdminTask, deleteAdminTask, getAdminTaskList, updateAdminTask } from '@/services/task';
import { getUserData } from '@/libs/common';
import { getTaskTypeId } from '@/pages/api/service/common';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import { adminUserTaskList } from '@/services/user-task';

const taskTypes = ['Blog', 'Infographic', 'Video', 'Case Study'];

const taskTypeRole = () => {
    return randomArrayItem(taskTypes);
};

const initialRows: GridRowsProp = [
    {
        id: randomId(),
        name: randomTraderName(),
        dueDate: randomCreatedDate(),
        taskType: taskTypeRole()
    }
];

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {

    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [{ id, name: '', isNew: true }, ...oldRows]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer style={{ justifyContent: 'flex-end' }}>
            {/* <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button> */}
        </GridToolbarContainer>
    );
}

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dob: string | null;
    city: string;
    hospitalName: string;
    aboutYourSelf: string | null;
    imageUrl: string | null;
    specialization: string;
    designation: string;
    createdDate: string;
}

interface AssignedTo {
    user: string;
    isSubmitted: boolean;
    createdDate: string;
    _id: string;
}

interface Task {
    _id: string;
    name: string;
    taskType: string;
    dueDate: string;
    assignedTo: AssignedTo[];
    createdBy: string;
    updatedBy: string;
    updatedDate: string;
    deletedBy: string | null;
    deletedDate: string | null;
    createdDate: string;
}

interface UserTask {
    _id: string;
    user: User;
    task: Task;
    blogTitle: string;
    blogParagraph: string;
    caseStudyTitle: string | null;
    csDiagnosis: string | null;
    csTreatment: string | null;
    csQuestion1: string | null;
    csQuestion2: string | null;
    csDoctorName: string | null;
    videoTitle: string | null;
    videoUrl: string | null;
    infographicTitle: string | null;
    infographic1: string | null;
    infographic2: string | null;
    infographic3: string | null;
    infographic4: string | null;
    infographic5: string | null;
    infographic6: string | null;
    selectedBlog: string;
    selectedInfographic: string | null;
    submitted: boolean;
    completionDate: string | null;
    likes: string[];
    createdBy: string | null;
    updatedBy: string | null;
    updatedDate: string | null;
    deletedBy: string | null;
    deletedDate: string | null;
    approvedByAdmin: boolean;
    rejectionReason: string | null;
    createdDate: string;
    __v: number;
}


const UserTaskList = () => {

    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const router = useRouter();

    React.useEffect(() => {

        const fetchAdminTaskList = async () => {

            try {
                const response = await adminUserTaskList(localStorage.getItem('token')!);
                const userTaskData = response.data.data;
                const formattedUserTaskList = userTaskData.map((userTask: UserTask) => ({
                    ...userTask,
                    id: userTask._id,
                    userName: userTask.user.firstName + ' ' + userTask.user.lastName,
                    taskName: userTask.task.name,
                    dueDate: new Date(userTask.task.dueDate),
                    taskTypeId: userTask.task.taskType,
                    _id: undefined
                }));
                setRows(formattedUserTaskList);
                console.log('user submitted task', formattedUserTaskList);
            } catch (error: any) {
                console.log('Error', error);
            }
        };

        fetchAdminTaskList();

        return () => console.log('');
    }, []);


    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const detailUserTask = (id: GridRowId, row: any) => {
        //console.log('User task detail with ID:', id);
        console.log(row.user._id);


        router.push({
            pathname: '/admin/user-task/detail-task',
            query: { userTaskId: id, taskTypeId: row.task.taskType, userId: row.user._id }
        });
    };

    const columns: GridColDef[] = [
        { field: 'taskName', headerName: 'Task Name', type: 'text', width: 180, editable: true },
        { field: 'userName', headerName: 'User Name', type: 'text', width: 180, editable: true },
        { field: 'dueDate', headerName: 'Due Date', type: 'date', width: 180, editable: true },
        {
            field: 'actions', type: 'actions', headerName: 'Actions', width: 100, cellClassName: 'actions',
            getActions: ({ id, row }) => {

                return [
                    <GridActionsCellItem icon={<VisibilityIcon />} label="Detail" onClick={() => detailUserTask(id, row)} color="inherit" />
                ];
            },
        },
    ];

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{ toolbar: EditToolbar }}
            slotProps={{
                toolbar: { setRows, setRowModesModel },
            }}

            initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}

        />
    );
};

export default React.memo(UserTaskList);
