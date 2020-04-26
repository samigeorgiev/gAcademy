import { useCallback } from 'react';

import useGrpc from './grpc';

import { CourseClient } from '../proto/content-management_grpc_web_pb';

const courseClient = new CourseClient(process.env.REACT_APP_CONTENT_MANAGEMENT);

const useContentManagement = () => {
    const [state, sendRequest] = useGrpc(courseClient);

    const getCategories = useCallback(
        request => {
            sendRequest('getCategories', request, {});
        },
        [sendRequest]
    );

    const getCoursesByCategory = useCallback(
        request => {
            sendRequest('getCoursesByCategory', request, {});
        },
        [sendRequest]
    );

    const newCourse = useCallback(
        request => {
            sendRequest('newCourse', request, {});
        },
        [sendRequest]
    );

    return {
        state,
        methods: { getCategories, getCoursesByCategory, newCourse }
    };
};

export default useContentManagement;
