import React from 'react';

import { Header, Item, Segment } from 'semantic-ui-react';

const CourseList = props => (
    <>
        <Header
            content={props.header}
            textAlign="center"
            size="huge"
            style={{ marginTop: '2rem' }}
        />
        <Segment loading={props.isLoading} placeholder={!props.children.length}>
            {!props.isLoading ? (
                props.children.length ? (
                    <Item.Group divided link as="ul">
                        {props.children}
                    </Item.Group>
                ) : (
                    <Header
                        textAlign="center"
                        content={
                            props.error
                                ? 'Error occurred'
                                : props.missingCoursesMessage
                        }
                    />
                )
            ) : null}
        </Segment>
    </>
);

export default CourseList;
