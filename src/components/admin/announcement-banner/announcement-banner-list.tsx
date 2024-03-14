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
const FileUploadInput = dynamic(() => import('@/components/file-upload-input/file-upload-input'));

type FileState = File;

const initialRows: GridRowsProp = [
    {
        id: randomId(),
        title: 'Chindi',
        link: 'https:www.example.com'
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



const AnnouncementBannerList = () => {

    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [file, setFile] = React.useState<FileState>();
    const router = useRouter();


    React.useEffect(() => {

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

        } else {
            console.log('updated', updatedRow);

            const handleFileUpload = async () => {

                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('title', updatedRow?.title);
                    formData.append('link', updatedRow?.link);
                    try {
                        const response = await fetch('/api/announcement-banner', {
                            method: 'POST',
                            body: formData,
                        });

                        if (response.ok) {

                        } else {
                            console.error('Failed to upload file:', response.statusText);
                        }
                    } catch (error) {
                        console.error('Error uploading file:', error);
                    }
                }
            };

            handleFileUpload();

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
                return ((params.value as string) ? (params.value as string) : 'No File');
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
