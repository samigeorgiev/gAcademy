import React, { useContext, useEffect } from 'react';

import { Message } from 'semantic-ui-react';

import { AuthenticationContext } from '../context/authentication';

import useAccountOperations from '../hooks/accountOperations';

import { BecomeTeacherRequest } from '../proto/account-operations_pb';

import ConfirmationModalBody from './ConfirmationModalBody';

const BecomeTeacher = props => {
    const { user, becomeTeacher } = useContext(AuthenticationContext);

    const { methods, state } = useAccountOperations();
    const { becomeTeacher: gprcBecomeTeacher } = methods;
    const { isLoading, response, error } = state;

    const { onClose } = props;
    useEffect(() => {
        if (response) {
            becomeTeacher();
            onClose();
        }
    }, [response, becomeTeacher, onClose]);

    let modalContent = 'Are you sure you want to become a teacher?';
    if (error) {
        modalContent = (
            <Message negative>
                <Message.Header>Error occurred</Message.Header>
                <Message.Content>{error.message}</Message.Content>
            </Message>
        );
    }

    return (
        <ConfirmationModalBody
            title="Become a teacher"
            isLoading={isLoading}
            onClose={props.onClose}
            onConfirm={() =>
                gprcBecomeTeacher(new BecomeTeacherRequest(), user.token)
            }
        >
            {modalContent}
        </ConfirmationModalBody>
    );
};

export default BecomeTeacher;
