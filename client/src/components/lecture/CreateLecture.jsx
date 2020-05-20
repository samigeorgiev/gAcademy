import React, { useState } from 'react';

import { Form, Modal } from 'semantic-ui-react';

const CreateLecture = props => {
    const [name, setName] = useState('');
    const [resource, setResource] = useState(null);

    console.log(resource);

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
                <Form>
                    <Form.Input
                        value={name}
                        onChange={event => setName(event.target.value)}
                        placeholder="Name"
                        fluid
                    />
                    <Form.Input
                        type="file"
                        onChange={event => setResource(event.target.files[0])}
                        fluid
                    />
                    <Form.Button
                        content="Submit"
                        primary
                        fluid
                        style={{ marginTop: '1rem', background: '247291' }}
                    />
                </Form>
            </Modal.Content>
        </Modal>
    );
};

export default CreateLecture;
