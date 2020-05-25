import React, { useState } from 'react';

import { Form, Message } from 'semantic-ui-react';

import Input from './Input';

const Form_ = props => {
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

    const changeInputHandler = (key, data) => {
        const inputValue = data.value;
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
        event.preventDefault();
        const inputsValues = {};
        for (const input in inputsState) {
            inputsValues[input] = inputsState[input].value;
        }
        props.onSubmit(inputsValues);
    };

    return (
        <Form
            onSubmit={submitHandler}
            loading={props.isLoading}
            error={props.error !== null}
            noValidate
        >
            <Message error header="Error occurred" content={props.error} />
            {Object.entries(inputsState).map(([key, input]) => (
                <Input
                    key={key}
                    type={input.type}
                    onChange={(event, data) => changeInputHandler(key, data)}
                    error={
                        input.isTouched &&
                        !input.isValid &&
                        input.validationError
                    }
                    elementConfig={input.elementConfig}
                />
            ))}
            <Form.Button
                content="Submit"
                disabled={!isFormValid}
                primary
                fluid
                style={{ background: '#247291' }}
            />
        </Form>
    );
};

export default Form_;
