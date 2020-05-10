import React from 'react';

import { Button, Dimmer, Loader, Message, Modal } from 'semantic-ui-react';

const Confirm = props => {
    let modalContent = props.children;
    if (props.isLoading) {
        modalContent = (
            <Dimmer active>
                <Loader />
            </Dimmer>
        );
    }
    if (props.error) {
        modalContent = (
            <Message
                negative
                header="Error occurred"
                content={props.error.message}
            />
        );
    }

    return (
        <Modal
            onClose={props.onClose}
            centered={false}
            size="mini"
            open
            closeIcon
        >
            <Modal.Header content={props.header} style={{ color: '#2185d0' }} />
            <Modal.Content content={modalContent} />
            <Modal.Actions>
                <Button
                    onClick={props.onClose}
                    icon="remove"
                    content="Cancel"
                    color="red"
                    inverted
                />
                <Button
                    onClick={props.onConfirm}
                    icon="checkmark"
                    content="Confirm"
                    color="green"
                    inverted
                />
            </Modal.Actions>
        </Modal>
    );
};

export default Confirm;
