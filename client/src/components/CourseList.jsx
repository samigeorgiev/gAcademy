import React from 'react';

import { Button, Header, Item, Segment } from 'semantic-ui-react';

import courseImage from '../images/tmp/course.png';

const CourseList = props => (
    <Segment
        style={{ maxWidth: '80rem', margin: '2rem auto' }}
        loading={props.isLoading}
        placeholder={!props.courses.length}
    >
        {!props.isLoading ? (
            props.courses.length ? (
                <Item.Group divided link as="ul">
                    {props.courses.map(course => (
                        <Item key={course.getId()} as="li">
                            <Item.Image size="tiny" src={courseImage} />
                            <Item.Content>
                                <Item.Header content={course.getTitle()} />
                                <Item.Meta content={'Samuil'} />
                                <Item.Description
                                    content={course.getDescription()}
                                />
                                <Item.Extra>
                                    <Button
                                        icon="play"
                                        floated="right"
                                        color="green"
                                    />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
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
);

export default CourseList;
