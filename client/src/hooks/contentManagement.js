import { useCallback, useMemo } from 'react';

import useGrpc from './grpc';

import { CourseClient } from '../proto/content-management_grpc_web_pb';

const useContentManagement = () => {
    const url = process.env.REACT_APP_CONTENT_MANAGEMENT;
    const courseClient = useMemo(() => new CourseClient(url), [url]);

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
        methods: { getCategories, getCoursesByCategory, newCourse },
        state
    };
};

export default useContentManagement;
