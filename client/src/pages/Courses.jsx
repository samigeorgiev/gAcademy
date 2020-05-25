import React, { useContext, useEffect, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { Button, Container, Label } from 'semantic-ui-react';

import { AuthenticationContext } from '../context/authentication';
import { CategoriesContext } from '../context/categories';

import useCourseManagement from '../hooks/courseManagement';

import { GetCoursesByCategoryRequest } from '../proto/content-management_pb';

import CourseList from '../components/course/CourseList';
import CourseEntry from '../components/course/CourseEntry';
import EnrollmentConfirmation from '../components/EnrollmentConfirmation';

import courseImage from '../images/tmp/course.png';

const Courses = props => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const history = useHistory();
    const location = useLocation();

    const { user } = useContext(AuthenticationContext);
    const { categories } = useContext(CategoriesContext);

    const { state, methods } = useCourseManagement();

    const categoryId = new URLSearchParams(location.search).get('category');

    const { getCoursesByCategory } = methods;
    useEffect(() => {
        const request = new GetCoursesByCategoryRequest();
        request.setCategoryid(categoryId);
        getCoursesByCategory(request);
    }, [categoryId, getCoursesByCategory]);

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setCourses(response.getCoursesList());
        }
    }, [response, error]);

    const categoryName = categories
        .filter(category => category.getId() === +categoryId)[0]
        .getName();

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
                    header={categoryName + ' courses'}
                    isLoading={state.isLoading}
                    error={state.error}
                    missingCoursesMessage="This category is empty"
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
                            <Label content={course.getPrice()} icon="euro" />
                            {user ? (
                                <Button
                                    onClick={() => setSelectedCourse(course)}
                                    icon="cart"
                                    floated="right"
                                    color="blue"
                                />
                            ) : null}
                        </CourseEntry>
                    ))}
                </CourseList>
            </Container>
        </>
    );
};

export default Courses;
