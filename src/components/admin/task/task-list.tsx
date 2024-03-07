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
import { getAdminTaskList } from '@/services/task';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem(roles);
};

const initialRows: GridRowsProp = [
    {
        id: randomId(),
        name: randomTraderName()
    },
    {
        id: randomId(),
        name: randomTraderName()
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
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
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



                const formattedTasks = taskData.map((task: Task) => ({
                    ...task,
                    id: task._id,
                    _id: undefined
                }));

                console.log('formattedTasks', formattedTasks);

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
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
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
        />
    );
};

export default React.memo(TaskList);
