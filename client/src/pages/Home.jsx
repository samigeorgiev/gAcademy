import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Card, Header } from 'semantic-ui-react';

import useCourseManagement from '../hooks/courseManagement';

import { GetTopCoursesRequest } from '../proto/content-management_pb';

import courseImage from '../images/tmp/course.png';

const Home = props => {
    const [courses, setCourses] = useState([]);

    const history = useHistory();

    const { state, methods } = useCourseManagement();

    const { getTopCourses } = methods;
    useEffect(() => {
        const request = new GetTopCoursesRequest();
        request.setLimit(4);
        getTopCourses(request);
    }, [getTopCourses]);

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setCourses(response.getCoursesList());
        }
    }, [response, error, setCourses]);

    return (
        <>
            <Header
                content="Top courses"
                textAlign="center"
                as="h1"
                style={{ margin: '3rem', fontSize: '3rem' }}
            />
            <Card.Group
                centered
                items={courses.map(course => ({
                    image: courseImage,
                    header: course.getTitle(),
                    meta: course.getCreator(),
                    description: course.getDescription(),
                    onClick: () => history.push('courses/' + course.getId()),
                    raised: true,
                    style: { margin: '2rem' }
                }))}
            />
        </>
    );
};

export default Home;
