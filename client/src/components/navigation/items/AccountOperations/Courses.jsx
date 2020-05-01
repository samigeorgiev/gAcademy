import React from 'react';

import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

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
