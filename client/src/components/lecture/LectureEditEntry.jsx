import React, { useContext, useEffect } from 'react';

import { Button, Input, Item, Message } from 'semantic-ui-react';

import { AuthenticationContext } from '../../context/authentication';

import useResourceManagementControl from '../../hooks/resourceManagementControl';

import { DeleteLectureRequest } from '../../proto/resource-management-control_pb';

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
                <Input
                    defaultValue={props.initialName}
                    transparent
                    size="huge"
                    style={{ width: '20.75rem' }}
                />
                <Button icon="save" size="mini" color="green" disabled={true} />
                <Item.Extra>
                    <Input type="file" size="small" />
                    <Button
                        icon="save"
                        size="mini"
                        color="green"
                        disabled={true}
                    />
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
