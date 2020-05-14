import React from 'react';

import { Modal } from 'semantic-ui-react';

const LectureEditList = props => {
    return (
        <Modal
            onClose={props.onClose}
            centered={false}
            size="mini"
            open
            closeIcon
        >
            <h1>Modal</h1>
        </Modal>
    );
};

export default LectureEditList;
