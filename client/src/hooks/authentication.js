import { useCallback, useMemo } from 'react';

import useGrpc from './grpc';

import { AuthenticationClient } from '../proto/authentication_grpc_web_pb';

const useAuthentication = () => {
    const url = process.env.REACT_APP_AUTHENTICATION;
    const authenticationClient = useMemo(() => new AuthenticationClient(url), [
        url
    ]);

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
        methods: { signUp, logIn },
        state: { ...state, error: { code: errorCode, message: errorMessage } }
    };
};

export default useAuthentication;
