import React, { useContext, useEffect } from 'react';

import { AuthenticationContext } from '../context/authentication';

import useAccountManagement from '../hooks/accountManagement';

import { BecomeTeacherRequest } from '../proto/content-management_pb';

import Confirm from './UI/Confirm';

const BecomeTeacher = props => {
    const { user, becomeTeacher } = useContext(AuthenticationContext);

    const { methods, state } = useAccountManagement();

    const { response, error } = state;
    const { onClose } = props;
    useEffect(() => {
        if (response && !error) {
            becomeTeacher();
            onClose();
        }
    }, [response, error, becomeTeacher, onClose]);

    const confirmHandler = () => {
        methods.becomeTeacher(new BecomeTeacherRequest(), user.token);
    };

    return (
        <Confirm
            onConfirm={confirmHandler}
            header="Become teacher"
            isLoading={state.isLoading}
            error={state.error}
            onClose={props.onClose}
        >
            Are you sure you want to become a teacher?
        </Confirm>
    );
};

export default BecomeTeacher;
