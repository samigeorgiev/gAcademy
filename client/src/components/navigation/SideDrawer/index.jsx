import React from 'react';

import styles from './index.module.css';
import Backdrop from '../../UI/Backdrop';

const SideDrawer = props => {
    const classes = [styles.SideDrawer];
    classes.push(props.isShown ? styles.Shown : styles.Hidden);

    return (
        <>
            <Backdrop onClick={props.onClose} isShown={props.isShown} />
            <div className={classes.join(' ')}>{props.children}</div>
        </>
    );
};

export default SideDrawer;
