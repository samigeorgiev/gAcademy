import React from 'react';

import styles from './index.module.css';

const SignUpButton = props => {
    return (
        <button onClick={props.onClick} className={styles.SignUpButton}>
            Sign up
        </button>
    );
};

export default SignUpButton;
