import React, { useContext, useEffect, useRef, useState } from 'react';

import { Button, Input, Message } from 'semantic-ui-react';

import { AuthenticationContext } from '../../../context/authentication';

import useResourceManagementControl from '../../../hooks/resourceManagementControl';
import useUpload from '../../../hooks/upload';

import { UpdateLectureResourceRequest } from '../../../proto/resource-management-control_pb';

const FileInput = props => {
    const [resource, setResource] = useState(null);

    const { user } = useContext(AuthenticationContext);

    const inputElement = useRef(null);

    const {
        state: resourceManagementControlState,
        methods: resourceManagementControlMethods
    } = useResourceManagementControl();
    const { state: uploadState, sendRequest: uploadSendRequest } = useUpload();

    const {
        response: resourceManagementControlResponse,
        error: resourceManagementControlError
    } = resourceManagementControlState;
    useEffect(() => {
        if (
            resourceManagementControlResponse &&
            !resourceManagementControlError
        ) {
            const url = resourceManagementControlResponse.getUrl();
            uploadSendRequest(url, resource);
            inputElement.current.inputRef.current.value = '';
        }
    }, [
        resourceManagementControlResponse,
        resourceManagementControlError,
        uploadSendRequest,
        resource,
        inputElement
    ]);

    const { id } = props;
    const { updateLectureResource } = resourceManagementControlMethods;
    const { token } = user;
    const submitHandler = () => {
        const request = new UpdateLectureResourceRequest();
        request.setId(id);
        updateLectureResource(request, token);
    };

    const error = resourceManagementControlState.error || uploadState.error;
    const isLoading =
        resourceManagementControlState.isLoading || uploadState.isLoading;

    return error ? (
        <Message error header="Error occurred" content={error.message} />
    ) : (
        <>
            <Input
                type="file"
                ref={inputElement}
                onChange={event => setResource(event.target.files[0])}
                size="small"
            />
            <Button
                onClick={submitHandler}
                loading={isLoading}
                disabled={!resource}
                icon="save"
                size="mini"
                color="green"
            />
        </>
    );
};

export default FileInput;
