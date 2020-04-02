import React, { useContext, useEffect } from 'react';

import validator from 'validator';
import { Modal } from 'semantic-ui-react';

import useAuthentication from '../../hooks/authentication';

import { AuthContext } from '../../context/auth';

import Form from './Form';

import { SignUpRequest } from '../../proto/authentication_pb';

const PASSWORD_LENGTH = { min: 8, max: 64 };

const SignUp = props => {
    const { methods, state } = useAuthentication();
    const { signUp: grpcSignUp } = methods;
    const { isLoading, error, response } = state;

    const { logIn } = useContext(AuthContext);

    const { onClose } = props;
    useEffect(() => {
        if (response) {
            logIn(response.getToken(), response.getExpiresin());
            onClose();
        }
    }, [response, logIn, onClose]);

    const inputs = {
        firstName: {
            type: 'text',
            placeholder: 'First name',
            icon: 'user',
            validate: value => validator.isAlpha(value),
            validationError: 'Invalid first name'
        },
        lastName: {
            type: 'text',
            placeholder: 'Last name',
            icon: 'user',
            validate: value => validator.isAlpha(value),
            validationError: 'Invalid last name'
        },
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
            icon: 'lock',
            validate: value => validator.isLength(value, PASSWORD_LENGTH),
            validationError: `Password should be between \
                ${PASSWORD_LENGTH.min} and ${PASSWORD_LENGTH.max}`
        }
    };

    const submitHandler = (inputsValues, event) => {
        event.preventDefault();
        const request = new SignUpRequest();
        request.setFirstname(inputsValues.firstName);
        request.setLastname(inputsValues.lastName);
        request.setEmail(inputsValues.email);
        request.setPassword(inputsValues.password);
        grpcSignUp(request);
    };

    return (
        <>
            <Modal.Header>SignUp</Modal.Header>
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

export default SignUp;
