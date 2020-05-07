import React, { useContext, useEffect, useState } from 'react';

import { Button, Container, Item } from 'semantic-ui-react';

import { AuthenticationContext } from '../context/authentication';

import useEnrollmentManagement from '../hooks/enrollmentManagement';

import { GetEnrolledCoursesRequest } from '../proto/content-management_pb';

import CourseList from '../components/CourseList';

import courseImage from '../images/tmp/course.png';

const EnrolledCourses = props => {
    const [courses, setCourses] = useState([]);

    const { user } = useContext(AuthenticationContext);

    const { state, methods } = useEnrollmentManagement();

    const { getCourses } = methods;
    const token = user && user.token;
    useEffect(() => {
        if (token) {
            getCourses(new GetEnrolledCoursesRequest(), token);
        }
    }, [getCourses, token]);

    const { response } = state;
    useEffect(() => {
        if (response) {
            setCourses(response.getCoursesList());
        }
    }, [response]);

    return (
        <Container style={{ maxWidth: '80rem', margin: '2rem auto' }}>
            <CourseList
                isLoading={state.isLoading}
                error={state.error}
                header="My Courses"
                missingCoursesMessage="You don't have any courses"
            >
                {courses.map(course => (
                    <Item key={course.getId()} as="li">
                        <Item.Image size="tiny" src={courseImage} />
                        <Item.Content>
                            <Item.Header content={course.getTitle()} />
                            <Item.Meta content={course.getCreator()} />
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
            </CourseList>
        </Container>
    );
};

export default EnrolledCourses;
