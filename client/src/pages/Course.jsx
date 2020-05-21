import React, { useContext, useEffect, useState } from 'react';

import {
    Button,
    Card,
    Grid,
    Image,
    Label,
    Message,
    Segment,
    Statistic
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import { AuthenticationContext } from '../context/authentication';

import useCourseManagement from '../hooks/courseManagement';

import { GetCourseRequest } from '../proto/content-management_pb';

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
                        <Card fluid>
                            <Card.Content>
                                <Card.Header
                                    content={course.getTitle()}
                                    textAlign="center"
                                    style={{ margin: '1rem 0' }}
                                />
                                <Card.Meta textAlign="center">
                                    By {course.getCreator()}
                                    <Statistic.Group widths="2" size="mini">
                                        <Statistic>
                                            <Statistic.Value content="122" />
                                            <Statistic.Label
                                                content="Students" //
                                            />
                                        </Statistic>
                                        <Statistic>
                                            <Statistic.Value content="12" />
                                            <Statistic.Label
                                                content="Lectures" //
                                            />
                                        </Statistic>
                                    </Statistic.Group>
                                </Card.Meta>
                                <Card.Description
                                    content={course.getDescription()}
                                    style={{ padding: '1rem' }}
                                />
                            </Card.Content>
                            <Card.Content extra>
                                <Label
                                    content={course.getPrice()}
                                    icon="euro"
                                />
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
                            </Card.Content>
                        </Card>
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
