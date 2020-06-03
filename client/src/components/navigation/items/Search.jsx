import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Search, Responsive } from 'semantic-ui-react';

import useCourseManagement from '../../../hooks/courseManagement';

import { GetCoursesByPatternRequest } from '../../../proto/content-management_pb';

const Search_ = props => {
    const [courses, setCourses] = useState([]);
    const [value, setValue] = useState('');

    const history = useHistory();

    const { state, methods } = useCourseManagement();

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setCourses(
                response.getCoursesList().map(course => ({
                    id: course.getId(),
                    title: course.getTitle(),
                    description: course.getDescription(),
                    price: '€ ' + course.getPrice()
                }))
            );
        }
    }, [response, error, setCourses]);

    const { getCoursesByPattern } = methods;
    const changeHandler = (event, data) => {
        setValue(data.value);
        const request = new GetCoursesByPatternRequest();
        request.setPattern(data.value);
        getCoursesByPattern(request);
    };

    const selectHandler = (event, data) =>
        history.push('/courses/' + data.result.id);

    const searchProps = {
        loading: state.isLoading,
        onResultSelect: selectHandler,
        onSearchChange: changeHandler,
        results: courses,
        value: value,
        placeholder: 'Search for anything'
    };

    return (
        <>
            <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
                <Search {...searchProps} size="big" />
            </Responsive>
            <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
                <Search {...searchProps} size="tiny" />
            </Responsive>
        </>
    );
};

export default Search_;
