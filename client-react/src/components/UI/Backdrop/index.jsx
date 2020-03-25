import React from 'react';

import styles from './index.module.css';

const Backdrop = props =>
    props.isShown ? (
        <div className={styles.Backdrop} onClick={props.onClick}></div>
    ) : null;

export default Backdrop;
