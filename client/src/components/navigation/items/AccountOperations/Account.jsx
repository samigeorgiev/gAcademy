import React from 'react';

import { Dropdown, Image } from 'semantic-ui-react';

import profile from '../../../../images/tmp/profile.png';

const Account = props => {
    return (
        <Dropdown
            item
            icon={<Image avatar size="mini" src={profile} />}
            style={{ background: 'none' }}
        >
            <Dropdown.Menu>
                <Dropdown.Item>Category 1</Dropdown.Item>
                <Dropdown.Item>Category 2</Dropdown.Item>
                <Dropdown.Item>Category 3</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Account;
