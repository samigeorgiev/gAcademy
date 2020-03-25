import React from 'react';

import Toolbar from '../navigation/Toolbar';

import styles from './index.module.css';

const Layout = props => {
    return (
        <>
            <header className={styles.Header}>
                <Toolbar />
            </header>
            <main>{props.children}</main>
        </>
    );
};

export default Layout;
