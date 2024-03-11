import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridRowsProp, GridRowModesModel, GridRowModes, DataGrid, GridColDef, GridToolbarContainer, GridActionsCellItem, GridEventListener, GridRowId, GridRowModel, GridRowEditStopReasons } from '@mui/x-data-grid';
import { randomCreatedDate, randomTraderName, randomId, randomArrayItem } from '@mui/x-data-grid-generator';
import { createAdminTask, deleteAdminTask, getAdminTaskList, updateAdminTask } from '@/services/task';
import { getUserData } from '@/libs/common';
import { getTaskTypeId } from '@/pages/api/service/common';
import { useRouter } from 'next/router';
import { adminTaskList } from '@/services/user-task';

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
            <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
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
                const response = await adminTaskList(localStorage.getItem('token')!);
                const userTaskData = response.data.data;
                const formattedUserTaskList = userTaskData.map((userTask: UserTask) => ({
                    ...userTask,
                    id: userTask._id,
                    userName: userTask.user.firstName + ' ' + userTask.user.lastName,
                    taskName: userTask.task.name,
                    dueDate: new Date(userTask.task.dueDate),
                    _id: undefined
                }));
                setRows(formattedUserTaskList);
                //console.log('user submitted task', taskData);
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

    const handleEditClick = (id: GridRowId) => () => {
        console.log(rowModesModel);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {

        const handleDeleteAdminTask = async () => {
            try {
                const token = localStorage.getItem('token')!;
                const taskData = {
                    "type": "DELETE-TASK",
                    "taskId": id,
                };
                const response = await deleteAdminTask(token, taskData);
                console.log('Task deleted successfully:', response);
                setRows(rows.filter((row) => row.id !== id));
            } catch (error) {
                console.error('Error creating task:', error);
            }
        };

        handleDeleteAdminTask();

    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true }
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow };
        console.log('updatedRow', updatedRow);

        const handleCreateTask = async () => {
            try {
                const token = localStorage.getItem('token')!;
                const taskData = {
                    "type": "CREATE",
                    "name": newRow.name,
                    "taskTypeName": newRow.taskTypeName,
                    "dueDate": newRow.dueDate,
                    "assignedTo": [],
                    "createdBy": getUserData()?._id
                };
                const response = await createAdminTask(token, taskData);
                console.log('Task created successfully:', response);
            } catch (error) {
                console.error('Error creating task:', error);
            }
        };

        if (newRow.isNew) {
            //console.log("New record:", newRow);
            handleCreateTask();
        } else {
            console.log("Updated record:", newRow);

            const handleUpdateTask = async () => {
                try {
                    const token = localStorage.getItem('token')!;
                    const taskData = {
                        "type": "UPDATE-TASK",
                        "taskId": newRow.id,
                        "name": newRow.name,
                        "taskTypeName": newRow.taskTypeName,
                        "dueDate": newRow.dueDate,
                        "assignedTo": [],
                        "updatedBy": getUserData()?._id
                    };
                    const response = await updateAdminTask(token, taskData);
                    console.log('Task updated successfully:', response);
                } catch (error) {
                    console.error('Error creating task:', error);
                }
            };

            handleUpdateTask();

        }

        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleAssignTask = (id: GridRowId) => {
        console.log('Assign task with ID:', id);

        router.push({
            pathname: '/admin/task/assign-task',
            query: { taskId: id }
        });
    };

    const columns: GridColDef[] = [
        { field: 'taskName', headerName: 'Task Name', type: 'text', width: 180, editable: true },
        { field: 'userName', headerName: 'User Name', type: 'text', width: 180, editable: true },
        { field: 'dueDate', headerName: 'Due Date', type: 'date', width: 180, editable: true },
        {
            field: 'actions', type: 'actions', headerName: 'Actions', width: 100, cellClassName: 'actions',
            getActions: ({ id }) => {

                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem icon={<SaveIcon />} label="Save" sx={{ color: 'primary.main' }} onClick={handleSaveClick(id)} />,
                        <GridActionsCellItem icon={<CancelIcon />} label="Cancel" className="textPrimary" onClick={handleCancelClick(id)} color="inherit" />
                    ];
                }

                return [
                    <GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
                    <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} color="inherit" />
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
