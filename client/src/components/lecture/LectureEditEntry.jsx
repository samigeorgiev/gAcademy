import React, { useState } from 'react';

import { Button, Input, Item } from 'semantic-ui-react';

const LectureEditEntry = props => {
    const [name, setName] = useState(props.initialName);
    const [newResource, setNewResource] = useState(null);

    const nameUpdateHandler = () => {
        console.log(name);
        // grpc request fro save
    };

    const newResourceSaveHandler = () => {
        console.log(newResource);
        // tus requet
    };

    const deleteHandler = () => {
        console.log(props.id);
        // grpc req for delete
    };

    return (
        <Item>
            <Item.Content>
                <Input
                    onChange={event => setName(event.target.value)}
                    defaultValue={props.initialName}
                    transparent
                    size="huge"
                />
                <Button
                    onClick={nameUpdateHandler}
                    icon="save"
                    size="mini"
                    color="green"
                    disabled={props.initialName === name}
                />
                <Item.Extra>
                    <Input
                        type="file"
                        onChange={event =>
                            setNewResource(event.target.files[0])
                        }
                        size="small"
                    />
                    <Button
                        onClick={newResourceSaveHandler}
                        icon="save"
                        size="mini"
                        color="green"
                        disabled={!newResource}
                    />
                    <Button
                        onClick={deleteHandler}
                        icon="remove"
                        floated="right"
                        color="red"
                        size="mini"
                        inverted
                    />
                    <Button
                        onClick={() => {}}
                        icon="play"
                        floated="right"
                        color="green"
                        size="mini"
                        inverted
                    />
                </Item.Extra>
            </Item.Content>
        </Item>
    );
};

export default LectureEditEntry;
