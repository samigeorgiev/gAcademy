import React from 'react';

import { Form } from 'semantic-ui-react';

const Input = props => {
    let element;
    switch (props.type) {
        case 'input':
            element = (
                <Form.Input
                    onChange={props.onChange}
                    error={props.error}
                    {...props.elementConfig}
                />
            );
            break;
        case 'textarea':
            element = (
                <Form.TextArea
                    onChange={props.onChange}
                    error={props.error}
                    {...props.elementConfig}
                />
            );
            break;
        case 'dropdown':
            element = (
                <Form.Dropdown
                    onChange={props.onChange}
                    error={props.error}
                    multiple
                    search
                    selection
                    {...props.elementConfig}
                />
            );
            break;
        default:
            element = null;
    }

    return element;
};

export default Input;
