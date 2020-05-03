// TODO for refactoring
/* eslint-disable */
import React, { useState } from 'react';

import { Input, Button, Container, Item, Modal } from 'semantic-ui-react';
import tus from 'tus-js-client';

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
                <CreateCourse onClose={() => setIsModalShown(false)} />
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
                                    <Button
                                        icon="plus"
                                        floated="right"
                                        size="mini"
                                    />
                                    <Input
                                        type="file"
                                        onChange={e => {
                                            const file = e.target.files[0];
                                            const endpoint =
                                                process.env
                                                    .REACT_APP_RESOURCE_MANAGEMENT +
                                                '/upload';
                                            // const upload = new tus.Upload(
                                            //     file,
                                            //     {
                                            //         endpoint: endpoint,
                                            //         retryDelays: [
                                            //             0,
                                            //             3000,
                                            //             5000,
                                            //             10000,
                                            //             20000
                                            //         ],
                                            //         metadata: {
                                            //             filename: file.name,
                                            //             filetype: file.type
                                            //         },
                                            //         onError: error =>
                                            //             console.log(error),
                                            //         onProgress: progress =>
                                            //             console.log(progress),
                                            //         onSuccess: () =>
                                            //             console.log('success')
                                            //     }
                                            // );
                                            // upload.start();
                                            const body = new FormData();
                                            body.append('video', file);
                                            fetch(endpoint, {
                                                method: 'POST',
                                                body
                                            }).then(response => {
                                                console.log(response);
                                            });
                                        }}
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
