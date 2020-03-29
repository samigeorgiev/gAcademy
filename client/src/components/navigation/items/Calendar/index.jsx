import React from 'react';

import Arrow from '../../../UI/Arrow';

import styles from './index.module.css';

const Calendar = props => {
    return (
        <div className={styles.CalendarContainer}>
            <button className={styles.Calendar}>
                Calendar
                <span className={styles.ArrowContainer}>
                    <Arrow direction="down" />
                </span>
            </button>
        </div>
    );
};

export default Calendar;
