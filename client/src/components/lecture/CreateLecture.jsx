import React from 'react';

import { Modal } from 'semantic-ui-react';

import Form from '../UI/Form';

const CreateLecture = props => {
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
                    onSubmit={data => console.log(data)}
                    error={null}
                />
            </Modal.Content>
        </Modal>
    );
};

export default CreateLecture;
