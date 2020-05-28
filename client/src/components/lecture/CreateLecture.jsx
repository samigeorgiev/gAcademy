import React, { useContext, useEffect } from 'react';

import { Modal } from 'semantic-ui-react';

import { AuthenticationContext } from '../../context/authentication';

import useResourceManagementControl from '../../hooks/resourceManagementControl';

import { CreateLectureRequest } from '../../proto/resource-management-control_pb';

import Form from '../UI/Form';

const CreateLecture = props => {
    const { user } = useContext(AuthenticationContext);

    const { state, methods } = useResourceManagementControl();

    const { course } = props;
    const { createLecture } = methods;
    const { token } = user;
    const submitHandler = inputsValues => {
        const request = new CreateLectureRequest();
        request.setCourseid(course);
        request.setName(inputsValues.name);
        createLecture(request, token);
    };

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            console.log(response);
        }
    }, [response, error]);

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

    return (
        <Modal
            onClose={props.onClose}
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
                    isLoading={state.isLoading}
                    error={state.error}
                />
            </Modal.Content>
        </Modal>
    );
};

export default CreateLecture;
