import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatDateToDDMMYYYY } from '@/utils/common';
import { useRouter } from 'next/router';
import { getUserData } from '@/libs/common';
import { TaskTypeEnum } from '@/libs/enums';

type TaskStatusItemProps = {
    id: string;
    title: string;
    imageUrl: string;
    type: string;
    dueDate: Date;
    isDisabled: boolean;
    taskType: TaskTypeEnum;
    rejectionReason?: string;
};


const TaskStatusItem: React.FC<TaskStatusItemProps> = ({ id, title, imageUrl, type, dueDate, isDisabled, taskType, rejectionReason }) => {

    const router = useRouter();

    useEffect(() => {

        return () => console.log('');
    }, []);

    const createTaskHandler = (type: string) => {
        console.log(type);

        if (!isDisabled) {
            router.push({
                pathname: '/create-task',
                query: {
                    type: type?.toLowerCase(),
                    userId: getUserData()?._id,
                    taskId: id,
                    taskTitle: title
                },
            });
        }
    };

    const updateTaskHandler = (id: string) => {

        if (!isDisabled) {
            router.push({
                pathname: '/update-task',
                query: {
                    type: type?.toLowerCase(),
                    userId: getUserData()?._id,
                    taskId: id,
                    taskTitle: title,
                    isEditMode: true
                },
            });
        }
    };

    const detailTaskHandler = (type: string) => {
        console.log(type);

        if (!isDisabled) {
            router.push({
                pathname: '/detail-task',
                query: {
                    type: type?.toLowerCase(),
                    userId: getUserData()?._id,
                    taskId: id,
                    taskTitle: title
                },
            });
        }
    };


    if (taskType === TaskTypeEnum.ASSIGNED) {
        return (
            <li className={`${isDisabled ? 'disabled' : ''}`} id={`${id}`} onClick={() => createTaskHandler(type)}>
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
    }


    if (taskType === TaskTypeEnum.SUBMITTED) {
        return (
            <li className={`${isDisabled ? 'disabled' : ''}`} id={`${id}`} onClick={() => updateTaskHandler(id)}>
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
                        {rejectionReason}
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
    }

    if (taskType === TaskTypeEnum.APPROVED) {
        return (
            <li className={`${isDisabled ? 'disabled' : ''}`} id={`${id}`} onClick={() => detailTaskHandler(type)}>
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
                    <Image src={require('../../../public/images/icons/view.png')} alt={title} className='responsive-img' />
                </div>
            </li>
        );
    }
};



export default React.memo(TaskStatusItem);
