import React, { useState } from 'react';

import { Sidebar } from 'semantic-ui-react';

import BecomeTeacher from './BecomeTeacher';
import LogIn from './auth/LogIn';
import Modal from './UI/Modal';
import SignUp from './auth/SignUp';
import NavigationSidebar from './navigation/Sidebar';
import Toolbar from './navigation/Toolbar';

const Layout = props => {
    const [shownForm, setShownForm] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <Sidebar.Pushable style={{ minHeight: '100vh' }}>
            <NavigationSidebar
                isShown={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Sidebar.Pusher
                dimmed={isSidebarOpen}
                style={{ minHeight: '100vh' }}
            >
                <Toolbar
                    openSidebar={() => setIsSidebarOpen(true)}
                    showSignUp={showSignUp}
                    showLogIn={showLogIn}
                    showBecomeTeacher={showBecomeTeacher}
                />
                <main>
                    <>
                        <Modal isShown={shownForm} onClose={closeForm}>
                            {shownForm && forms[shownForm]}
                        </Modal>
                        {props.children}
                    </>
                </main>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};

export default Layout;
