import { useCallback } from 'react';

import useGrpc from './grpc';

import { AuthenticationClient } from '../proto/authentication_grpc_web_pb';

const authenticationClient = new AuthenticationClient(
    process.env.REACT_APP_AUTHENTICATION
);

const useAuthentication = () => {
    const [state, sendRequest] = useGrpc(authenticationClient);
    const errorSegments = state.error && state.error.message.split(' ');
    const errorCode = state.error && errorSegments.shift();
    const errorMessage = state.error && errorSegments.join(' ');

    const signUp = useCallback(
        request => {
            sendRequest('signUp', request, {});
        },
        [sendRequest]
    );

    const logIn = useCallback(
        request => {
            sendRequest('logIn', request, {});
        },
        [sendRequest]
    );

    return {
        state: { ...state, error: { code: errorCode, message: errorMessage } },
        methods: { signUp, logIn }
    };
};

export default useAuthentication;
