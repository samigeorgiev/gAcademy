import React from 'react';

import Toolbar from '../navigation/Toolbar';

const Layout = props => {
    return (
        <>
            <header>
                <Toolbar />
            </header>
            <main>{props.children}</main>
        </>
    );
};

export default Layout;
