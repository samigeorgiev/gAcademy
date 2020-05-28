import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { List, Message, Segment } from 'semantic-ui-react';

import useResourceManagementControl from '../../hooks/resourceManagementControl';

import {
    GetAllLecturesRequest as GetLecturesRequest //
} from '../../proto/resource-management-control_pb';

const LectureList = props => {
    const [lectures, setLectures] = useState([]);

    const history = useHistory();

    const { state, methods } = useResourceManagementControl();

    const { course } = props;
    const { getLectures } = methods;
    useEffect(() => {
        const request = new GetLecturesRequest();
        request.setCourseid(course);
        getLectures(request);
    }, [course, getLectures]);

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setLectures(response.getLecturesList());
        }
    }, [response, error, setLectures]);

    const lectureClickHandler = id =>
        history.push(`/courses/${props.course}/lectures/${id}`);

    return (
        <Segment
            loading={state.isLoading}
            raised
            style={{
                width: '90%',
                margin: '1rem auto',
                textAlign: 'center'
            }}
        >
            {state.error ? (
                <Message
                    error
                    header="Error occurred"
                    content={state.error.message}
                />
            ) : (
                <List divided relaxed size="big">
                    {lectures.map(lecture => (
                        <List.Item key={lecture.getId()}>
                            <List.Icon
                                name="angle right"
                                inverted={
                                    lecture.getId() !== props.currentLecture
                                }
                            />
                            <List.Content>
                                <List.Header
                                    content={lecture.getName()}
                                    onClick={() =>
                                        lectureClickHandler(lecture.getId())
                                    }
                                    as="a"
                                    style={{ color: '#2185d0' }}
                                />
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            )}
        </Segment>
    );
};

export default LectureList;
