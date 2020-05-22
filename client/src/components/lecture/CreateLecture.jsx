import React, { useState } from 'react';

import { Button, Input, Modal } from 'semantic-ui-react';

const CreateLecture = props => {
    const [, setName] = useState('');

    return (
        <Modal onClose={props.onClose} centered={false} open closeIcon>
            <Modal.Header content="Create new lecture" />
            <Modal.Content>
                <Input onChange={event => setName(event.target.value)} />
            </Modal.Content>
            <Modal.Actions>
                <Button content="Save" />
            </Modal.Actions>
        </Modal>
    );
};

export default CreateLecture;
