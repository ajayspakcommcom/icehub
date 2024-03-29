import axios from 'axios';
import Task from '../models/Task';
import { getUserData } from '@/libs/common';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL
});


export const submittedTaskList = async (token: string): Promise<any> => {
    try {
        const response = await apiClient.post('/user-task', { type: "SUBMITTED-USER-TASK", userId: getUserData()?._id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const approvedTaskList = async (token: string): Promise<any> => {
    try {
        const response = await apiClient.post('/user-task', { type: "APPROVED-USER-TASK", userId: getUserData()?._id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

// Function to create a new customer
export const createUserTask = async (userTask: Task, token: string, createTaskType: string): Promise<any> => {
    //console.log('createUserTask', userTask);
    try {
        const response = await apiClient.post<Task>('/user-task', { ...userTask, type: 'CREATE', createTaskType: createTaskType }, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    } catch (err: unknown) {
        console.error('Error creating user task:', err);
        throw err; // or return a specific error object/response
    }
};

export const uploadUserTaskVideo = async (formData: any, token: string): Promise<any> => {

    try {
        //const response = await apiClient.post<any>('/upload', { formData }, { headers: { Authorization: `Bearer ${token}` } });
        const response = await apiClient.post<any>('/upload', { formData });
        return response;
    } catch (err: unknown) {
        console.error('Error creating user task:', err);
        throw err; // or return a specific error object/response
    }
};

export const getUserTaskDetail = async (userId: string, taskId: string, token: string): Promise<any> => {
    try {
        const response = await apiClient.post('/user-task', { type: "DETAIL-USER-TASK", userId: userId, taskId: taskId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

// Function to update an existing customer
export const updateUserTask = async (id: number, taskData: Partial<Task>): Promise<any> => {
    const response = await apiClient.put<Task>(`/task/${id}`, taskData);
    return response;
};

// Function to delete a customer
export const deleteUserTask = async (id: number): Promise<void> => {
    await apiClient.delete(`/task/${id}`);
};


export const adminUserTaskList = async (token: string): Promise<any> => {
    try {
        const response = await apiClient.post('/user-task', { type: "ADMIN-USER-TASK-LIST", userId: getUserData()?._id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const adminDetailUserTaskList = async (token: string, userTaskId: string): Promise<any> => {
    try {
        const response = await apiClient.post('/user-task', { type: "ADMIN-DETAIL-USER-TASK", userTaskId: userTaskId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const approvedRejectedAdminUserTaskList = async (token: string, userTaskId: string, approvedByAdmin: boolean, rejectionReason?: string): Promise<any> => {
    try {
        const response = await apiClient.post('/user-task', { type: "APPROVE-REJECT-USER-TASK", userTaskId: userTaskId, approvedByAdmin, rejectionReason }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};





