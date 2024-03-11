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
        <>
            <div className='admin-create-btn-wrapper'>
                <div className='left-content'>
                    <h2>Task</h2>
                </div>
                <div className='right-content'>
                    <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleClick}> Create Task</Button>
                </div>
            </div>
            {/* <GridToolbarContainer style={{ justifyContent: 'flex-end' }}>
             <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleClick}> Create Task</Button>
            </GridToolbarContainer> */}
        </>
    );
}

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface TaskListProps {
    tasks?: Task[];
}

interface AssignedTo {
    user: string;
    isSubmitted: boolean;
    createdDate: Date;
    _id: string;
}

interface Task {
    _id: string;
    name: string;
    taskType: string;
    dueDate: Date;
    assignedTo: AssignedTo[];
    createdBy: string;
    updatedBy: string | null;
    updatedDate: Date | null;
    deletedBy: string | null;
    deletedDate: Date | null;
    createdDate: Date;
    isNew: boolean;
    __v: number;
}


const TaskList: React.FC<TaskListProps> = ({ tasks }) => {

    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const router = useRouter();

    React.useEffect(() => {

        const getAdminTaskListData = async () => {
            try {
                const response = await getAdminTaskList(localStorage.getItem('token')!);
                const taskData = response.data.data;
                console.log('taskData', taskData);
                const formattedTasks = taskData.map((task: Task) => ({ ...task, id: task._id, _id: undefined, dueDate: new Date(task.dueDate) }));
                setRows(formattedTasks);
                //setLoading(false);
            } catch (error: any) {
                //setError(error.message);
                //setLoading(false);
            }
        };

        getAdminTaskListData();

        return () => console.log('')
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

        // if (updatedRow.isNew === true) {
        //     handleCreateTask();
        // }

        const foundRow = rows.find(row => row.id === newRow.id)

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
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        { field: 'dueDate', headerName: 'Due Date', type: 'date', width: 180, editable: true },
        { field: 'taskTypeName', headerName: 'Task Type', width: 500, editable: true, type: 'singleSelect', valueOptions: ['Blog', 'Infographic', 'Video', 'Case Study'] },
        { field: 'assignedTask', headerName: 'Assign Task', width: 150, sortable: false, renderCell: (params) => (<Button variant="contained" onClick={() => handleAssignTask(params.row.id)}>Assign Task To</Button>) },
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

export default React.memo(TaskList);
