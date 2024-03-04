import axios from 'axios';
import { getUserData } from '@/libs/common';

// Set the base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Instance of axios with base URL
const apiClient = axios.create({
    baseURL: API_BASE_URL
});

// Function to fetch a customer by ID
export const feedList = async (token: string): Promise<any> => {
    try {
        const response = await apiClient.post('/feed', { type: "FEED-LIST" }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};


export const likesDislikesUserTak = async (token: string, userTaskId: string): Promise<any> => {
    try {
        const response = await apiClient.post('/user-task', { type: "LIKES-DISLIKES", userTaskId: userTaskId, userId: getUserData()?._id, }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};


