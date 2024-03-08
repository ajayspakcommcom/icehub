import axios from 'axios';
import Task from '../models/Task';
import { getUserData } from '@/libs/common';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL
});


export const assignedTaskList = async (token: string): Promise<any> => {
    try {
        const response = await apiClient.post('/task', { type: "ASSIGEND-TASK-LIST", userId: getUserData()?._id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAdminTaskList = async (token: string): Promise<any> => {
    try {
        const response = await apiClient.post('/task', { type: "ADMIN-TASK-LIST", userId: getUserData()?._id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const createAdminTask = async (token: string, taskData: any): Promise<any> => {
    try {
        const response = await apiClient.post('/task', { ...taskData }, {
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
export const createUser = async (taskData: Task): Promise<any> => {
    try {
        const response = await apiClient.post<Task>('/user', taskData);
        return response;
    } catch (err: unknown) {
        console.error('Error creating user:', err);
        // Handle or transform the error as needed
        // For instance, throw a custom error or return a specific error response
        throw err; // or return a specific error object/response
    }
};

// Function to update an existing customer
export const updateUser = async (id: number, taskData: Partial<Task>): Promise<any> => {
    const response = await apiClient.put<Task>(`/task/${id}`, taskData);
    return response;
};

// Function to delete a customer
export const deleteUser = async (id: number): Promise<void> => {
    await apiClient.delete(`/task/${id}`);
};


