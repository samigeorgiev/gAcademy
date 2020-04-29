import React from 'react';

import { Header } from 'semantic-ui-react';

import VideoPlayer from '../components/VideoPlayer';

const Lectures = props => {
    return (
        <>
            <Header
                content="Course title"
                textAlign="center"
                size="huge"
                style={{ marginTop: '2rem' }}
            />
            <VideoPlayer src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        </>
    );
};

export default Lectures;
