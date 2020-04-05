import React, { useState } from 'react';

import { Button, Container, Item, Modal } from 'semantic-ui-react';

import CourseList from '../components/CourseList';
import CreateCourse from '../components/CreateCourse';

import courseImage from '../images/tmp/course.png';

const TeacherPanel = props => {
    const [isModalShown, setIsModalShown] = useState(false);

    const courses = [
        {
            id: 1,
            title: 'React',
            description: 'Amazing course'
        }
    ];

    return (
        <>
            <Modal
                open={isModalShown}
                onClose={() => setIsModalShown(false)}
                size="tiny"
                centered={false}
                closeIcon
                closeOnEscape={false}
            >
                <CreateCourse />
            </Modal>
            <Container style={{ maxWidth: '80rem', margin: '2rem auto' }}>
                <CourseList
                    isLoading={false}
                    error={false}
                    header="Created courses"
                    missingCoursesMessage="You haven't created any courses"
                >
                    {courses.map(course => (
                        <Item key={course.id}>
                            <Item.Image size="tiny" src={courseImage} />
                            <Item.Content>
                                <Item.Header content={course.title} />
                                <Item.Description
                                    content={course.description}
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
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </CourseList>
                <Button
                    onClick={() => setIsModalShown(true)}
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
