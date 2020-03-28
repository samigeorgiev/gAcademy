import React from 'react';

import styles from './index.module.css';

import tmp from '../../../../images/tmp/profile.png';

const Account = props => {
    return (
        <div className={styles.Account} onClick={props.showBecomeTeacher}>
            <img src={tmp} alt="Profile" />
        </div>
    );
};

export default Account;
