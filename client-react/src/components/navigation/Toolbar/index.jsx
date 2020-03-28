import React, { useContext, useState } from 'react';

import { AuthContext } from '../../../context/auth';

import Account from '../items/Account';
import Calendar from '../items/Calendar';
import Courses from '../items/Courses';
import DrawerToggle from '../SideDrawer/DrawerToggle';
import Explore from '../items/Explore';
import LogInButton from '../items/LogInButton';
import Logo from '../../UI/Logo';
import Search from '../items/Search';
import SideDrawer from '../SideDrawer';
import SignUpButton from '../items/SignUpButton';

import styles from './index.module.css';

const Toolbar = props => {
    const [isSideDrawerShown, setIsSideDrawerShown] = useState(false);

    const { token } = useContext(AuthContext);
    const isLoggedIn = token != null;

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
                    {isLoggedIn ? (
                        <>
                            <Calendar />
                            <Courses />
                            <Account />
                        </>
                    ) : (
                        <>
                            <div className={styles.SignUpButtonContainer}>
                                <SignUpButton onClick={props.showSignUp} />
                            </div>
                            <LogInButton onClick={props.showLogIn} />
                        </>
                    )}
                </div>
            </nav>

            <nav className={`${styles.Toolbar} ${styles.MobileOnly}`}>
                <div className={styles.Container}>
                    <DrawerToggle onClick={() => setIsSideDrawerShown(true)} />
                </div>
                <div className={`${styles.Container} ${styles.LogoContainer}`}>
                    <Logo />
                </div>
                <div className={styles.Container}>
                    <Search />
                </div>
                <SideDrawer
                    isShown={isSideDrawerShown}
                    onClose={() => setIsSideDrawerShown(false)}
                >
                    {isLoggedIn ? (
                        <>
                            <Calendar />
                            <Courses />
                            {/* <Account /> */}
                            <Explore />
                        </>
                    ) : (
                        <>
                            <div className={styles.AuthContainer}>
                                <SignUpButton onClick={props.showSignUp} />
                                <LogInButton onClick={props.showLogIn} />
                            </div>
                            <Explore />
                        </>
                    )}
                </SideDrawer>
            </nav>
        </>
    );
};

export default Toolbar;
