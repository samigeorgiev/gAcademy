import React from 'react';

import { Container } from 'semantic-ui-react';

import { Player } from 'video-react';

const VideoPlayer = props => {
    return (
        <Container>
            <Player src={props.src} />
        </Container>
    );
};

export default VideoPlayer;
