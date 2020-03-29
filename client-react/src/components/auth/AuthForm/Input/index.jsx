import React from 'react';

import styles from './index.module.css';

const Input = props => {
    const classes = [styles.Input];
    let validationError = null;

    if (!props.isValid && props.isTouched) {
        classes.push(styles.Invalid);
        validationError = (
            <p className={styles.ValidationError}>{props.validationError}</p>
        );
    }

    return (
        <div className={styles.InputContainer}>
            <input
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                className={classes.join(' ')}
            />
            {validationError}
        </div>
    );
};

export default Input;
