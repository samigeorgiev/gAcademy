import React, { useContext, useState } from 'react';

import { AuthContext } from '../../../context/auth';

import Account from '../items/Account';
import Button from '../../UI/Button';
import Calendar from '../items/Calendar';
import Courses from '../items/Courses';
import DrawerToggle from '../SideDrawer/DrawerToggle';
import Explore from '../items/Explore';
import Logo from '../../UI/Logo';
import Search from '../items/Search';
import SideDrawer from '../SideDrawer';

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
                            <Account
                                showBecomeTeacher={props.showBecomeTeacher}
                            />
                        </>
                    ) : (
                        <>
                            <div className={styles.SignUpButtonContainer}>
                                <Button onClick={props.showSignUp} filled>
                                    Sign up
                                </Button>
                            </div>
                            <Button onClick={props.showLogIn}>Log in</Button>
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
                                <Button onClick={props.showSignUp} filled>
                                    Sign up
                                </Button>
                                <Button onClick={props.showLogIn}>
                                    Log in
                                </Button>
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
