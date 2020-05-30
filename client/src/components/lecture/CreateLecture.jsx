import React, { useContext, useEffect, useState } from 'react';

import { Modal } from 'semantic-ui-react';

import { AuthenticationContext } from '../../context/authentication';

import useResourceManagementControl from '../../hooks/resourceManagementControl';
import useUpload from '../../hooks/upload';

import { CreateLectureRequest } from '../../proto/resource-management-control_pb';

import Form from '../UI/Form';

const CreateLecture = props => {
    const [resource, setResource] = useState(null);

    const { user } = useContext(AuthenticationContext);

    const {
        state: resourceManagementControlState,
        methods: resourceManagementControlMethods
    } = useResourceManagementControl();
    const { state: uploadState, sendRequest: uploadSendRequest } = useUpload();

    const { course } = props;
    const { createLecture } = resourceManagementControlMethods;
    const { token } = user;
    const submitHandler = inputsValues => {
        const request = new CreateLectureRequest();
        request.setCourseid(course);
        request.setName(inputsValues.name);
        createLecture(request, token);
        setResource(inputsValues.resource);
    };

    const {
        response: resourceManagementControlResponse,
        error: resourceManagementControlError
    } = resourceManagementControlState;
    useEffect(() => {
        if (
            resourceManagementControlResponse &&
            !resourceManagementControlError &&
            resource
        ) {
            const url = resourceManagementControlResponse.getUrl();
            uploadSendRequest(url, resource);
        }
    }, [
        resourceManagementControlResponse,
        resourceManagementControlError,
        resource,
        uploadSendRequest
    ]);

    const { response: uploadResponse, error: uploadError } = uploadState;
    const { onClose } = props;
    useEffect(() => {
        if (uploadResponse && !uploadError) {
            onClose(true);
        }
    });

    const inputs = {
        name: {
            type: 'input',
            elementConfig: {
                placeholder: 'Name'
            },
            validate: () => true,
            validationError: 'Invalid name'
        },
        resource: {
            type: 'file',
            elementConfig: {
                type: 'file'
            },
            validate: file => file.type === 'video/mp4',
            validationError: 'Invalid filetype'
        }
    };

    const isLoading =
        resourceManagementControlState.isLoading || uploadState.isLoading;
    const error = resourceManagementControlState.error || uploadState.error;

    return (
        <Modal
            onClose={() => props.onClose(false)}
            centered={false}
            size="mini"
            open
            closeIcon
        >
            <Modal.Header content="Create new lecture" />
            <Modal.Content>
                <Form
                    inputs={inputs}
                    onSubmit={submitHandler}
                    isLoading={isLoading}
                    error={error && error.message}
                />
            </Modal.Content>
        </Modal>
    );
};

export default CreateLecture;
