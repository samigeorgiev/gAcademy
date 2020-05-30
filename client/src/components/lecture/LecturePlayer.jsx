import React, { useContext, useEffect, useState } from 'react';

import { Container } from 'semantic-ui-react';
import { Player } from 'video-react';

import { AuthenticationContext } from '../../context/authentication';

import useResourceManagementControl from '../../hooks/resourceManagementControl';

import { GetLectureRequest as GetResourceRequest } from '../../proto/resource-management-control_pb';

const LecturePlayer = props => {
    const [resourceUrl, setResourceUrl] = useState(null);

    const { user } = useContext(AuthenticationContext);

    const { state, methods } = useResourceManagementControl();

    const { lecture } = props;
    const { getResource } = methods;
    const { token } = user;
    useEffect(() => {
        const request = new GetResourceRequest();
        request.setId(lecture);
        getResource(request, token);
    }, [lecture, getResource, token]);

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setResourceUrl(response.getUrl());
        }
    }, [response, error, setResourceUrl]);

    return (
        <Container>
            <Player src={resourceUrl} />
        </Container>
    );
};

export default LecturePlayer;
