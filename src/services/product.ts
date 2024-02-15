import axios from 'axios';
import Product from '../models/Product';

// Set the base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Instance of axios with base URL
const apiClient = axios.create({
    baseURL: API_BASE_URL
});

// Function to fetch a customer by ID
export const fetchProducts = async (token: string): Promise<any> => {
    const response = await apiClient.post<Product>(`/product`, {type:"LIST"}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    return response;
};

// Function to create a new customer
export const createProduct = async (product: Product): Promise<any> => {
    try {
        const response = await apiClient.post<Product>('/product', product);
        return response;
    } catch (err: unknown) {
        console.error('Error creating user:', err);
        // Handle or transform the error as needed
        // For instance, throw a custom error or return a specific error response
        throw err; // or return a specific error object/response
    }
};


export const updateProduct = async (id: number, productData: Partial<Product>): Promise<any> => {
    const response = await apiClient.put<Product>(`/product/${id}`, productData);
    return response;
};

// Function to delete a customer
export const deleteProduct = async (id: number): Promise<void> => {
    await apiClient.delete(`/product/${id}`);
};


