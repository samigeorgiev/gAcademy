import React, { useContext, useEffect } from 'react';

import { AuthenticationContext } from '../context/authentication';

import useEnrollmentManagement from '../hooks/enrollmentManagement';
import usePayment from '../hooks/payment';

import { EnrollCourseRequest } from '../proto/content-management_pb';
import { StartPaymentRequest } from '../proto/payment_pb';

import Confirm from './UI/Confirm';

const EnrollmentConfirmation = props => {
    const { user } = useContext(AuthenticationContext);

    const {
        state: enrollmentManagementState,
        methods: enrollmentManagementMethods
    } = useEnrollmentManagement();

    const { state: paymentState, methods: paymentMethods } = usePayment();

    const {
        response: enrollmentManagementResponse
    } = enrollmentManagementState;
    const { error: enrollmentManagementError } = enrollmentManagementState;
    const { startPayment } = paymentMethods;
    useEffect(() => {
        if (enrollmentManagementResponse && !enrollmentManagementError) {
            const request = new StartPaymentRequest();
            request.setEnrollmentid(
                enrollmentManagementResponse.getEnrollmentid()
            );
            request.setReturnurl(window.location.origin + '/execute-payment');
            request.setCancelurl(window.location.href);
            startPayment(request);
        }
    }, [enrollmentManagementResponse, enrollmentManagementError, startPayment]);

    const { response: paymentResponse, error: paymentError } = paymentState;
    useEffect(() => {
        if (paymentResponse && !paymentError) {
            window.location.href = paymentResponse.getRedirecturl();
        }
    }, [paymentResponse, paymentError]);

    const { enrollCourse } = enrollmentManagementMethods;
    const enrollHandler = () => {
        const request = new EnrollCourseRequest();
        request.setCourseid(props.course.getId());
        enrollCourse(request, user.token);
    };

    return (
        <Confirm
            onConfirm={enrollHandler}
            header="Enroll course"
            isLoading={
                enrollmentManagementState.isLoading || paymentState.isLoading
            }
            error={enrollmentManagementState.error || paymentState.error}
            onClose={props.onClose}
        >
            Are you sure you want to enroll{' '}
            <span style={{ fontWeight: 'bold' }}>
                {props.course.getTitle()}
            </span>
            ?
        </Confirm>
    );
};

export default EnrollmentConfirmation;
