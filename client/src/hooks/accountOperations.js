import { useCallback } from 'react';

import useGrpc from './grpc';

import { AccountOperationsClient } from '../proto/account-operations_grpc_web_pb';

const accountOperationsClient = new AccountOperationsClient(
    process.env.REACT_APP_ACCOUNT_OPERATIONS
);

const useAccountOperations = () => {
    const [state, sendRequest] = useGrpc(accountOperationsClient);

    const getAccount = useCallback(
        (request, metadata) => {
            sendRequest('getAccount', request, metadata);
        },
        [sendRequest]
    );

    return {
        methods: { getAccount },
        state
    };
};

export default useAccountOperations;
