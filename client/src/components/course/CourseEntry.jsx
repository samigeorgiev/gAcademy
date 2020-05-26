import React from 'react';

import { Item } from 'semantic-ui-react';

const CourseEntry = props => (
    <Item as="li">
        <Item.Image size="tiny" src={props.image} />
        <Item.Content>
            <Item.Header
                content={props.header}
                onClick={props.onClick}
                as="a"
            />
            <Item.Meta content={props.creator} />
            <Item.Description content={props.description} />
            <Item.Extra content={props.children} />
        </Item.Content>
    </Item>
);

export default CourseEntry;
