import React, { useState } from 'react';

import { Search, Responsive } from 'semantic-ui-react';

const Search_ = props => {
    const [value, setValue] = useState('');

    const allCourses = [
        {
            id: 1,
            title: 'React',
            description: 'Amazing course'
        },
        {
            id: 2,
            title: 'Samuil Georgiev',
            description: 'Teacher'
        }
    ];

    const changeHandler = (event, data) => {
        setValue(data.value);
        console.log(data);
    };

    const selectHandler = (event, data) => console.log(data);

    return (
        <>
            <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
                <Search
                    loading={false}
                    onResultSelect={selectHandler}
                    onSearchChange={changeHandler}
                    results={allCourses}
                    value={value}
                    placeholder="Search for anything"
                    size="big"
                />
            </Responsive>
            <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
                <Search placeholder="Search for anything" size="tiny" />
            </Responsive>
        </>
    );
};

export default Search_;
