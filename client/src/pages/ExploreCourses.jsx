import React, { useContext, useEffect, useState } from 'react';

import { Button, Container, Item, Label } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';

import { AuthenticationContext } from '../context/authentication';

import useCourseManagement from '../hooks/courseManagement';

import { GetCoursesByCategoryRequest } from '../proto/content-management_pb';

import CourseList from '../components/course/CourseList';
import EnrollmentConfirmation from '../components/EnrollmentConfirmation';

import courseImage from '../images/tmp/course.png';

const Courses = props => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const { user } = useContext(AuthenticationContext);

    const { state, methods } = useCourseManagement();

    const history = useHistory();
    const location = useLocation();

    const { getCoursesByCategory } = methods;
    useEffect(() => {
        const category = new URLSearchParams(location.search).get('category');
        const request = new GetCoursesByCategoryRequest();
        request.setCategoryid(category);
        getCoursesByCategory(request);
    }, [location, getCoursesByCategory]);

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setCourses(response.getCoursesList());
        }
    }, [response, error]);

    return (
        <>
            {selectedCourse ? (
                <EnrollmentConfirmation
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                />
            ) : null}
            <Container style={{ maxWidth: '80rem', margin: '2rem auto' }}>
                <CourseList
                    header="Explore courses"
                    isLoading={state.isLoading}
                    error={state.error}
                    missingCoursesMessage="This category is empty"
                >
                    {courses.map(course => (
                        <Item key={course.getId()} as="li">
                            <Item.Image size="tiny" src={courseImage} />
                            <Item.Content>
                                <Item.Header
                                    content={course.getTitle()}
                                    onClick={() =>
                                        history.push(
                                            '/courses/' + course.getId()
                                        )
                                    }
                                    as="a"
                                />
                                <Item.Meta content={course.getCreator()} />
                                <Item.Description
                                    content={course.getDescription()}
                                />
                                <Item.Extra>
                                    <Label
                                        content={course.getPrice()}
                                        icon="euro"
                                    />
                                    {user ? (
                                        <Button
                                            onClick={() =>
                                                setSelectedCourse(course)
                                            }
                                            icon="cart"
                                            floated="right"
                                            color="blue"
                                        />
                                    ) : null}
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </CourseList>
            </Container>
        </>
    );
};

export default Courses;
