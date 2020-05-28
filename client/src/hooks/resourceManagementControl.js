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

    const getLectures = useCallback(
        request => {
            sendRequest('getAllLectures', request, {});
        },
        [sendRequest]
    );

    return {
        state,
        methods: { getLectures }
    };
};

export default useResourceManagementControl;
