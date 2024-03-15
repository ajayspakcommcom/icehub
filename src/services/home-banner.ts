import axios from 'axios';
import { getUserData } from '@/libs/common';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL
});

export const getHomeListUserLevel = async (formData: any): Promise<any> => {
    try {
        const response = await apiClient.post('/home-banner-list', formData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getHomeList = async (formData: any, token: string): Promise<any> => {
    try {
        const response = await apiClient.post('/home-banner', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const createHomeBanner = async (formData: any, token: string): Promise<any> => {

    try {
        const response = await apiClient.post<any>('/home-banner', formData, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    } catch (err: unknown) {
        console.error('Error creating home banner:', err);
        throw err; // or return a specific error object/response
    }
};

export const deleteHomeBanner = async (formData: any, token: string,): Promise<any> => {
    try {
        const response = await apiClient.post(`/home-banner`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};




