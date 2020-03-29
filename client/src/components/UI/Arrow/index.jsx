import React from 'react';

import styles from './index.module.css';

const Arrow = props => (
    <i className={`${styles.Arrow} fas fa-chevron-${props.direction}`}></i>
);

export default Arrow;
