import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { Header, List, Loader, Message, Segment } from 'semantic-ui-react';

import useCourseManagement from '../hooks/courseManagement';

import { GetCourseRequest } from '../proto/content-management_pb';

import VideoPlayer from '../components/lecture/VideoPlayer';

const Lectures = props => {
    const [course, setCourse] = useState(null);
    const [allLectures, setAllLectures] = useState([]);

    const params = useParams();

    const {
        state: courseManagementState,
        methods: courseManagementMethods
    } = useCourseManagement();

    const { courseId } = params;
    const { getCourse } = courseManagementMethods;
    useEffect(() => {
        const request = new GetCourseRequest();
        request.setId(courseId);
        getCourse(request);
    }, [courseId, getCourse]);

    const {
        response: courseManagementResponse,
        error: courseManagementError
    } = courseManagementState;
    useEffect(() => {
        if (courseManagementResponse && !courseManagementError) {
            setCourse(courseManagementResponse.getCourse());
        }
    }, [courseManagementResponse, courseManagementError, setCourse]);

    useEffect(() => {
        setAllLectures([
            {
                id: 1,
                name: 'Lecture 1'
            },
            {
                id: 2,
                name: 'lecture 2'
            }
        ]);
    }, [setAllLectures]);

    const error = courseManagementState.error;

    return error ? (
        <Segment style={{ width: '80%', margin: '1rem auto' }}>
            <Message
                error
                header="Error occurred"
                content={error && error.message}
            />
        </Segment>
    ) : (
        <>
            {courseManagementState.isLoading ? (
                <Loader
                    inline="centered"
                    active
                    style={{ margin: '1rem auto' }}
                />
            ) : (
                <Header
                    content={course && course.getTitle()}
                    textAlign="center"
                    size="huge"
                    style={{ marginTop: '2rem' }}
                />
            )}
            <VideoPlayer src="http://localhost:8100/download/1" />
            <Segment
                raised
                style={{
                    width: '90%',
                    margin: '1rem auto',
                    textAlign: 'center'
                }}
            >
                <List divided relaxed size="big">
                    {allLectures.map(lecture => (
                        <List.Item key={lecture.id}>
                            <List.Icon
                                name="angle right"
                                inverted={lecture.id !== +params.lectureId}
                            />
                            <List.Content>
                                <List.Header
                                    content={lecture.name}
                                    onClick={(e, d) => console.log(e, d)}
                                    as="a"
                                    style={{ color: '#2185d0' }}
                                />
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </Segment>
        </>
    );
};

export default Lectures;
