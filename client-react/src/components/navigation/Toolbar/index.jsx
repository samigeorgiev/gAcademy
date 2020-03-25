import React from 'react';

import Explore from '../items/Explore';
import LogInButton from '../items/LogInButton';
import Logo from '../../UI/Logo';
import Search from '../items/Search';
import SignUpButton from '../items/SignUpButton';

import styles from './index.module.css';

const Toolbar = props => {
    return (
        <nav className={styles.Toolbar}>
            <div>
                <div className={styles.LogoContainer}>
                    <Logo />
                </div>
                <div className={styles.ExploreContainer}>
                    <Explore />
                </div>
            </div>
            <div>
                <Search />
            </div>
            <div>
                <div className={styles.SignUpButtonContainer}>
                    <SignUpButton />
                </div>
                <LogInButton />
            </div>
        </nav>
    );
};

export default Toolbar;
