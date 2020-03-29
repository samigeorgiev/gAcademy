import React, { useState } from 'react';

import BecomeTeacher from '../BecomeTeacher';
import LogIn from '../auth/LogIn';
import Modal from '../UI/Modal';
import SignUp from '../auth/SignUp';
import Toolbar from '../navigation/Toolbar';

import styles from './index.module.css';

const Layout = props => {
    const [shownForm, setShownForm] = useState(null);

    const showSignUp = () => setShownForm('Sign Up');
    const showLogIn = () => setShownForm('Log In');
    const showBecomeTeacher = () => setShownForm('Become teacher');
    const closeForm = () => setShownForm(null);

    const forms = {
        'Sign Up': <SignUp onClose={closeForm} />,
        'Log In': <LogIn onClose={closeForm} />,
        'Become teacher': <BecomeTeacher onClose={closeForm} />
    };

    return (
        <>
            <header className={styles.Header}>
                <Toolbar
                    showSignUp={showSignUp}
                    showLogIn={showLogIn}
                    showBecomeTeacher={showBecomeTeacher}
                />
            </header>
            <main>
                <>
                    <Modal isShown={shownForm} onClose={closeForm}>
                        {shownForm && forms[shownForm]}
                    </Modal>
                    {props.children}
                </>
            </main>
        </>
    );
};

export default Layout;
