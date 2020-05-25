import React from 'react';

import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const Courses = props => {
    const history = useHistory();

    return (
        <Button
            onClick={() => history.push('/enrolled-courses')}
            size="medium"
            content="Courses"
            style={{ color: '#247291', background: 'none' }}
        />
    );
};

export default Courses;
