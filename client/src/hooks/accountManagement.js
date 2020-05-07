import { useCallback } from 'react';

import useGrpc from './grpc';

import { AccountManagementClient } from '../proto/content-management_grpc_web_pb';

const accountManagementClient = new AccountManagementClient(
    process.env.REACT_APP_CONTENT_MANAGEMENT
);

const useAccountManagement = () => {
    const [state, sendRequest] = useGrpc(accountManagementClient);

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

    return {
        state,
        methods: { becomeTeacher, getAccount }
    };
};

export default useAccountManagement;
