import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Card, Header, Loader, Message } from 'semantic-ui-react';

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

    const content = state.isLoading ? (
        <Loader active />
    ) : (
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
    );

    return (
        <>
            <Header
                content="Top courses"
                textAlign="center"
                as="h1"
                style={{ margin: '3rem', fontSize: '3rem' }}
            />
            {state.error ? (
                <Message
                    error
                    header="Error occurred"
                    content={state.error.message}
                    style={{ width: '80%', margin: '0 auto' }}
                />
            ) : (
                content
            )}
        </>
    );
};

export default Home;
