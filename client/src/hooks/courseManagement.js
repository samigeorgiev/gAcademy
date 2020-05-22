import { useCallback } from 'react';

import useGrpc from './grpc';

import {
    CourseManagementClient //
} from '../proto/content-management_grpc_web_pb';

const courseManagementClient = new CourseManagementClient(
    process.env.REACT_APP_CONTENT_MANAGEMENT
);

const useCourseManagement = () => {
    const [state, sendRequest] = useGrpc(courseManagementClient);

    const getCourses = useCallback(
        request => {
            sendRequest('getCourses', request, {});
        },
        [sendRequest]
    );

    const getCourse = useCallback(
        request => {
            sendRequest('getCourse', request, {});
        },
        [sendRequest]
    );

    const createCourse = useCallback(
        (request, token) => {
            sendRequest('createCourse', request, { Authorization: token });
        },
        [sendRequest]
    );

    const getCreatedCourses = useCallback(
        (request, token) => {
            sendRequest('getCreatedCourses', request, { Authorization: token });
        },
        [sendRequest]
    );

    const updateCourse = useCallback(
        (request, token) => {
            sendRequest('updateCourse', request, { Authorization: token });
        },
        [sendRequest]
    );

    const deleteCourse = useCallback(
        (request, token) => {
            sendRequest('deleteCourse', request, { Authorization: token });
        },
        [sendRequest]
    );

    const getCategories = useCallback(
        request => {
            sendRequest('getCategories', request, {});
        },
        [sendRequest]
    );

    return {
        state,
        methods: {
            getCourses,
            getCourse,
            createCourse,
            getCreatedCourses,
            updateCourse,
            deleteCourse,
            getCategories
        }
    };
};

export default useCourseManagement;
