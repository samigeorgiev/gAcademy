import React, { useContext } from 'react';

import { Dropdown, Loader } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { CategoriesContext } from '../../../context/categories';

const Explore = props => {
    const { categories } = useContext(CategoriesContext);

    const history = useHistory();

    return (
        <Dropdown item text="Explore">
            <Dropdown.Menu>
                {categories.length ? (
                    categories.map(category => (
                        <Dropdown.Item
                            key={category.getId()}
                            onClick={() =>
                                history.push(
                                    '/courses?category=' + category.getId()
                                )
                            }
                        >
                            {category.getName()}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item>
                        <Loader active />
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Explore;
