import React, { useContext, useEffect, useState } from 'react';

import { Button, Container, Label } from 'semantic-ui-react';

import { AuthenticationContext } from '../context/authentication';

import useCourseManagement from '../hooks/courseManagement';

import {
    DeleteCourseRequest,
    DeleteCourseResponse,
    GetCreatedCoursesRequest,
    GetCreatedCoursesResponse
} from '../proto/content-management_pb';

import CourseEntry from '../components/course/CourseEntry';
import CourseList from '../components/course/CourseList';
import CreateCourse from '../components/course/CreateCourse';
import LectureEditList from '../components/lecture/LectureEditList';

import courseImage from '../images/tmp/course.png';

const TeacherPanel = props => {
    const [createdCourses, setCreatedCourses] = useState([]);
    const [isCreateCourseShown, setIsCreateCourseShown] = useState(false);
    const [selectedCourseLectures, setSelectedCourseLectures] = useState(null);

    const { user } = useContext(AuthenticationContext);
    const { token } = user;

    const { state, methods } = useCourseManagement();
    const { response, error } = state;
    const { getCreatedCourses } = methods;

    useEffect(() => {
        getCreatedCourses(new GetCreatedCoursesRequest(), token);
    }, [getCreatedCourses, token]);

    useEffect(() => {
        if (
            response &&
            response instanceof GetCreatedCoursesResponse &&
            !error
        ) {
            setCreatedCourses(response.getCreatedcoursesList());
        }
    }, [response, error, setCreatedCourses]);

    useEffect(() => {
        if (response && response instanceof DeleteCourseResponse && !error) {
            getCreatedCourses(new GetCreatedCoursesRequest(), token);
        }
    }, [response, error, getCreatedCourses, token]);

    const closeCreatedCourseHandler = isNewCourseCreated => {
        setIsCreateCourseShown(false);
        if (isNewCourseCreated) {
            getCreatedCourses(new GetCreatedCoursesRequest(), token);
        }
    };

    const { deleteCourse } = methods;
    const deleteCourseHandler = courseId => {
        const request = new DeleteCourseRequest();
        request.setId(courseId);
        deleteCourse(request, token);
    };

    return (
        <>
            {selectedCourseLectures ? (
                <LectureEditList
                    course={selectedCourseLectures}
                    onClose={() => setSelectedCourseLectures(null)}
                />
            ) : null}
            {isCreateCourseShown ? (
                <CreateCourse onClose={closeCreatedCourseHandler} />
            ) : null}
            <Container style={{ maxWidth: '80rem', margin: '2rem auto' }}>
                <CourseList
                    header="Created courses"
                    isLoading={state.isLoading}
                    error={state.error}
                    missingCoursesMessage="You haven't created any courses"
                >
                    {createdCourses.map(course => (
                        <CourseEntry
                            key={course.getId()}
                            header={course.getTitle()}
                            image={courseImage}
                            description={course.getDescription()}
                        >
                            <Label content={course.getPrice()} icon="euro" />
                            <Button
                                onClick={() =>
                                    deleteCourseHandler(course.getId())
                                }
                                icon="remove"
                                floated="right"
                                color="red"
                                size="mini"
                                inverted
                            />
                            <Button
                                onClick={() =>
                                    setSelectedCourseLectures(course.getId())
                                }
                                icon="list"
                                floated="right"
                                size="mini"
                            />
                        </CourseEntry>
                    ))}
                </CourseList>
                <Button
                    onClick={() => setIsCreateCourseShown(true)}
                    circular
                    icon="plus"
                    color="green"
                    size="huge"
                    floated="right"
                    style={{ margin: '0 1rem 1rem' }}
                />
            </Container>
        </>
    );
};

export default TeacherPanel;
