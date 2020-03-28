import React from 'react';

import styles from './index.module.css';

const LogInButton = props => {
    return (
        <button onClick={props.onClick} className={styles.LogInButton}>
            Log in
        </button>
    );
};

export default LogInButton;
