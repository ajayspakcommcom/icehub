import { useState, useEffect } from 'react';

function useGetByIdApi<T>(id: string, url: string): [T | null, boolean, any] {

    const [data, setData] = useState<T | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${url}/${id}`);
                if (!response.ok) {
                    throw new Error('Data not found');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, url]);

    return [data, isLoading, error];
}

export default useGetByIdApi;
