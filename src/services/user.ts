import axios from 'axios';
import User from '../models/User';

// Set the base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Instance of axios with base URL
const apiClient = axios.create({
    baseURL: API_BASE_URL
});



export const fetAllUser = async (token: string): Promise<any> => {
    try {
        const response = await apiClient.post('/user', { type: "LIST" }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};


// Function to fetch a customer by ID
export const fetchUser = async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/user/${id}`);
    return response.data;
};

// Function to create a new customer
export const createUser = async (userData: User): Promise<any> => {
    console.log();
    try {
        const response = await apiClient.post<User>('/user', userData);
        return response;
    } catch (err: unknown) {
        console.error('Error creating user:', err);
        // Handle or transform the error as needed
        // For instance, throw a custom error or return a specific error response
        throw err; // or return a specific error object/response
    }
};

// Function to update an existing customer
export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>(`/user/${id}`, userData);
    return response.data;
};

// Function to delete a customer
export const deleteUser = async (id: number): Promise<void> => {
    await apiClient.delete(`/user/${id}`);
};


