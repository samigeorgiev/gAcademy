import { useCallback } from 'react';

import useGrpc from './grpc';

import { PaymentClient } from '../proto/payment_grpc_web_pb';

const paymentClient = new PaymentClient(process.env.REACT_APP_PAYMENT);

const usePayment = () => {
    const [state, sendRequest] = useGrpc(paymentClient);

    const startPayment = useCallback(
        request => {
            sendRequest('startPayment', request, {});
        },
        [sendRequest]
    );

    const executePayment = useCallback(
        request => {
            sendRequest('executePayment', request, {});
        },
        [sendRequest]
    );

    return {
        state,
        methods: { startPayment, executePayment }
    };
};

export default usePayment;
