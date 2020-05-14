import React, { useContext, useEffect, useState } from 'react';

import { Button, Container, Item } from 'semantic-ui-react';

import { AuthenticationContext } from '../context/authentication';

import useCourseManagement from '../hooks/courseManagement';

import { GetCreatedCoursesRequest } from '../proto/content-management_pb';

import CourseList from '../components/course/CourseList';
import CreateCourse from '../components/course/CreateCourse';

import courseImage from '../images/tmp/course.png';

const TeacherPanel = props => {
    const [createdCourses, setCreatedCourses] = useState([]);
    const [isCreateCourseShown, setIsCreateCourseShown] = useState(false);

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
                                        icon="plus"
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
                    style={{ marginRight: '1rem' }}
                />
            </Container>
        </>
    );
};

export default TeacherPanel;
