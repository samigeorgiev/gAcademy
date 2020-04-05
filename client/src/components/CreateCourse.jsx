import React, { useState } from 'react';

import { Dropdown, Form, Modal } from 'semantic-ui-react';

const CreateCourse = props => {
    const categories = [
        { key: 1, text: 'CSS', value: 'CSS' },
        { key: 2, text: 'JS', value: 'JS' },
        { key: 3, text: 'JAVA', value: 'JAVA' }
    ];

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    return (
        <>
            <Modal.Header content="Create new course" />
            <Modal.Content>
                <Form>
                    <Form.Input
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        fluid
                        placeholder="Title"
                    />
                    <Form.TextArea
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                        placeholder="Description"
                    />
                    <Dropdown
                        value={selectedCategories}
                        onChange={(event, data) =>
                            setSelectedCategories(data.value)
                        }
                        options={categories}
                        multiple
                        search
                        selection
                        placeholder="Categories"
                        fluid
                    />
                    <Form.Button
                        primary
                        fluid
                        content="Submit"
                        style={{ marginTop: '1rem', background: '#247291' }}
                    />
                </Form>
            </Modal.Content>
        </>
    );
};

export default CreateCourse;
