import React from 'react';

import { NavLink } from 'react-router-dom';
import { Menu, Responsive } from 'semantic-ui-react';

import AccountOperations from './items/AccountOperations';
import Explore from './items/Explore';
import Logo from '../UI/Logo';
import Search from './items/Search';

const Toolbar = props => {
    return (
        <>
            <Responsive
                maxWidth={Responsive.onlyTablet.maxWidth}
                as="header"
                style={{ borderBottom: '1px solid #ccc' }}
            >
                <Menu secondary>
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
                    style={{
                        maxWidth: '100rem',
                        margin: 'auto',
                        padding: '0 1rem'
                    }}
                >
                    <Menu.Item>
                        <NavLink to="/">
                            <Logo />
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <Explore />
                    </Menu.Item>
                    <Menu.Item style={{ margin: 'auto' }}>
                        <Search />
                    </Menu.Item>
                    <AccountOperations />
                </Menu>
            </Responsive>
        </>
    );
};

export default Toolbar;
