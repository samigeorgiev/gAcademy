import React, { useState } from 'react';

import { Button, Container, Modal } from 'semantic-ui-react';

import CourseList from '../components/CourseList';

const TeacherPanel = props => {
    const [isModalShown, setIsModalShown] = useState(false);

    const courses = [];

    return (
        <>
            <Modal
                open={isModalShown}
                onClose={() => setIsModalShown(false)}
                centered={false}
                closeIcon
            >
                <Modal.Header content="Create new course" />
                <Modal.Content>Creating course...</Modal.Content>
            </Modal>
            <Container style={{ maxWidth: '80rem', margin: '2rem auto' }}>
                <CourseList
                    isLoading={false}
                    error={false}
                    header="Created courses"
                    missingCoursesMessage="You haven't created any courses"
                >
                    {courses}
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
