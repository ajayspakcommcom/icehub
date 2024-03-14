import * as React from 'react';
import { GridRowsProp, GridRowModesModel, GridRowModes, DataGrid, GridColDef, GridToolbarContainer, GridActionsCellItem, GridEventListener, GridRowId, GridRowModel, GridRowEditStopReasons, GridCellParams } from '@mui/x-data-grid';
import { randomCreatedDate, randomTraderName, randomId, randomArrayItem } from '@mui/x-data-grid-generator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import { adminUserTaskList } from '@/services/user-task';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';


import dynamic from 'next/dynamic';
import { createAnnouncementBanner, getAnnouncementList } from '@/services/announcement-banner';
const FileUploadInput = dynamic(() => import('@/components/file-upload-input/file-upload-input'));

type FileState = File;

const initialRows: GridRowsProp = [
    {
        id: randomId(),
        title: 'Chindi',
        link: 'https:www.example.com',
        file: ''
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
        setRows((oldRows) => [{ id, title: '', isNew: true }, ...oldRows]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'title' },
        }));
    };

    return (

        <div className='admin-create-btn-wrapper'>
            <div className='left-content'>
                <h2>Announcement Banner List</h2>
            </div>
            <div className='right-content'>
                <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleClick}> Create Task</Button>
            </div>
        </div>
    );
}

interface Announcement {
    _id: string;
    heading: string;
    imgUrl: string;
    imgLink: string;
    createdBy: null | string;
    updatedBy: null | string;
    updatedDate: null | string;
    deletedBy: null | string;
    deletedDate: null | string;
    createdDate: string;
    __v: number;
}

const AnnouncementBannerList = () => {

    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [file, setFile] = React.useState<FileState>();
    const router = useRouter();


    React.useEffect(() => {

        const fetchAnnouncementDataList = async () => {

            try {

                const formData = new FormData();
                formData.append('type', 'LIST');

                try {
                    const response = await getAnnouncementList(formData, localStorage.getItem('token')!);
                    const responseData = response.data.data;
                    console.log('responseData', responseData);
                    const formattedUserTaskList = responseData.map((item: Announcement) => ({
                        ...item,
                        id: item._id,
                        title: item.heading,
                        link: item.imgLink,
                        file: item.imgUrl,
                        _id: undefined
                    }));

                    setRows(formattedUserTaskList);
                    //setSubmittedTaskListData(taskData);
                    //setLoading(false);
                } catch (error: any) {
                    //setError(error.message);
                    //setLoading(false);
                }




                // try {
                //     const response = await getAnnouncementList(formData, localStorage.getItem('token')!);
                //     const userTaskData = response.data.data;
                //     const formattedUserTaskList = userTaskData.map((userTask: UserTask) => ({
                //         ...userTask,
                //         id: userTask._id,
                //         userName: userTask.user.firstName + ' ' + userTask.user.lastName,
                //         taskName: userTask.task.name,
                //         dueDate: new Date(userTask.task.dueDate),
                //         taskTypeId: userTask.task.taskType,
                //         _id: undefined
                //     }));
                //     setRows(formattedUserTaskList);
                //     console.log('user submitted task', formattedUserTaskList);
                // } catch (error: any) {
                //     console.log('Error', error);
                // }

                //setSubmittedTaskListData(taskData);
                //setLoading(false);
            } catch (error: any) {
                //setError(error.message);
                //setLoading(false);
            }
        };

        fetchAnnouncementDataList();

        return () => console.log('');
    }, []);


    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: undefined, title: newRow.title, link: newRow.link };

        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        if (newRow.isNew) {
            console.log('New', newRow);

            const handleFileUpload = async () => {
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('title', newRow?.title);
                    formData.append('link', newRow?.link);
                    formData.append('type', 'CREATE');
                    try {
                        const response = await createAnnouncementBanner(formData, localStorage.getItem('token')!);
                        console.log(response);
                    } catch (error: any) {
                        console.error('Error saving:', error);
                    }
                }
            };

            handleFileUpload();

        } else {
            console.log('updated', updatedRow);

        }

        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


    const handleFileUpload = (file: File, id: string) => {
        console.log('Uploaded file :', file);
        setFile(file);
        handleSaveClick(id);
    };

    const handleEditClick = (id: GridRowId) => () => {

        setRowModesModel(prevRowModesModel => ({
            ...prevRowModesModel,
            [id]: { mode: GridRowModes.Edit }
        }));
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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


    const handleDeleteClick = (id: GridRowId) => () => {
    };


    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', type: 'text', width: 180, editable: true },
        { field: 'link', headerName: 'Link', type: 'text', width: 180, editable: true },
        {
            field: 'file',
            headerName: 'Upload File',
            width: 200,
            editable: true,
            renderCell: (params: GridCellParams) => {
                return <a target='_blank' href={params.value as string}><img src={params.value as string} alt="Description of Image" className='cell-img' /></a>
            },

            renderEditCell: (params: GridCellParams) => {
                return <FileUploadInput onChange={(file) => handleFileUpload(file, params.id as string)} />;
            }
        },
        {
            field: 'actions', type: 'actions', headerName: 'Actions', width: 100, cellClassName: 'actions',
            getActions: ({ id, row }) => {

                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem icon={<SaveIcon />} label="Save" sx={{ color: '#000' }} onClick={handleSaveClick(id)} />,
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
        <>
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
        </>
    );
};

export default React.memo(AnnouncementBannerList);
