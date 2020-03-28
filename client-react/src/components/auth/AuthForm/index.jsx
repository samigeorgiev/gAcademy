import React, { useState } from 'react';

import Input from './Input';
import Loader from '../../UI/Loader';

import styles from './index.module.css';

const AuthForm = props => {
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
    // TODO error display
    return (
        <div className={styles.AuthForm}>
            <div className={styles.Header}>
                <h1>{props.heading}</h1>
                <button onClick={props.onClose}>X</button>
            </div>
            {props.isLoading ? (
                <Loader />
            ) : (
                <form onSubmit={submitHandler} noValidate>
                    {Object.entries(inputsState).map(([key, input]) => (
                        <Input
                            key={key}
                            onChange={event => changeInputHandler(key, event)}
                            {...input}
                        />
                    ))}
                    <button type="submit" className={styles.SubmitButton}>
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default AuthForm;
