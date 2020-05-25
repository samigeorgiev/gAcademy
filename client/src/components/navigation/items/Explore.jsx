import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { Dropdown, Loader } from 'semantic-ui-react';

import { CategoriesContext } from '../../../context/categories';

const Explore = props => {
    const history = useHistory();

    const { categories } = useContext(CategoriesContext);

    let content;
    if (categories.length) {
        content = categories.map(category => (
            <Dropdown.Item
                key={category.getId()}
                onClick={() =>
                    history.push('/courses?category=' + category.getId())
                }
            >
                {category.getName()}
            </Dropdown.Item>
        ));
    } else {
        content = (
            <Dropdown.Item>
                <Loader active />
            </Dropdown.Item>
        );
    }

    return (
        <Dropdown text="Explore" item>
            <Dropdown.Menu content={content} />
        </Dropdown>
    );
};

export default Explore;
