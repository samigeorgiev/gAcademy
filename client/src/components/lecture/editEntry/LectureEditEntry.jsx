import React, { useContext, useEffect } from 'react';

import { Button, Item, Message } from 'semantic-ui-react';

import { AuthenticationContext } from '../../../context/authentication';

import useResourceManagementControl from '../../../hooks/resourceManagementControl';

import { DeleteLectureRequest } from '../../../proto/resource-management-control_pb';

import NameInput from './NameInput';
import FileInput from './FileInput';

const LectureEditEntry = props => {
    const { user } = useContext(AuthenticationContext);

    const { state, methods } = useResourceManagementControl();

    const { response, error } = state;
    const { onSuccessfulDelete } = props;
    useEffect(() => {
        if (response && !error) {
            onSuccessfulDelete();
        }
    }, [response, error, onSuccessfulDelete]);

    const { id } = props;
    const { deleteLecture } = methods;
    const { token } = user;
    const deleteHandler = () => {
        const request = new DeleteLectureRequest();
        request.setId(id);
        deleteLecture(request, token);
    };

    return state.error ? (
        <Message error header="Error occurred" content={state.error.message} />
    ) : (
        <Item>
            <Item.Content>
                <NameInput initialName={props.initialName} id={props.id} />
                <Item.Extra>
                    <FileInput id={props.id} />
                    <Button
                        onClick={deleteHandler}
                        loading={state.isLoading}
                        icon="remove"
                        floated="right"
                        color="red"
                        size="mini"
                        inverted
                    />
                    <Button
                        onClick={props.onPlay}
                        icon="play"
                        floated="right"
                        color="green"
                        size="mini"
                        inverted
                    />
                </Item.Extra>
            </Item.Content>
        </Item>
    );
};

export default LectureEditEntry;
