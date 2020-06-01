import React, { useContext, useEffect } from 'react';

import { Button, Divider, Modal } from 'semantic-ui-react';
import validator from 'validator';

import { AuthenticationContext } from '../../context/authentication';

import useAuthentication from '../../hooks/authentication';

import { SignUpRequest } from '../../proto/authentication_pb';

import Form from '../UI/Form';

const PASSWORD_LENGTH = { min: 8, max: 64 };

const SignUp = props => {
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

    const { signUp } = methods;
    const submitHandler = inputsValues => {
        const request = new SignUpRequest();
        request.setFirstname(inputsValues.firstName);
        request.setLastname(inputsValues.lastName);
        request.setEmail(inputsValues.email);
        request.setPassword(inputsValues.password);
        signUp(request);
    };

    const inputs = {
        firstName: {
            type: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'First name',
                icon: 'user',
                iconPosition: 'left'
            },
            validate: value => validator.isAlpha(value),
            validationError: 'Invalid first name'
        },
        lastName: {
            type: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Last name',
                icon: 'user',
                iconPosition: 'left'
            },
            validate: value => validator.isAlpha(value),
            validationError: 'Invalid last name'
        },
        email: {
            type: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
                icon: 'mail',
                iconPosition: 'left'
            },
            validate: value =>
                validator.isEmail(validator.normalizeEmail(value)),
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
            validate: value => validator.isLength(value, PASSWORD_LENGTH),
            validationError: `Password should be between \
                ${PASSWORD_LENGTH.min} and ${PASSWORD_LENGTH.max}`
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
            <Modal.Header>SignUp</Modal.Header>
            <Modal.Content>
                <Form
                    inputs={inputs}
                    onSubmit={submitHandler}
                    error={state.error && state.error.message}
                    isLoading={state.isLoading}
                />
                <Divider content="OR" horizontal />
                <Button
                    icon="github"
                    color="black"
                    content="Log in with GitHub"
                    fluid
                />
            </Modal.Content>
        </Modal>
    );
};

export default SignUp;
