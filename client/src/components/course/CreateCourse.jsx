import React, { useContext, useEffect } from 'react';

import { Modal } from 'semantic-ui-react';

import { AuthenticationContext } from '../../context/authentication';
import { CategoriesContext } from '../../context/categories';

import useCourseManagement from '../../hooks/courseManagement';

import {
    CreatedCourse,
    CreateCourseRequest
} from '../../proto/content-management_pb';

import Form from '../UI/Form';

const CreateCourse = props => {
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
    const submitHandler = inputsValues => {
        const course = new CreatedCourse();
        course.setTitle(inputsValues.title);
        course.setPrice(+inputsValues.price);
        course.setDescription(inputsValues.description);
        course.setCategoriesidsList(inputsValues.categories);

        const request = new CreateCourseRequest();
        request.setCreatedcourse(course);
        createCourse(request, token);
    };

    const inputs = {
        title: {
            type: 'input',
            elementConfig: {
                placeholder: 'Title'
            },
            validate: () => true,
            validationError: 'Invalid title'
        },
        price: {
            type: 'input',
            elementConfig: {
                type: 'number',
                step: '0.01',
                placeholder: 'Price'
            },
            validate: () => true,
            validationError: 'Invalid price'
        },
        description: {
            type: 'textarea',
            elementConfig: {
                placeholder: 'Description'
            },
            validate: () => true,
            validationError: 'Invalid description'
        },
        categories: {
            type: 'dropdown',
            elementConfig: {
                options: allCategories.map(category => ({
                    key: category.getId(),
                    value: category.getId(),
                    text: category.getName()
                })),
                placeholder: 'Categories',
                multiple: true,
                search: true,
                selection: true
            },
            validate: () => true,
            validationError: 'Invalid categories'
        }
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
                    inputs={inputs}
                    onSubmit={submitHandler}
                    error={state.error && state.error.message}
                    isLoading={state.isLoading}
                />
            </Modal.Content>
        </Modal>
    );
};

export default CreateCourse;
