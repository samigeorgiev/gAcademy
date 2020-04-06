import React, { useContext, useEffect } from 'react';

import validator from 'validator';
import { Modal } from 'semantic-ui-react';

import useAuthentication from '../../hooks/authentication';

import { AuthenticationContext } from '../../context/authentication';

import Form from './Form';

import { LogInRequest } from '../../proto/authentication_pb';

const LogIn = props => {
    const { methods, state } = useAuthentication();
    const { logIn: grpcLogin } = methods;
    const { isLoading, error, response } = state;

    const { logIn } = useContext(AuthenticationContext);

    const { onClose } = props;
    useEffect(() => {
        if (response) {
            logIn(response.getToken(), response.getExpiresin());
            onClose();
        }
    }, [response, logIn, onClose]);

    const inputs = {
        email: {
            type: 'email',
            placeholder: 'Email',
            icon: 'mail',
            validate: value =>
                validator.isEmail(validator.normalizeEmail(value)),
            validationError: 'Invalid email'
        },
        password: {
            type: 'password',
            placeholder: 'Password',
            icon: 'mail',
            validate: value => true,
            validationError: null
        }
    };

    const submitHandler = (inputsValues, event) => {
        event.preventDefault();
        const request = new LogInRequest();
        request.setEmail(inputsValues.email);
        request.setPassword(inputsValues.password);
        grpcLogin(request);
    };

    return (
        <>
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
                <Form
                    inputs={inputs}
                    onSubmit={submitHandler}
                    error={error && error.message}
                    isLoading={isLoading}
                    onClose={props.onClose}
                />
            </Modal.Content>
        </>
    );
};

export default LogIn;
