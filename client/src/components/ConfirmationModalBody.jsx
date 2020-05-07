// TODO for refactoring
import React from 'react';

import { Button, Dimmer, Loader, Modal } from 'semantic-ui-react';

const ConfirmationModalBody = props => (
    <>
        <Modal.Header content={props.title} style={{ color: '#2185d0' }} />
        <Modal.Content>
            {props.isLoading ? (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            ) : (
                props.children
            )}
        </Modal.Content>
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
    </>
);

export default ConfirmationModalBody;
