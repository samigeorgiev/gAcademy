import React from 'react';

import { Header, Item, Segment } from 'semantic-ui-react';

const CourseList = props => {
    let content;
    let isPlaceholderShown = true;
    if (props.children.length) {
        isPlaceholderShown = false;
        content = (
            <Item.Group divided link as="ul">
                {props.children}
            </Item.Group>
        );
    } else {
        content = (
            <Header textAlign="center" content={props.missingCoursesMessage} />
        );
    }
    if (props.error) {
        content = <Header textAlign="center" content="Error occurred" />;
    }

    return (
        <>
            <Header
                content={props.header}
                textAlign="center"
                size="huge"
                style={{ marginTop: '2rem' }}
            />
            <Segment
                loading={props.isLoading}
                placeholder={isPlaceholderShown}
                content={content}
            />
        </>
    );
};

export default CourseList;
