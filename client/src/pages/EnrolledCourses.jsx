import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';

import { AuthenticationContext } from '../context/authentication';

import useEnrollmentManagement from '../hooks/enrollmentManagement';

import { GetEnrolledCoursesRequest } from '../proto/content-management_pb';

import CourseEntry from '../components/course/CourseEntry';
import CourseList from '../components/course/CourseList';

import courseImage from '../images/tmp/course.png';

const EnrolledCourses = props => {
    const [courses, setCourses] = useState([]);

    const history = useHistory();

    const { user } = useContext(AuthenticationContext);

    const { state, methods } = useEnrollmentManagement();

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
                    <CourseEntry
                        key={course.getId()}
                        onClick={() =>
                            history.push('/courses/' + course.getId())
                        }
                        header={course.getTitle()}
                        image={courseImage}
                        creator={course.getCreator()}
                        description={course.getDescription()}
                    >
                        <Button
                            onClick={() => playHandler(course.getId())}
                            icon="play"
                            floated="right"
                            color="green"
                        />
                    </CourseEntry>
                ))}
            </CourseList>
        </Container>
    );
};

export default EnrolledCourses;
