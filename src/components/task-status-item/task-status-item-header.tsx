import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React from 'react';
import Image from 'next/image';
import { formatDateToDDMMYYYY } from '@/utils/common';

type TaskStatusItemHeaderProps = {

};


const TaskStatusItemHeader: React.FC<TaskStatusItemHeaderProps> = ({ }) => {


    return (
        <div className='header'>
            <ul>
                <li>
                    <div>Task Name</div>
                </li>
                <li>
                    <div>Due Date</div>
                </li>
                <li>
                    <div>Action</div>
                </li>
            </ul>
        </div>
    );
};



export default React.memo(TaskStatusItemHeader);
