import React, { useContext } from 'react';

import { Button, Menu } from 'semantic-ui-react';

import { AuthenticationContext } from '../../../../context/authentication';

import Account from './Account';
import Courses from './Courses';

const AccountOperations = props => {
    const { user } = useContext(AuthenticationContext);
    const isLoggedIn = user !== null;

    return isLoggedIn ? (
        <>
            <Menu.Item>
                <Courses />
            </Menu.Item>
            <Menu.Item>
                <Account showBecomeTeacher={props.showBecomeTeacher} />
            </Menu.Item>
        </>
    ) : (
        <>
            <Menu.Item>
                <Button
                    onClick={props.showSignUp}
                    primary
                    content="Sign up"
                    style={{ background: '#247291' }}
                />
            </Menu.Item>
            <Menu.Item>
                <Button onClick={props.showLogIn} secondary content="Log in" />
            </Menu.Item>
        </>
    );
};

export default AccountOperations;
