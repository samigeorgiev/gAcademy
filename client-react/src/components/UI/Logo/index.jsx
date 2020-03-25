import React from 'react';

import styles from './index.module.css';

import logo from '../../../images/logo.png';

const Logo = () => (
    <div className={styles.Logo}>
        <img src={logo} alt="logo" />
    </div>
);

export default Logo;
