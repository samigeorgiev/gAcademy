import React, { useCallback, useEffect, useState } from 'react';

import {
    Button,
    Dimmer,
    Item,
    Loader,
    Message,
    Modal
} from 'semantic-ui-react';

import useResourceManagementControl from '../../hooks/resourceManagementControl';

import {
    GetAllLecturesRequest as GetLecturesRequest //
} from '../../proto/resource-management-control_pb';

import CreateLecture from './CreateLecture';
import LectureEditEntry from './editEntry/LectureEditEntry';
import LecturePlayer from './LecturePlayer';

const LectureEditList = props => {
    const [lectures, setLectures] = useState([]);
    const [isNewLectureFormShown, setIsNewLectureFormShown] = useState(false);
    const [playedLecture, setPlayedLecture] = useState(null);

    const { state, methods } = useResourceManagementControl();

    const { course } = props;
    const { getLectures } = methods;
    const fetchLectures = useCallback(() => {
        const request = new GetLecturesRequest();
        request.setCourseid(course);
        getLectures(request);
    }, [course, getLectures]);

    useEffect(() => {
        fetchLectures();
    }, [fetchLectures]);

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setLectures(response.getLecturesList());
        }
    }, [response, error, setLectures]);

    const closeCreateLectureHandler = isNewLectureCreated => {
        setIsNewLectureFormShown(false);
        if (isNewLectureCreated) {
            fetchLectures();
        }
    };

    let modalContent = lectures.length ? (
        <Item.Group divided relaxed>
            {lectures.map(lecture => (
                <LectureEditEntry
                    key={lecture.getId()}
                    id={lecture.getId()}
                    onPlay={() => setPlayedLecture(lecture.getId())}
                    onSuccessfulDelete={() => fetchLectures()}
                    initialName={lecture.getName()}
                />
            ))}
        </Item.Group>
    ) : (
        <Message header="You haven't created any lectures" />
    );
    if (state.error) {
        modalContent = (
            <Message
                error
                header="Error occurred"
                content={state.error.message}
            />
        );
    }
    if (state.isLoading) {
        modalContent = (
            <Dimmer active>
                <Loader />
            </Dimmer>
        );
    }

    return (
        <Modal onClose={props.onClose} centered={false} open closeIcon>
            {isNewLectureFormShown ? (
                <CreateLecture
                    course={props.course}
                    onClose={closeCreateLectureHandler}
                />
            ) : null}
            {playedLecture ? (
                <Modal
                    onClose={() => setPlayedLecture(null)}
                    centered={false}
                    open
                    closeIcon
                >
                    <LecturePlayer lecture={playedLecture} />
                </Modal>
            ) : null}
            <Modal.Header content="Lectures" />
            <Modal.Content content={modalContent} />
            <Modal.Actions>
                {/* <Button content="Reorder" color="blue" size="large" /> */}
                <Button
                    onClick={() => setIsNewLectureFormShown(true)}
                    content="New"
                    color="green"
                    size="large"
                />
            </Modal.Actions>
        </Modal>
    );
};

export default LectureEditList;
