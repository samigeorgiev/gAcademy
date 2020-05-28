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

    const getResource = useCallback(
        request => {
            sendRequest('getLecture', request, {});
        },
        [sendRequest]
    );

    return {
        state,
        methods: { createLecture, getLectures, getResource }
    };
};

export default useResourceManagementControl;
