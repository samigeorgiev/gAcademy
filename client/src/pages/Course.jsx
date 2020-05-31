import React, { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import {
    Button,
    Grid,
    Image,
    Label,
    Message,
    Segment
} from 'semantic-ui-react';

import { AuthenticationContext } from '../context/authentication';

import useCourseManagement from '../hooks/courseManagement';

import { GetCourseRequest } from '../proto/content-management_pb';

import CourseCard from '../components/course/CourseCard';
import EnrollmentConfirmation from '../components/EnrollmentConfirmation';

import courseImage from '../images/tmp/course.png';

const Course = props => {
    const [course, setCourse] = useState(null);
    const [isBuying, setIsBuying] = useState(false);

    const params = useParams();

    const { user } = useContext(AuthenticationContext);

    const { state, methods } = useCourseManagement();

    const { id } = params;
    const { getCourse } = methods;
    useEffect(() => {
        const request = new GetCourseRequest();
        request.setId(id);
        getCourse(request);
    }, [id, getCourse]);

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setCourse(response.getCourse());
        }
    }, [response, error, setCourse]);

    let segmentContent;
    if (course) {
        segmentContent = (
            <Grid columns="equal" stretched style={{ height: '100%' }}>
                <Grid.Row stretched>
                    <Grid.Column width="12">
                        <CourseCard
                            header={course.getTitle()}
                            creator={course.getCreator()}
                            studentsCount={2}
                            lecturesCount={3}
                            description={course.getDescription()}
                        >
                            <Label content={course.getPrice()} icon="euro" />
                            {user ? (
                                <Button
                                    onClick={() => setIsBuying(true)}
                                    content="Buy"
                                    icon="cart"
                                    primary
                                    floated="right"
                                    style={{ background: '#247291' }}
                                />
                            ) : null}
                        </CourseCard>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Image
                            src={courseImage}
                            style={{ flexGrow: '0', margin: 'auto' }}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
    if (state.error) {
        segmentContent = (
            <Message
                error
                header="Error occurred"
                content={state.error.message}
            />
        );
    }

    return (
        <>
            {isBuying ? (
                <EnrollmentConfirmation
                    course={course}
                    onClose={() => setIsBuying(false)}
                />
            ) : null}
            <Segment
                raised
                loading={state.isLoading}
                style={{ width: '80%', margin: '1rem auto' }}
            >
                {segmentContent}
            </Segment>
        </>
    );
};

export default Course;
