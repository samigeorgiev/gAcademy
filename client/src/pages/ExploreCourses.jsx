import React, { useContext, useEffect, useState } from 'react';

import { Button, Container, Item } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';

import { AuthenticationContext } from '../context/authentication';

import useAccountOperations from '../hooks/accountOperations';
import useContentManagement from '../hooks/contentManagement';

import CourseList from '../components/CourseList';

import { GetCoursesByCategoryRequest } from '../proto/content-management_pb';
import { EnrollCourseRequest } from '../proto/account-operations_pb';

import courseImage from '../images/tmp/course.png';

const Courses = props => {
    const [courses, setCourses] = useState([]);

    const { user } = useContext(AuthenticationContext);

    const {
        methods: { getCoursesByCategory },
        state
    } = useContentManagement();
    const { response } = state;

    const { methods } = useAccountOperations();
    const { enrollCourse } = methods;

    const location = useLocation();

    useEffect(() => {
        const category = new URLSearchParams(location.search).get('category');
        const request = new GetCoursesByCategoryRequest();
        request.setId(category);
        getCoursesByCategory(request);
    }, [getCoursesByCategory, location]);

    useEffect(() => {
        if (response) {
            setCourses(response.getCoursesList());
        }
    }, [response]);

    const enrollHandler = courseId => {
        const request = new EnrollCourseRequest();
        request.setCourseid(courseId);
        enrollCourse(request, user.token);
    };

    return (
        <Container style={{ maxWidth: '80rem', margin: '2rem auto' }}>
            <CourseList
                isLoading={false}
                error={false}
                header="My Courses"
                missingCoursesMessage="You don't have any courses"
            >
                {courses.map(course => (
                    <Item key={course.getId()} as="li">
                        <Item.Image size="tiny" src={courseImage} />
                        <Item.Content>
                            <Item.Header content={course.getTitle()} />
                            <Item.Meta
                                content={course.getTeacher().getName()}
                            />
                            <Item.Description
                                content={course.getDescription()}
                            />
                            {user ? (
                                <Item.Extra>
                                    <Button
                                        onClick={() =>
                                            enrollHandler(course.getId())
                                        }
                                        icon="cart"
                                        floated="right"
                                        color="blue"
                                    />
                                </Item.Extra>
                            ) : null}
                        </Item.Content>
                    </Item>
                ))}
            </CourseList>
        </Container>
    );
};

export default Courses;
