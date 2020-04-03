import React, { useContext, useEffect, useState } from 'react';

import { Button, Header, Item, Segment } from 'semantic-ui-react';

import { AuthenticationContext } from '../context/authentication';

import useAccountOperations from '../hooks/accountOperations';

import { GetCoursesRequest } from '../proto/account-operations_pb';

import courseImage from '../images/tmp/course.png';

const Courses = props => {
    const [courses, setCourses] = useState([]);

    const { user } = useContext(AuthenticationContext);

    const { methods, state } = useAccountOperations();
    const { getCourses } = methods;
    const { isLoading, response, error } = state;

    const token = user && user.token;
    useEffect(() => {
        if (token) {
            getCourses(new GetCoursesRequest(), token);
        }
    }, [getCourses, token]);

    useEffect(() => {
        if (response) {
            setCourses(response.getCoursesList());
        }
    }, [response]);

    return (
        <Segment
            style={{ maxWidth: '80rem', margin: '2rem auto' }}
            loading={isLoading}
            placeholder={!courses.length}
        >
            {!isLoading ? (
                courses.length ? (
                    <Item.Group divided link as="ul">
                        {courses.map(course => (
                            <Item key={course.getId()} as="li">
                                <Item.Image size="tiny" src={courseImage} />
                                <Item.Content>
                                    <Item.Header content={course.getTitle()} />
                                    <Item.Meta content={'Samuil'} />
                                    <Item.Description
                                        content={course.getDescription()}
                                    />
                                    <Item.Extra>
                                        <Button
                                            icon="play"
                                            floated="right"
                                            color="green"
                                        />
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        ))}
                    </Item.Group>
                ) : (
                    <Header
                        textAlign="center"
                        content={
                            error
                                ? 'Error occurred'
                                : 'You have not bought any courses'
                        }
                    />
                )
            ) : null}
        </Segment>
    );
};

export default Courses;
