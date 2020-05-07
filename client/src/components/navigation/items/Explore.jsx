import React, { useEffect, useState } from 'react';

import { Dropdown, Loader } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import useCourseManagement from '../../../hooks/courseManagement';

import { GetCategoriesRequest } from '../../../proto/content-management_pb';

const Explore = props => {
    const [categories, setCategories] = useState([]);

    const history = useHistory();

    const { methods, state } = useCourseManagement();

    const { getCategories } = methods;
    useEffect(() => {
        getCategories(new GetCategoriesRequest());
    }, [getCategories]);

    const { response } = state;
    useEffect(() => {
        if (response) {
            setCategories(response.getCategoriesList());
        }
    }, [response]);

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
                        <Loader active={state.isLoading} />
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Explore;
