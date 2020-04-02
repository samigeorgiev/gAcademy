import { useState } from 'react';

import { AuthenticationClient } from '../proto/authentication_grpc_web_pb';

const authenticationClient = new AuthenticationClient(
    process.env.REACT_APP_AUTHENTICATION
);

const useAuthentication = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const handleResponse = (error, res) => {
        setIsLoading(false);
        if (error) {
            const errorSegments = error.message.split(' ');
            const errorCode = errorSegments.shift();
            const errorMessage = errorSegments.join(' ');
            return setError({ code: errorCode, message: errorMessage });
        }
        setResponse(res);
    };
    const signUp = request => {
        setIsLoading(true);
        setError(null);
        setResponse(null);
        authenticationClient.signUp(request, {}, handleResponse);
    };
    const logIn = request => {
        setIsLoading(true);
        setError(null);
        setResponse(null);
        authenticationClient.logIn(request, {}, handleResponse);
    };

    return {
        methods: { signUp, logIn },
        state: { isLoading, error, response }
    };
};

export default useAuthentication;
