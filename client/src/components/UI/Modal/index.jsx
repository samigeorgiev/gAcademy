import React from 'react';

import Backdrop from '../Backdrop';

import styles from './index.module.css';

const Modal = props => {
    const classes = [styles.Modal];
    classes.push(props.isShown ? styles.Shown : styles.Hidden);

    return (
        <>
            <Backdrop onClick={props.onClose} isShown={props.isShown} />
            <div className={classes.join(' ')}>{props.children}</div>
        </>
    );
};

export default Modal;
