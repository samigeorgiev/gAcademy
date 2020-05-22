// TODO remove instanceof
import React, { useContext, useEffect, useState } from 'react';

import { Dropdown, Form, Message, Modal } from 'semantic-ui-react';

import { AuthenticationContext } from '../../context/authentication';
import { CategoriesContext } from '../../context/categories';

import useCourseManagement from '../../hooks/courseManagement';

import {
    CreatedCourse,
    CreateCourseRequest
} from '../../proto/content-management_pb';

const CreateCourse = props => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const { user } = useContext(AuthenticationContext);
    const { categories: allCategories } = useContext(CategoriesContext);

    const { state, methods } = useCourseManagement();

    const { response, error } = state;
    const { onClose } = props;
    useEffect(() => {
        if (response && !error) {
            onClose(true);
        }
    }, [response, error, onClose]);

    const { createCourse } = methods;
    const { token } = user;
    const submitHandler = event => {
        event.preventDefault();

        const course = new CreatedCourse();
        course.setTitle(title);
        course.setPrice(+price);
        course.setDescription(description);
        course.setCategoriesidsList(selectedCategories);

        const request = new CreateCourseRequest();
        request.setCreatedcourse(course);
        createCourse(request, token);
    };

    return (
        <Modal
            onClose={() => props.onClose(false)}
            centered={false}
            size="mini"
            closeOnEscape={false}
            open
            closeIcon
        >
            <Modal.Header content="Create new course" />
            <Modal.Content>
                <Form
                    onSubmit={submitHandler}
                    loading={state.isLoading}
                    error={state.error !== null}
                >
                    <Message
                        error
                        header="Error occurred"
                        content={state.error && state.error.message}
                    />
                    <Form.Input
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        placeholder="Title"
                        fluid
                    />
                    <Form.Input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={event => setPrice(event.target.value)}
                        placeholder="Price"
                        fluid
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
                        options={allCategories.map(category => ({
                            key: category.getId(),
                            value: category.getId(),
                            text: category.getName()
                        }))}
                        placeholder="Categories"
                        multiple
                        search
                        selection
                        fluid
                    />
                    <Form.Button
                        content="Submit"
                        primary
                        fluid
                        style={{ marginTop: '1rem', background: '#247291' }}
                    />
                </Form>
            </Modal.Content>
        </Modal>
    );
};

export default CreateCourse;
