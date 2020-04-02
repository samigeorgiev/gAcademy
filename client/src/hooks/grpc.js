import { useState } from 'react';

const useGrpc = client => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const handleResponse = (error, res) => {
        setIsLoading(false);
        if (error) {
            return setError(error);
        }
        setResponse(res);
    };

    const sendRequest = (method, request, metadata) => {
        setIsLoading(true);
        setError(null);
        setResponse(null);
        client[method](request, metadata, handleResponse);
    };

    return [{ isLoading, error, response }, sendRequest];
};

export default useGrpc;
