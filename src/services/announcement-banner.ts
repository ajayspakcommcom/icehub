import axios from 'axios';
import { getUserData } from '@/libs/common';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL
});


export const getAnnouncementList = async (formData: any, token: string): Promise<any> => {
    try {
        const response = await apiClient.post('/announcement-banner', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const createAnnouncementBanner = async (formData: any, token: string): Promise<any> => {

    try {
        const response = await apiClient.post<any>('/announcement-banner', formData, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    } catch (err: unknown) {
        console.error('Error creating announcement banner:', err);
        throw err; // or return a specific error object/response
    }
};

export const deleteAnnouncementBanner = async (formData: any, token: string,): Promise<any> => {
    try {
        const response = await apiClient.post(`/announcement-banner`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};




