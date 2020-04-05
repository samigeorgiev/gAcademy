import React from 'react';

import { Button, Container, Item } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';

import CourseList from '../components/CourseList';

import courseImage from '../images/tmp/course.png';

const Courses = props => {
    const location = useLocation();
    // console.log(new URLSearchParams(location.search).get('category'));

    const courses = [
        {
            id: 1,
            title: 'React',
            description: 'React'
        }
    ];

    return (
        <Container style={{ maxWidth: '80rem', margin: '2rem auto' }}>
            <CourseList
                isLoading={false}
                error={false}
                header="My Courses"
                missingCoursesMessage="You don't have any courses"
            >
                {courses.map(course => (
                    <Item key={course.id} as="li">
                        <Item.Image size="tiny" src={courseImage} />
                        <Item.Content>
                            <Item.Header content={course.title} />
                            <Item.Meta content={'Samuil'} />
                            <Item.Description content={course.description} />
                            <Item.Extra>
                                <Button
                                    icon="cart"
                                    floated="right"
                                    color="blue"
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </CourseList>
        </Container>
    );
};

export default Courses;
