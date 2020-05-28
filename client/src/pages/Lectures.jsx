import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { Header, Loader, Message, Segment } from 'semantic-ui-react';

import useCourseManagement from '../hooks/courseManagement';

import { GetCourseRequest } from '../proto/content-management_pb';

import LectureList from '../components/lecture/LectureList';
import VideoPlayer from '../components/lecture/VideoPlayer';

const Lectures = props => {
    const [course, setCourse] = useState(null);

    const params = useParams();

    const { state, methods } = useCourseManagement();

    const { courseId } = params;
    const { getCourse } = methods;
    useEffect(() => {
        const request = new GetCourseRequest();
        request.setId(courseId);
        getCourse(request);
    }, [courseId, getCourse]);

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setCourse(response.getCourse());
        }
    }, [response, error, setCourse]);

    let content = (
        <>
            <Header
                content={course && course.getTitle()}
                textAlign="center"
                size="huge"
                style={{ marginTop: '2rem' }}
            />
            <VideoPlayer lecture={params.lectureId} />
            <LectureList
                course={params.courseId}
                currentLecture={+params.lectureId}
            />
        </>
    );
    if (state.error) {
        content = (
            <Segment style={{ width: '80%', margin: '1rem auto' }}>
                <Message
                    error
                    header="Error occurred"
                    content={state.error && state.error.message}
                />
            </Segment>
        );
    }

    return state.isLoading ? (
        <Loader inline="centered" active style={{ margin: '1rem auto' }} />
    ) : (
        content
    );
};

export default Lectures;
