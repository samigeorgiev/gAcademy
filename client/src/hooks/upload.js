import { useCallback, useState } from 'react';

const useUpload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const sendRequest = useCallback(
        async (url, resource) => {
            setIsLoading(true);
            setError(null);
            setResponse(null);
            const request = new FormData();
            request.append('resource', resource);
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: request
                });
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setResponse(responseData);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError, setResponse]
    );

    return {
        state: { isLoading, error, response },
        sendRequest
    };
};

export default useUpload;
