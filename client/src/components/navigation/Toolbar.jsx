import React from 'react';

import { Image, Menu, Responsive } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import AccountOperations from './items/AccountOperations';
import Explore from './items/Explore';
import Search from './items/Search';

import logo from '../../images/logo.png';

const Toolbar = props => {
    return (
        <>
            <Responsive
                maxWidth={Responsive.onlyTablet.maxWidth}
                as="header"
                style={{ borderBottom: '1px solid #ccc' }}
            >
                <Menu secondary as="nav">
                    <Menu.Item onClick={props.openSidebar} icon="sidebar" />
                    <Menu.Item position="right">
                        <Search />
                    </Menu.Item>
                </Menu>
            </Responsive>
            <Responsive
                minWidth={Responsive.onlyTablet.maxWidth}
                as="header"
                style={{ borderBottom: '1px solid #ccc' }}
            >
                <Menu
                    secondary
                    as="nav"
                    style={{
                        maxWidth: '100rem',
                        margin: 'auto',
                        padding: '0 1rem'
                    }}
                >
                    <Menu.Item>
                        <NavLink to="/">
                            <Image src={logo} size="small" />
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <Explore />
                    </Menu.Item>
                    <Menu.Item style={{ margin: 'auto' }}>
                        <Search />
                    </Menu.Item>
                    <AccountOperations
                        showSignUp={props.showSignUp}
                        showLogIn={props.showLogIn}
                        showBecomeTeacher={props.showBecomeTeacher}
                    />
                </Menu>
            </Responsive>
        </>
    );
};

export default Toolbar;
