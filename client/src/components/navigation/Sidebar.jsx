import React from 'react';

import { Menu, Sidebar } from 'semantic-ui-react';

import AccountOperations from './items/AccountOperations';
import Explore from './items/Explore';

const Sidebar_ = props => {
    return (
        <Sidebar
            as={Menu}
            visible={props.isShown}
            onHide={props.onClose}
            animation="overlay"
            vertical
        >
            <Menu.Item>
                <Explore />
            </Menu.Item>
            <AccountOperations />
        </Sidebar>
    );
};

export default Sidebar_;
