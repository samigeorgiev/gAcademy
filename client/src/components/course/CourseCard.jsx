import React from 'react';

import { Card, Statistic } from 'semantic-ui-react';

const CourseCard = props => (
    <Card fluid>
        <Card.Content>
            <Card.Header
                content={props.header}
                textAlign="center"
                style={{ margin: '1rem 0' }}
            />
            <Card.Meta textAlign="center">
                By {props.creator}
                <Statistic.Group widths="2" size="mini">
                    <Statistic>
                        <Statistic.Value content={props.studentsCount + ''} />
                        <Statistic.Label content="Students" />
                    </Statistic>
                    <Statistic>
                        <Statistic.Value content={props.lecturesCount + ''} />
                        <Statistic.Label content="Lectures" />
                    </Statistic>
                </Statistic.Group>
            </Card.Meta>
            <Card.Description
                content={props.description}
                style={{ padding: '1rem' }}
            />
        </Card.Content>
        <Card.Content extra content={props.children} />
    </Card>
);

export default CourseCard;
