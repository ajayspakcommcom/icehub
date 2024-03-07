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
import { createAdminTask, getAdminTaskList } from '@/services/task';

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
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
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

        // const handleCreateTask = async () => {
        //     try {                
        //         const token = 'your-auth-token'; 
        //         const taskData = {
        //             //
        //         };
        //         const response = await createAdminTask(token, updatedRow);
        //         console.log('Task created successfully:', response);                
        //     } catch (error) {
        //         console.error('Error creating task:', error);
        //         // Handle error
        //     }
        // };

        // if (updatedRow.isNew === true) {
        //     handleCreateTask();
        // }

        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const taskTypeOptions: { [key: string]: string } = {
        '65d734098abbb6154ff8afea': 'Task Type A',
        '65d7345d8abbb6154ff8afec': 'Task Type B',
        '65d734618abbb6154ff8afee': 'Task Type C',
        '65d734678abbb6154ff8aff0': 'Task Type D',
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        { field: 'dueDate', headerName: 'Due Date', type: 'date', width: 180, editable: true },
        { field: 'taskTypeName', headerName: 'Task Type', width: 500, editable: true, type: 'singleSelect', valueOptions: ['Blog', 'Infographic', 'Video', 'Case Study'] },
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
