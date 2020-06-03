import React, { useContext, useEffect } from 'react';

import { Button, Divider, Modal } from 'semantic-ui-react';

import { AuthenticationContext } from '../../context/authentication';

import useAuthentication from '../../hooks/authentication';

import { LogInRequest } from '../../proto/authentication_pb';

import Form from '../UI/Form';

const LogIn = props => {
    const { methods, state } = useAuthentication();

    const { logIn } = useContext(AuthenticationContext);

    const { response, error } = state;
    const { onClose } = props;
    useEffect(() => {
        if (response && !error.message) {
            logIn(response.getToken(), response.getExpiresin());
            onClose();
        }
    }, [response, error, logIn, onClose]);

    const { logIn: grpcLogIn } = methods;
    const submitHandler = inputsValues => {
        const request = new LogInRequest();
        request.setEmail(inputsValues.email);
        request.setPassword(inputsValues.password);
        grpcLogIn(request);
    };

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
                    error={state.error && state.error.message}
                    isLoading={state.isLoading}
                />
                <Divider content="OR" horizontal />
                <Button
                    disabled
                    icon="github"
                    color="black"
                    content="Log in with GitHub"
                    fluid
                />
            </Modal.Content>
        </Modal>
    );
};

export default LogIn;
