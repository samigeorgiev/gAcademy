import React from 'react';

import DrawerToggle from '../SideDrawer/DrawerToggle';
import Explore from '../items/Explore';
import LogInButton from '../items/LogInButton';
import Logo from '../../UI/Logo';
import Search from '../items/Search';
import SignUpButton from '../items/SignUpButton';

import styles from './index.module.css';

const Toolbar = props => {
    return (
        <>
            <nav className={`${styles.Toolbar} ${styles.DesktopOnly}`}>
                <div className={styles.Container}>
                    <div className={styles.LogoContainer}>
                        <Logo />
                    </div>
                    <div className={styles.ExploreContainer}>
                        <Explore />
                    </div>
                </div>
                <div className={styles.Container}>
                    <Search />
                </div>
                <div className={styles.Container}>
                    <div className={styles.SignUpButtonContainer}>
                        <SignUpButton />
                    </div>
                    <LogInButton />
                </div>
            </nav>

            <nav className={`${styles.Toolbar} ${styles.MobileOnly}`}>
                <div className={styles.Container}>
                    <DrawerToggle />
                </div>
                <div className={`${styles.Container} ${styles.LogoContainer}`}>
                    <Logo />
                </div>
                <div className={styles.Container}>
                    <Search />
                </div>
            </nav>
        </>
    );
};

export default Toolbar;
