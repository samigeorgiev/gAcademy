import React from 'react';

import Arrow from '../../../UI/Arrow';

import styles from './index.module.css';

const Explore = props => {
    return (
        <button className={styles.Explore}>
            Explore
            <Arrow direction="down" />
        </button>
    );
};

export default Explore;
