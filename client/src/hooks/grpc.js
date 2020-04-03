import { useCallback, useState } from 'react';

const useGrpc = client => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const handleResponse = useCallback(
        (error, res) => {
            setIsLoading(false);
            if (error) {
                return setError(error);
            }
            setResponse(res);
        },
        [setIsLoading, setError, setResponse]
    );

    const sendRequest = useCallback(
        (method, request, metadata) => {
            setIsLoading(true);
            setError(null);
            setResponse(null);
            client[method](request, metadata, handleResponse);
        },
        [setIsLoading, setError, setResponse, client, handleResponse]
    );

    return [{ isLoading, error, response }, sendRequest];
};

export default useGrpc;
