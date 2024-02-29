import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { assignedTaskList } from '@/services/task';
import { getTaskTypeImage, getTaskTypeName, getUserData } from '@/libs/common';
import { approvedTaskList, submittedTaskList } from '@/services/user-task';
import { AssinedTask } from '@/pages/api/models/AssignedTask';
import { SubmittedTask } from '@/pages/api/models/SubmittedTask';
import { TaskTypeEnum } from '@/libs/enums';
import { ApprovedTask } from '@/pages/api/models/ApprovedTask';

const TaskStatusItem = dynamic(() => import('@/components/task-status-item/task-status-item'));
const TaskStatusItemHeader = dynamic(() => import('@/components/task-status-item/task-status-item-header'));


type TaskStatusProps = {

};

const TaskStatus: React.FC<TaskStatusProps> = () => {

    const [assignedTaskListData, setAssignedTaskListData] = useState([]);
    const [submittedTaskListData, setSubmittedTaskListData] = useState([]);
    const [approvedTaskListData, setApprovedTaskListData] = useState([]);

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




        const fetchSubmittedTaskList = async () => {

            try {
                const response = await submittedTaskList(localStorage.getItem('token')!);
                const taskData = response.data.data;
                console.log('submitted task', taskData);

                setSubmittedTaskListData(taskData);
                //setLoading(false);
            } catch (error: any) {
                setError(error.message);
                //setLoading(false);
            }
        };


        const fetchApprovedTaskList = async () => {

            try {
                const response = await approvedTaskList(localStorage.getItem('token')!);
                const taskData = response.data.data;
                console.log('Approved Task', taskData);

                setApprovedTaskListData(taskData);
                //setLoading(false);
            } catch (error: any) {
                setError(error.message);
                //setLoading(false);
            }
        };

        fetchAssignedTaskList();
        fetchSubmittedTaskList();
        fetchApprovedTaskList();

        return () => {
            setAssignedTaskListData([]);
            setSubmittedTaskListData([]);
            setApprovedTaskListData([]);
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
                                        taskType={TaskTypeEnum.ASSIGNED}
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
                                {submittedTaskListData.map((task: SubmittedTask) => (
                                    <TaskStatusItem
                                        key={task._id}
                                        id={task._id}
                                        title={task.taskType === '65d734098abbb6154ff8afea' ? (task.blogTitle)! : task.taskType === '65d734678abbb6154ff8aff0' ? (task.caseStudyTitle)! : task.taskType === '65d734618abbb6154ff8afee' ? (task.videoTitle)! : (task.infographicTitle)!}
                                        imageUrl={getTaskTypeImage(task.taskType)!}
                                        type={getTaskTypeName(task.taskType)!}
                                        dueDate={new Date()}
                                        isDisabled={task.approvedByAdmin}
                                        taskType={TaskTypeEnum.SUBMITTED}
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
                                {approvedTaskListData.map((task: ApprovedTask) => (
                                    <TaskStatusItem
                                        key={task._id}
                                        id={task._id}
                                        title={task.taskType === '65d734098abbb6154ff8afea' ? (task.blogTitle)! : task.taskType === '65d734678abbb6154ff8aff0' ? (task.caseStudyTitle)! : task.taskType === '65d734618abbb6154ff8afee' ? (task.videoTitle)! : (task.infographicTitle)!}
                                        imageUrl={getTaskTypeImage(task.taskType)!}
                                        type={getTaskTypeName(task.taskType)!}
                                        dueDate={new Date()}
                                        isDisabled={false}
                                        taskType={TaskTypeEnum.APPROVED}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
        </div>
    );
};



export default React.memo(TaskStatus);
