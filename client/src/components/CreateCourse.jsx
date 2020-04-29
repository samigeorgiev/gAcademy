// TODO for refactoring after CM
import React, { useState, useEffect } from 'react';

import { Dropdown, Form, Modal } from 'semantic-ui-react';

import useContentManagement from '../hooks/contentManagement';

import {
    GetCategoriesRequest,
    NewCourseRequest
} from '../proto/content-management_pb';

const CreateCourse = props => {
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const {
        methods: { getCategories, newCourse },
        state: { response }
    } = useContentManagement();

    useEffect(() => {
        getCategories(new GetCategoriesRequest());
    }, [getCategories]);

    useEffect(() => {
        if (response && response.getCategoriesList) {
            setCategories(
                response.getCategoriesList().map(category => ({
                    key: category.getId(),
                    value: category.getId(),
                    text: category.getName()
                }))
            );
        }
    }, [response]);

    const submitHandler = event => {
        event.preventDefault();
        const request = new NewCourseRequest();
        request.setTitle(title);
        request.setDescription(description);
        request.setCategoriesidsList(selectedCategories);
        newCourse(request);
        props.onClose();
    };

    return (
        <>
            <Modal.Header content="Create new course" />
            <Modal.Content>
                <Form onSubmit={submitHandler}>
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
