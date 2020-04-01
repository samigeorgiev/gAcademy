import React, { useContext } from 'react';

import { AuthContext } from '../../../../context/auth';

import { Button, Menu } from 'semantic-ui-react';

import Account from './Account';
import Calendar from './Calendar';
import Courses from './Courses';

const AccountOperations = props => {
    const { token } = useContext(AuthContext);
    const isLoggedIn = token !== null;
    return isLoggedIn ? (
        <>
            <Menu.Item>
                <Calendar />
            </Menu.Item>
            <Menu.Item>
                <Courses />
            </Menu.Item>
            <Menu.Item>
                <Account />
            </Menu.Item>
        </>
    ) : (
        <>
            <Menu.Item>
                <Button
                    primary
                    content="Sign up"
                    style={{ background: '#247291' }}
                />
            </Menu.Item>
            <Menu.Item>
                <Button secondary content="Log in" />
            </Menu.Item>
        </>
    );
};

export default AccountOperations;
