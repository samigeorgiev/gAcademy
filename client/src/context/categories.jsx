import React, { useCallback, useEffect, useState } from 'react';

import useCourseManagement from '../hooks/courseManagement';

import { GetCategoriesRequest } from '../proto/content-management_pb';

const CategoriesContext = React.createContext({
    categories: [],
    fetchCategories: () => {}
});

const CategoriesContextProvider = props => {
    const [categories, setCategories] = useState([]);

    const { state, methods } = useCourseManagement();

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setCategories(response.getCategoriesList());
        }
    }, [response, error, setCategories]);

    const { getCategories } = methods;
    const fetchCategories = useCallback(() => {
        getCategories(new GetCategoriesRequest());
    }, [getCategories]);

    return (
        <CategoriesContext.Provider value={{ categories, fetchCategories }}>
            {props.children}
        </CategoriesContext.Provider>
    );
};

export { CategoriesContext, CategoriesContextProvider as default };
