import React, { useContext, useEffect, useState } from 'react';

import { Header } from 'semantic-ui-react';

import { AuthenticationContext } from '../context/authentication';

import useAccountOperations from '../hooks/accountOperations';

import { GetCoursesRequest } from '../proto/account-operations_pb';

import CourseList from '../components/CourseList';

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
        <>
            <Header
                content="My Courses"
                textAlign="center"
                size="huge"
                style={{ marginTop: '2rem' }}
            />
            <CourseList
                courses={courses}
                isLoading={isLoading}
                error={error}
                missingCoursesMessage="You don't have any courses"
            />
        </>
    );
};

export default Courses;
