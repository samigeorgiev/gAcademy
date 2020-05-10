import { useCallback } from 'react';

import useGrpc from './grpc';

import {
    EnrollmentManagementClient //
} from '../proto/content-management_grpc_web_pb';

const enrollmentManagementClient = new EnrollmentManagementClient(
    process.env.REACT_APP_CONTENT_MANAGEMENT
);

const useEnrollmentManagement = () => {
    const [state, sendRequest] = useGrpc(enrollmentManagementClient);

    const getEnrolledCourses = useCallback(
        (request, token) => {
            sendRequest('getEnrolledCourses', request, {
                Authorization: token
            });
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
        methods: { getEnrolledCourses, enrollCourse }
    };
};

export default useEnrollmentManagement;
