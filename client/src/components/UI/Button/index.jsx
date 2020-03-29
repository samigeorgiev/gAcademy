import React from 'react';

import styles from './index.module.css';

const Button = props => {
    const classes = [styles.Button];
    if (props.filled) {
        classes.push(styles.Filled);
    }

    return (
        <button onClick={props.onClick} className={classes.join(' ')}>
            {props.children}
        </button>
    );
};

export default Button;
