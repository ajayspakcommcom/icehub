
import { useState } from 'react';

function useDeleteById<T>(url: string): [(id: T) => Promise<void>, boolean, any] {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const deleteById = async (id: T) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${url}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Error deleting the item');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return [deleteById, isLoading, error];
}

export default useDeleteById;
