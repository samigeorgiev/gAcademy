import { useCallback } from 'react';

import useGrpc from './grpc';

/* eslint-disable-next-line */
import { AccountOperationsClient } from '../proto/account-operations_grpc_web_pb';

const accountOperationsClient = new AccountOperationsClient(
    process.env.REACT_APP_ACCOUNT_OPERATIONS
);

const useAccountOperations = () => {
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
    const enrollCourse = useCallback(
        (request, token) => {
            sendRequest('enrollCourse', request, { Authorization: token });
        },
        [sendRequest]
    );

    return {
        state,
        methods: { becomeTeacher, getAccount, getCourses, enrollCourse }
    };
};

export default useAccountOperations;
