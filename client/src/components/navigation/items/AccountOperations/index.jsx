import React, { useContext } from 'react';

import { Button, Menu } from 'semantic-ui-react';

import { AuthContext } from '../../../../context/auth';

import Account from './Account';
import Calendar from './Calendar';
import Courses from './Courses';

const AccountOperations = props => {
    const { user } = useContext(AuthContext);
    const isLoggedIn = user !== null;
    return isLoggedIn ? (
        <>
            <Menu.Item>
                <Calendar />
            </Menu.Item>
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
