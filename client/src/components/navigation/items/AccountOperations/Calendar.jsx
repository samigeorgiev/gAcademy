import React from 'react';

import { Button } from 'semantic-ui-react';

const Calendar = props => {
    return (
        <Button
            icon="calendar alternate"
            style={{
                color: '#247291',
                background: 'transparent',
                fontSize: '1.75rem'
            }}
        />
    );
};

export default Calendar;
