import { useMemo } from 'react';

import useGrpc from './grpc';

import { AuthenticationClient } from '../proto/authentication_grpc_web_pb';

const useAuthentication = () => {
    const authenticationClient = useMemo(
        () => new AuthenticationClient(process.env.REACT_APP_AUTHENTICATION),
        []
    );

    const [state, sendRequest] = useGrpc(authenticationClient);
    const errorSegments = state.error && state.error.message.split(' ');
    const errorCode = state.error && errorSegments.shift();
    const errorMessage = state.error && errorSegments.join(' ');

    const signUp = request => {
        sendRequest('signUp', request, {});
    };
    const logIn = request => {
        sendRequest('logIn', request, {});
    };

    return {
        methods: { signUp, logIn },
        state: { ...state, error: { code: errorCode, message: errorMessage } }
    };
};

export default useAuthentication;
