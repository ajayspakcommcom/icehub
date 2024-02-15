import { useState } from 'react';

interface UsePostDataProps {
    url: string;
}

interface UsePostDataReturn<T> {
    postData: (data: T) => Promise<void>;
    isLoading: boolean;
    error: Error | null;
}

function usePostCreateApi<T>({ url }: UsePostDataProps): UsePostDataReturn<T> {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const postData = async (data: T) => {
        setLoading(true);
        setError(null);

        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }

    };

    return { postData, isLoading, error };
}

export default usePostCreateApi;
