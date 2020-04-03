import { useCallback, useMemo } from 'react';

import useGrpc from './grpc';

import { AccountOperationsClient } from '../proto/account-operations_grpc_web_pb';

const useAccountOperations = () => {
    const url = process.env.REACT_APP_ACCOUNT_OPERATIONS;
    const accountOperationsClient = useMemo(
        () => new AccountOperationsClient(url),
        [url]
    );

    const [state, sendRequest] = useGrpc(accountOperationsClient);

    const getAccount = useCallback(
        (request, token) => {
            sendRequest('getAccount', request, { Authorization: token });
        },
        [sendRequest]
    );
    const becomeTeacher = useCallback(
        (request, token) => {
            sendRequest('becomeTeacher', request, { Authorization: token });
        },
        [sendRequest]
    );
    const getCourses = useCallback(
        (request, token) => {
            sendRequest('getCourses', request, { Authorization: token });
        },
        [sendRequest]
    );

    return {
        methods: { becomeTeacher, getAccount, getCourses },
        state
    };
};

export default useAccountOperations;
