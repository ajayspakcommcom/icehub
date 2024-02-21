import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const TaskStatusItem = dynamic(() => import('@/components/task-status-item/task-status-item'));
const TaskStatusItemHeader = dynamic(() => import('@/components/task-status-item/task-status-item-header'));




type TaskStatusProps = {

};


const TaskStatus: React.FC<TaskStatusProps> = () => {


    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };



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
                                <TaskStatusItem id={'1'} title={`Task 1`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={false} />
                                <TaskStatusItem id={'2'} title={`Task 2`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'3'} title={`Task 3`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={false} />
                                <TaskStatusItem id={'4'} title={`Task 4`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={false} />
                                <TaskStatusItem id={'5'} title={`Task 5`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={false} />
                                <TaskStatusItem id={'6'} title={`Task 6`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'7'} title={`Task 7`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'8'} title={`Task 8`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={false} />
                            </ul>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className='task-content'>
                        <TaskStatusItemHeader />
                        <div className='body'>
                            <ul>
                                <TaskStatusItem id={'1'} title={`Task 1`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={false} />
                                <TaskStatusItem id={'2'} title={`Task 2`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'3'} title={`Task 3`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={false} />
                                <TaskStatusItem id={'4'} title={`Task 4`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={false} />
                                <TaskStatusItem id={'5'} title={`Task 5`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={false} />
                                <TaskStatusItem id={'6'} title={`Task 6`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'7'} title={`Task 7`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'8'} title={`Task 8`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={false} />
                            </ul>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div className='task-content'>
                        <TaskStatusItemHeader />
                        <div className='body'>
                            <ul>
                                <TaskStatusItem id={'1'} title={`Task 1`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'2'} title={`Task 2`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'3'} title={`Task 3`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'4'} title={`Task 4`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'5'} title={`Task 5`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'6'} title={`Task 6`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'7'} title={`Task 7`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                                <TaskStatusItem id={'8'} title={`Task 8`} imageUrl={`blog.png`} type={`Create a blog`} date={new Date()} isDisabled={true} />
                            </ul>
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
        </div>
    );
};



export default React.memo(TaskStatus);
