import React, { useContext, useEffect, useState } from 'react';

import { Button, Container, Item } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { AuthenticationContext } from '../context/authentication';

import useEnrollmentManagement from '../hooks/enrollmentManagement';

import { GetEnrolledCoursesRequest } from '../proto/content-management_pb';

import CourseList from '../components/course/CourseList';

import courseImage from '../images/tmp/course.png';

const EnrolledCourses = props => {
    const [courses, setCourses] = useState([]);

    const { user } = useContext(AuthenticationContext);

    const { state, methods } = useEnrollmentManagement();

    const history = useHistory();

    const { getEnrolledCourses } = methods;
    const { token } = user;
    useEffect(() => {
        if (token) {
            getEnrolledCourses(new GetEnrolledCoursesRequest(), token);
        }
    }, [getEnrolledCourses, token]);

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setCourses(response.getEnrolledcoursesList());
        }
    }, [response, error]);

    const playHandler = courseId =>
        history.push(`courses/${courseId}/lectures`);

    return (
        <Container style={{ maxWidth: '80rem', margin: '2rem auto' }}>
            <CourseList
                header="My Courses"
                missingCoursesMessage="You don't have any courses"
                isLoading={state.isLoading}
                error={state.error}
            >
                {courses.map(course => (
                    <Item key={course.getId()} as="li">
                        <Item.Image size="tiny" src={courseImage} />
                        <Item.Content>
                            <Item.Header
                                content={course.getTitle()}
                                onClick={() =>
                                    history.push('/courses/' + course.getId())
                                }
                                as="a"
                            />
                            <Item.Meta content={course.getCreator()} />
                            <Item.Description
                                content={course.getDescription()}
                            />
                            <Item.Extra>
                                <Button
                                    onClick={() => playHandler(course.getId())}
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
