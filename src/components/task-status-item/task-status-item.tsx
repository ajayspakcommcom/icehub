import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React from 'react';
import Image from 'next/image';
import { formatDateToDDMMYYYY } from '@/utils/common';

type TaskStatusItemProps = {
    id: string;
    title: string;
    imageUrl: string;
    type: string;
    dueDate: Date;
    isDisabled: boolean;
};


const TaskStatusItem: React.FC<TaskStatusItemProps> = ({ id, title, imageUrl, type, dueDate, isDisabled }) => {


    return (
        <li className={`${isDisabled ? 'disabled' : ''}`} id={`${id}`}>
            <div>
                <div>
                    <Image src={require(`../../../public/images/icons/${imageUrl}`)} alt={`${title}`} className='responsive-img' />
                </div>
                <div>
                    <strong>{title}</strong>
                    <p>{type}</p>
                </div>
            </div>
            <div>
                <div>
                    <p>{formatDateToDDMMYYYY(dueDate)}</p>
                </div>
            </div>
            <div>
                <Image src={require('../../../public/images/icons/edit.png')} alt={title} className='responsive-img' />
            </div>
        </li>
    );
};



export default React.memo(TaskStatusItem);
