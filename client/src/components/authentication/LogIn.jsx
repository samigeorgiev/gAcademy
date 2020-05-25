import React, { useContext, useEffect } from 'react';

import { Modal } from 'semantic-ui-react';

import useAuthentication from '../../hooks/authentication';

import { AuthenticationContext } from '../../context/authentication';

import Form from '../UI/Form';

import { LogInRequest } from '../../proto/authentication_pb';

const LogIn = props => {
    const { methods, state } = useAuthentication();
    const { logIn: grpcLogin } = methods;
    const { isLoading, error, response } = state;

    const { logIn } = useContext(AuthenticationContext);

    const { onClose } = props;
    useEffect(() => {
        if (response && !error.message) {
            logIn(response.getToken(), response.getExpiresin());
            onClose();
        }
    }, [response, error, logIn, onClose]);

    const inputs = {
        email: {
            type: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
                icon: 'mail',
                iconPosition: 'left'
            },
            validate: () => true,
            validationError: 'Invalid email'
        },
        password: {
            type: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
                icon: 'lock',
                iconPosition: 'left'
            },
            validate: () => true,
            validationError: null
        }
    };

    const submitHandler = inputsValues => {
        const request = new LogInRequest();
        request.setEmail(inputsValues.email);
        request.setPassword(inputsValues.password);
        grpcLogin(request);
    };

    return (
        <Modal
            onClose={props.onClose}
            centered={false}
            size="mini"
            open
            closeIcon
        >
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
                <Form
                    inputs={inputs}
                    onSubmit={submitHandler}
                    error={error && error.message}
                    isLoading={isLoading}
                />
            </Modal.Content>
        </Modal>
    );
};

export default LogIn;
