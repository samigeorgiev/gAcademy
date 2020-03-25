import React from 'react';

import Arrow from '../../../UI/Arrow';
import DropdownItem from '../DropdownItem';

import styles from './index.module.css';

const Explore = props => {
    const clickHandler = event => console.log(event);

    return (
        <DropdownItem>
            <button onClick={clickHandler} className={styles.Explore}>
                Explore
                <Arrow direction="down" />
            </button>
        </DropdownItem>
    );
};

export default Explore;
