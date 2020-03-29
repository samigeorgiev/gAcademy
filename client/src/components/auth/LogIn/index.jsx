import React, { useContext, useState } from 'react';

import validator from 'validator';

import { AuthContext } from '../../../context/auth';

import AuthForm from '../AuthForm';

import { LogInRequest } from '../../../proto/authentication_pb';
import { AuthenticationClient } from '../../../proto/authentication_grpc_web_pb';
// TODO create auth hook
const LogIn = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { logIn } = useContext(AuthContext);

    const inputs = {
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
            validate: value => true,
            validationError: null
        }
    };

    const submitHandler = (inputsValues, event) => {
        event.preventDefault();
        const authClient = new AuthenticationClient(
            process.env.REACT_APP_AUTHENTICATION
        );
        const request = new LogInRequest();
        request.setEmail(inputsValues.email);
        request.setPassword(inputsValues.password);
        setIsLoading(true);
        setError(null);
        authClient.logIn(request, {}, (error, response) => {
            setIsLoading(false);
            if (error) {
                setError(error.message);
                console.log(error);
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
            heading="Log in"
            error={error}
            isLoading={isLoading}
            onClose={props.onClose}
        />
    );
};

export default LogIn;
