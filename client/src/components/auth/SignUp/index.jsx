import React, { useContext, useState } from 'react';

import validator from 'validator';

import { AuthContext } from '../../../context/auth';

import AuthForm from '../AuthForm';

import { SignUpRequest } from '../../../proto/authentication_pb';
import { AuthenticationClient } from '../../../proto/authentication_grpc_web_pb';

const PASSWORD_LENGTH = { min: 8, max: 64 };

const SignUp = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { logIn } = useContext(AuthContext);

    const inputs = {
        firstName: {
            type: 'text',
            placeholder: 'First name',
            validate: value => validator.isAlpha(value),
            validationError: 'Invalid first name'
        },
        lastName: {
            type: 'text',
            placeholder: 'Last name',
            validate: value => validator.isAlpha(value),
            validationError: 'Invalid last name'
        },
        email: {
            type: 'email',
            placeholder: 'Email',
            validate: value =>
                validator.isEmail(validator.normalizeEmail(value)),
            validationError: 'Invalid email'
        },
        password: {
            type: 'password',
            placeholder: 'Password',
            validate: value => validator.isLength(value, PASSWORD_LENGTH),
            validationError: `Password should be between \
                ${PASSWORD_LENGTH.min} and ${PASSWORD_LENGTH.max}`
        }
    };

    const submitHandler = (inputsValues, event) => {
        event.preventDefault();
        const authClient = new AuthenticationClient(
            process.env.REACT_APP_AUTHENTICATION
        );
        const request = new SignUpRequest();
        request.setFirstname(inputsValues.firstName);
        request.setLastname(inputsValues.lastName);
        request.setEmail(inputsValues.email);
        request.setPassword(inputsValues.password);
        setIsLoading(true);
        setError(null);
        authClient.signUp(request, {}, (error, response) => {
            setIsLoading(false);
            if (error) {
                setError(error.message);
                // TODO proper error handling
                return;
            }
            logIn(response.getToken(), response.getExpiresin());
            props.onClose();
        });
    };

    return (
        <AuthForm
            inputs={inputs}
            onSubmit={submitHandler}
            heading="Sign up"
            error={error}
            isLoading={isLoading}
            onClose={props.onClose}
        />
    );
};

export default SignUp;
