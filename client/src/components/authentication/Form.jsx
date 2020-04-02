import React, { useState } from 'react';

import { Button, Form, Message } from 'semantic-ui-react';

const AuthenticationForm = props => {
    const initialInputsState = {};
    for (const input in props.inputs) {
        initialInputsState[input] = {
            ...props.inputs[input],
            value: '',
            isValid: false,
            isTouched: false
        };
    }

    const [inputsState, setInputsState] = useState(initialInputsState);
    const [isFormValid, setIsFormValid] = useState(false);

    const changeInputHandler = (key, event) => {
        const inputValue = event.target.value;
        setInputsState(prevInputsState => {
            const newInputsState = {
                ...prevInputsState
            };
            for (const input in newInputsState) {
                newInputsState[input] = {
                    ...prevInputsState[input]
                };
            }
            newInputsState[key].value = inputValue;
            newInputsState[key].isValid = newInputsState[key].validate(
                newInputsState[key].value
            );
            newInputsState[key].isTouched = true;

            let newIsFormValid = true;
            Object.values(newInputsState).forEach(
                input => (newIsFormValid = newIsFormValid && input.isValid)
            );
            setIsFormValid(newIsFormValid);
            return newInputsState;
        });
    };

    const submitHandler = event => {
        const inputsValues = {};
        for (const input in inputsState) {
            inputsValues[input] = inputsState[input].value;
        }
        props.onSubmit(inputsValues, event);
    };

    return (
        <Form
            onSubmit={submitHandler}
            loading={props.isLoading}
            error={props.error !== null}
            noValidate
        >
            <Message
                error
                header="Authentication error"
                content={props.error}
            />
            {Object.entries(inputsState).map(([key, input]) => (
                <Form.Input
                    key={key}
                    onChange={event => changeInputHandler(key, event)}
                    iconPosition="left"
                    error={
                        input.isTouched &&
                        !input.isValid &&
                        input.validationError
                    }
                    icon={input.icon}
                    type={input.type}
                    placeholder={input.placeholder}
                />
            ))}
            <Button
                primary
                fluid
                content="Submit"
                disabled={!isFormValid}
                style={{ background: '#247291' }}
            />
        </Form>
    );
};

export default AuthenticationForm;
