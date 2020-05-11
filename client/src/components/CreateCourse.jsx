// TODO remove instanceof
import React, { useContext, useEffect, useState } from 'react';

import {
    Dimmer,
    Dropdown,
    Form,
    Loader,
    Message,
    Modal
} from 'semantic-ui-react';

import { AuthenticationContext } from '../context/authentication';

import useCourseManagement from '../hooks/courseManagement';

import {
    GetCategoriesRequest,
    GetCategoriesResponse,
    CreatedCourse,
    CreateCourseRequest,
    CreateCourseResponse
} from '../proto/content-management_pb';

const CreateCourse = props => {
    const [allCategories, setAllCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const { user } = useContext(AuthenticationContext);

    const { state, methods } = useCourseManagement();
    const { response, error } = state;

    const { getCategories } = methods;
    useEffect(() => {
        getCategories(new GetCategoriesRequest());
    }, [getCategories]);

    useEffect(() => {
        if (response && response instanceof GetCategoriesResponse && !error) {
            setAllCategories(
                response.getCategoriesList().map(category => ({
                    key: category.getId(),
                    value: category.getId(),
                    text: category.getName()
                }))
            );
        }
    }, [response, error, setAllCategories]);

    const { onClose } = props;
    useEffect(() => {
        if (response && response instanceof CreateCourseResponse && !error) {
            onClose(true);
        }
    }, [response, error, onClose]);

    const { createCourse } = methods;
    const { token } = user;
    const submitHandler = event => {
        event.preventDefault();

        const course = new CreatedCourse();
        course.setTitle(title);
        course.setDescription(description);
        course.setCategoriesidsList(selectedCategories);

        const request = new CreateCourseRequest();
        request.setCreatedcourse(course);
        createCourse(request, token);
    };

    let modalContent = (
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
                    options={allCategories}
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
    );
    if (state.isLoading) {
        modalContent = (
            <Dimmer active>
                <Loader />
            </Dimmer>
        );
    }
    if (state.error) {
        modalContent = (
            <Message
                negative
                header="Error occurred"
                content={state.error.message}
            />
        );
    }

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
            {modalContent}
        </Modal>
    );
};

export default CreateCourse;
