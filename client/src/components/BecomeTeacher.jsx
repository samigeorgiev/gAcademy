import React, { useContext, useEffect } from 'react';

import { AuthenticationContext } from '../context/authentication';

import useAccountOperations from '../hooks/accountOperations';

import { Button, Dimmer, Loader, Message, Modal } from 'semantic-ui-react';

import { BecomeTeacherRequest } from '../proto/account-operations_pb';

const BecomeTeacher = props => {
    const { user } = useContext(AuthenticationContext);

    const { methods, state } = useAccountOperations();
    const { becomeTeacher } = methods;
    const { isLoading, response, error } = state;

    const { onClose } = props;
    useEffect(() => {
        if (response) {
            onClose();
        }
    }, [response, onClose]);

    let modalContent = 'Are you sure you want to become a teacher?';
    if (isLoading) {
        modalContent = (
            <Dimmer active>
                <Loader />
            </Dimmer>
        );
    }
    if (error) {
        modalContent = (
            <Message negative>
                <Message.Header>Error occurred</Message.Header>
                <Message.Content>{error.message}</Message.Content>
            </Message>
        );
    }

    return (
        <>
            <Modal.Header
                content="Become a teacher"
                style={{ color: '#2185d0' }}
            />
            <Modal.Content>{modalContent}</Modal.Content>
            <Modal.Actions>
                <Button
                    onClick={props.onClose}
                    icon="remove"
                    content="Cancel"
                    color="red"
                    inverted
                />
                <Button
                    onClick={() =>
                        becomeTeacher(new BecomeTeacherRequest(), user.token)
                    }
                    icon="checkmark"
                    content="Confirm"
                    color="green"
                    inverted
                />
            </Modal.Actions>
        </>
    );
};

export default BecomeTeacher;
