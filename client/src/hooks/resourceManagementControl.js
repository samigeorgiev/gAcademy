import { useCallback } from 'react';

import useGrpc from './grpc';

import {
    LectureClient //
} from '../proto/resource-management-control_grpc_web_pb';

const resourceManagementControlClient = new LectureClient(
    process.env.REACT_APP_RESOURCE_MANAGEMENT_CONTROL
);

const useResourceManagementControl = () => {
    const [state, sendRequest] = useGrpc(resourceManagementControlClient);

    const createLecture = useCallback(
        (request, token) => {
            sendRequest('createLecture', request, { Authorization: token });
        },
        [sendRequest]
    );

    const getLectures = useCallback(
        request => {
            sendRequest('getAllLectures', request, {});
        },
        [sendRequest]
    );

    const updateLectureName = useCallback(
        (request, token) => {
            sendRequest('updateLectureName', request, { Authorization: token });
        },
        [sendRequest]
    );

    const updateLectureResource = useCallback(
        (request, token) => {
            sendRequest('updateLectureResource', request, {
                Authorization: token
            });
        },
        [sendRequest]
    );

    const getResource = useCallback(
        (request, token) => {
            sendRequest('getLecture', request, { Authorization: token });
        },
        [sendRequest]
    );

    return {
        state,
        methods: {
            createLecture,
            getLectures,
            updateLectureName,
            updateLectureResource,
            getResource
        }
    };
};

export default useResourceManagementControl;
