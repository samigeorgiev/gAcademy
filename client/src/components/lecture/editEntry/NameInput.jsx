import React, { useContext, useState } from 'react';

import { Button, Input, Message } from 'semantic-ui-react';

import { AuthenticationContext } from '../../../context/authentication';

import useResourceManagementControl from '../../../hooks/resourceManagementControl';

import { UpdateLectureNameRequest } from '../../../proto/resource-management-control_pb';

const NameInput = props => {
    const [name, setName] = useState(props.initialName);

    const { user } = useContext(AuthenticationContext);

    const { state, methods } = useResourceManagementControl();

    const { id } = props;
    const { updateLectureName } = methods;
    const { token } = user;
    const submitHandler = () => {
        const request = new UpdateLectureNameRequest();
        request.setId(id);
        request.setNewname(name);
        updateLectureName(request, token);
    };

    return state.error ? (
        <Message error header="Error occurred" content={state.error.message} />
    ) : (
        <>
            <Input
                onChange={event => setName(event.target.value)}
                defaultValue={props.initialName}
                size="huge"
                transparent
                style={{ width: '20.75rem' }}
            />
            <Button
                onClick={submitHandler}
                loading={state.isLoading}
                disabled={name === props.initialName}
                icon="save"
                size="mini"
                color="green"
            />
        </>
    );
};

export default NameInput;
