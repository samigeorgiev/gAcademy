import React, { useContext, useEffect, useState } from 'react';

import { Button, Container, Item, Label } from 'semantic-ui-react';

import { AuthenticationContext } from '../context/authentication';

import useCourseManagement from '../hooks/courseManagement';

import { GetCreatedCoursesRequest } from '../proto/content-management_pb';

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
    const { getCreatedCourses } = methods;

    useEffect(() => {
        getCreatedCourses(new GetCreatedCoursesRequest(), token);
    }, [getCreatedCourses, token]);

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setCreatedCourses(response.getCreatedcoursesList());
        }
    }, [response, error, setCreatedCourses]);

    const closeCreatedCourseHandler = isNewCourseCreated => {
        setIsCreateCourseShown(false);
        if (isNewCourseCreated) {
            getCreatedCourses(new GetCreatedCoursesRequest(), token);
        }
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
                        <Item key={course.getId()} as="li">
                            <Item.Image size="tiny" src={courseImage} />
                            <Item.Content>
                                <Item.Header content={course.getTitle()} />
                                <Item.Description
                                    content={course.getDescription()}
                                />
                                <Item.Extra>
                                    <Label
                                        content={course.getPrice()}
                                        icon="euro"
                                    />
                                    <Button
                                        icon="remove"
                                        floated="right"
                                        color="red"
                                        size="mini"
                                        inverted
                                    />
                                    <Button
                                        icon="pencil"
                                        floated="right"
                                        size="mini"
                                        color="grey"
                                    />
                                    <Button
                                        onClick={() =>
                                            setSelectedCourseLectures(
                                                course.getId()
                                            )
                                        }
                                        icon="list"
                                        floated="right"
                                        size="mini"
                                    />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
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
