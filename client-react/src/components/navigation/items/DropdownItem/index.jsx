import React from 'react';

import styles from './index.module.css';

const DropdownItem = props => {
    return <div className={styles.Dropdown}>{props.children}</div>;
};

export default DropdownItem;
