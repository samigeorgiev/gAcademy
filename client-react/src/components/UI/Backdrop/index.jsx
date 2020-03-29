import React from 'react';

import styles from './index.module.css';

const Backdrop = props => {
    const classes = [styles.Backdrop];
    classes.push(props.isShown ? styles.Shown : styles.Hidden);

    return <div className={classes.join(' ')} onClick={props.onClick}></div>;
};

export default Backdrop;
