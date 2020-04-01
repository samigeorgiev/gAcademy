import React from 'react';

import { Search, Responsive } from 'semantic-ui-react';

const Search_ = props => {
    return (
        <>
            <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
                <Search placeholder="Search for anything" size="big" />
            </Responsive>
            <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
                <Search placeholder="Search for anything" size="tiny" />
            </Responsive>
        </>
    );
};

export default Search_;
