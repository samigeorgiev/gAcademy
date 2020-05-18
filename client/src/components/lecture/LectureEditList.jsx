import React, { useEffect, useState } from 'react';

import { Button, Item, Modal } from 'semantic-ui-react';

import CreateLecture from './CreateLecture';
import LectureEditEntry from './LectureEditEntry';

const LectureEditList = props => {
    const [lectures, setLectures] = useState([]);
    const [isNewLectureFormShown, setIsNewLectureFormShown] = useState(false);

    useEffect(() => {
        // make grpc request
        setLectures([
            {
                id: 1,
                initialName: 'Introduction'
            },
            {
                id: 2,
                initialName: 'Introduction 3333'
            }
        ]);
    }, [setLectures]);

    return (
        <Modal onClose={props.onClose} centered={false} open closeIcon>
            <Modal.Header content="Lectures" />
            <Modal.Content>
                <Item.Group divided relaxed>
                    {lectures.map(lecture => (
                        <LectureEditEntry
                            key={lecture.id}
                            id={lecture.id}
                            initialName={lecture.initialName}
                        />
                    ))}
                </Item.Group>
            </Modal.Content>
            <Modal.Actions>
                <Button content="Reorder" color="blue" size="large" />
                <Button
                    onClick={() => setIsNewLectureFormShown(true)}
                    content="New"
                    color="green"
                    size="large"
                />
                {isNewLectureFormShown ? (
                    <CreateLecture
                        onClose={() => setIsNewLectureFormShown(false)}
                    />
                ) : null}
            </Modal.Actions>
        </Modal>
    );
};

export default LectureEditList;
