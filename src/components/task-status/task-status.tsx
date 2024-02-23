import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { assignedTaskList } from '@/services/task';
import { getTaskTypeImage, getTaskTypeName, getUserData } from '@/libs/common';
import { submittedTaskList } from '@/services/user-task';
import { AssinedTask } from '@/pages/api/models/AssignedTask';
import { SubmittedTask } from '@/pages/api/models/SubmittedTask';
const TaskStatusItem = dynamic(() => import('@/components/task-status-item/task-status-item'));
const TaskStatusItemHeader = dynamic(() => import('@/components/task-status-item/task-status-item-header'));


type TaskStatusProps = {

};

// interface AssinedTask {
//     _id: string;
//     name: string;
//     taskType: string;
//     dueDate: Date;
//     assignedTo: AssignedTo[];
//     createdBy: string;
//     updatedBy: string | null;
//     updatedDate: Date | null;
//     deletedBy: string | null;
//     deletedDate: Date | null;
//     createdDate: Date;
//     userCreatedTask: { createdDate: Date, isSubmitted: boolean, user: string };
//     __v: number;
// }

// interface AssignedTo {
//     user: string;
//     isSubmitted: boolean;
//     _id: string;
// }


const TaskStatus: React.FC<TaskStatusProps> = () => {

    const [assignedTaskListData, setAssignedTaskListData] = useState([]);
    const [submittedTaskListData, setSubmittedTaskListData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    useEffect(() => {
        const fetchAssignedTaskList = async () => {
            try {
                const response = await assignedTaskList(localStorage.getItem('token')!);
                const taskData = response.data.data;
                const formattedTasks = taskData.map((task: any) => ({
                    ...task,
                    userCreatedTask: task.assignedTo.find((assignee: any) => assignee.user === getUserData()?._id)
                }));

                setAssignedTaskListData(formattedTasks);
                //setLoading(false);
            } catch (error: any) {
                setError(error.message);
                //setLoading(false);
            }
        };

        fetchAssignedTaskList();


        const fetchSubmittedTaskList = async () => {

            try {
                const response = await submittedTaskList(localStorage.getItem('token')!);
                const taskData = response.data.data;
                console.log('taskData', taskData);
                setSubmittedTaskListData(taskData);
                //setLoading(false);
            } catch (error: any) {
                setError(error.message);
                //setLoading(false);
            }
        };

        fetchSubmittedTaskList();

        return () => {
            setAssignedTaskListData([]);
        };
    }, []);


    return (
        <div className='tast-status-wrapper'>
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="Example">
                    <Tab label="Assined Task" value="1" />
                    <Tab label="Submitted Task" value="2" />
                    <Tab label="Approved Task" value="3" />
                </TabList>
                <TabPanel value="1">
                    <div className='task-content'>
                        <TaskStatusItemHeader />
                        <div className='body'>
                            <ul>
                                {assignedTaskListData.map((task: AssinedTask) => (
                                    <TaskStatusItem
                                        key={task._id}
                                        id={task._id}
                                        title={task.name}
                                        imageUrl={getTaskTypeImage(task.taskType)!}
                                        type={getTaskTypeName(task.taskType)!}
                                        dueDate={task.dueDate}
                                        isDisabled={!!(task.userCreatedTask.isSubmitted)}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className='task-content'>
                        <TaskStatusItemHeader />
                        <div className='body'>
                            <ul>
                                {/* <TaskStatusItem id={'1'} title={`Task 1`} imageUrl={`blog.png`} type={`Create a blog`} dueDate={new Date()} isDisabled={false} /> */}

                                {submittedTaskListData.map((task: SubmittedTask) => (
                                    <TaskStatusItem
                                        key={task._id}
                                        id={task._id}
                                        title={task.blogTitle!}
                                        imageUrl={getTaskTypeImage(task.task)!}
                                        type={getTaskTypeName(task.task)!}
                                        dueDate={new Date()}
                                        isDisabled={false}
                                    />
                                ))}


                            </ul>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div className='task-content'>
                        <TaskStatusItemHeader />
                        <div className='body'>
                            <ul>
                                <TaskStatusItem id={'1'} title={`Task 1`} imageUrl={`blog.png`} type={`Create a blog`} dueDate={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'2'} title={`Task 2`} imageUrl={`blog.png`} type={`Create a blog`} dueDate={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'3'} title={`Task 3`} imageUrl={`blog.png`} type={`Create a blog`} dueDate={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'4'} title={`Task 4`} imageUrl={`blog.png`} type={`Create a blog`} dueDate={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'5'} title={`Task 5`} imageUrl={`blog.png`} type={`Create a blog`} dueDate={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'6'} title={`Task 6`} imageUrl={`blog.png`} type={`Create a blog`} dueDate={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'7'} title={`Task 7`} imageUrl={`blog.png`} type={`Create a blog`} dueDate={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'8'} title={`Task 8`} imageUrl={`blog.png`} type={`Create a blog`} dueDate={new Date()} isDisabled={true} />
                            </ul>
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
        </div>
    );
};



export default React.memo(TaskStatus);
