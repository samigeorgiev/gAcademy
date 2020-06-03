import React, { useEffect } from 'react';

import { useLocation, useHistory } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import usePayment from '../hooks/payment';

import { ExecutePaymentRequest } from '../proto/payment_pb';

const ExecutePayment = props => {
    const history = useHistory();
    const location = useLocation();

    const { state, methods } = usePayment();

    const { executePayment } = methods;
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paymentId = searchParams.get('paymentId');
        const payerId = searchParams.get('PayerID');

        const request = new ExecutePaymentRequest();
        request.setPaymentid(paymentId);
        request.setPayerid(payerId);
        executePayment(request);
    }, [location, executePayment]);

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            history.push('/enrolled-courses');
        }
    }, [response, error, history]);

    return <Loader active />;
};

export default ExecutePayment;
