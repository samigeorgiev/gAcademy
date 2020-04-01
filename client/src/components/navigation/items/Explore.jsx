import React from 'react';

import { Dropdown } from 'semantic-ui-react';

const Explore = props => {
    return (
        <Dropdown
            item
            simple
            text="Explore"
            style={{
                color: 'white',
                fontWeight: 'bold',
                background: '#247291'
            }}
        >
            <Dropdown.Menu>
                <Dropdown.Item>Category 1</Dropdown.Item>
                <Dropdown.Item>Category 2</Dropdown.Item>
                <Dropdown.Item>Category 3</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Explore;
