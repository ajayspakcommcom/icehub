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



const AnnouncementBannerList = () => {

    return (
        <>
            <h1>Announcement Banner List Component</h1>
        </>
    );
};

export default React.memo(AnnouncementBannerList);
