// TODO add error handling
import React, { useContext, useEffect, useState } from 'react';

import { Button, Container, Item, Modal } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';

import { AuthenticationContext } from '../context/authentication';

import useAccountOperations from '../hooks/accountOperations';
import useContentManagement from '../hooks/contentManagement';
import usePayment from '../hooks/payment';

import { EnrollCourseRequest } from '../proto/account-operations_pb';
import { GetCoursesByCategoryRequest } from '../proto/content-management_pb';
import { StartPaymentRequest } from '../proto/payment_pb';

import ConfirmationModalBody from '../components/ConfirmationModalBody';
import CourseList from '../components/CourseList';

import courseImage from '../images/tmp/course.png';

const Courses = props => {
    const [courses, setCourses] = useState([]);
    const [isModalShown, setIsModalShown] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const { user } = useContext(AuthenticationContext);

    const {
        state: contentManagementState,
        methods: contentManagementMethods
    } = useContentManagement();

    const {
        state: accountOperationsState,
        methods: accountOperationsMethods
    } = useAccountOperations();

    const { state: paymentState, methods: paymentMethods } = usePayment();

    const location = useLocation();
    const history = useHistory();

    const { getCoursesByCategory } = contentManagementMethods;
    useEffect(() => {
        const category = new URLSearchParams(location.search).get('category');
        const request = new GetCoursesByCategoryRequest();
        request.setId(category);
        getCoursesByCategory(request);
    }, [getCoursesByCategory, location]);

    const { response: contentManagementResponse } = contentManagementState;
    useEffect(() => {
        if (contentManagementResponse) {
            setCourses(contentManagementResponse.getCoursesList());
        }
    }, [contentManagementResponse]);

    const { response: accountOperationsResponse } = accountOperationsState;
    const { startPayment } = paymentMethods;
    useEffect(() => {
        if (accountOperationsResponse) {
            const request = new StartPaymentRequest();
            request.setEnrollmentid(
                accountOperationsResponse.getEnrollmentid()
            );
            request.setReturnurl(window.location.origin + '/execute-payment');
            request.setCancelurl(window.location.href);
            startPayment(request);
        }
    }, [accountOperationsResponse, startPayment]);

    const { response: paymentResponse } = paymentState;
    useEffect(() => {
        if (paymentResponse) {
            window.location.href = paymentResponse.getRedirecturl();
        }
    }, [paymentResponse, history]);

    const { enrollCourse } = accountOperationsMethods;
    const enrollHandler = () => {
        const request = new EnrollCourseRequest();
        request.setCourseid(selectedCourse.getId());
        enrollCourse(request, user.token);
    };

    let modalContent = (
        <>
            Are you sure you want to proceed buying{' '}
            <span style={{ fontWeight: 'bold' }}>
                {selectedCourse && selectedCourse.getTitle()}
            </span>
            ?
        </>
    );
    if (accountOperationsState.error) {
        modalContent = 'Error occurred';
    }

    return (
        <>
            <Modal
                open={isModalShown}
                onClose={() => setIsModalShown(false)}
                size="tiny"
                centered={false}
                closeIcon
            >
                <ConfirmationModalBody
                    title="Buy a course"
                    isLoading={
                        accountOperationsState.isLoading ||
                        paymentState.isLoading
                    }
                    onClose={() => setIsModalShown(false)}
                    onConfirm={enrollHandler}
                >
                    {modalContent}
                </ConfirmationModalBody>
            </Modal>
            <Container style={{ maxWidth: '80rem', margin: '2rem auto' }}>
                <CourseList
                    isLoading={false}
                    error={false}
                    header="Courses"
                    missingCoursesMessage="You don't have any courses"
                >
                    {courses.map(course => (
                        <Item key={course.getId()} as="li">
                            <Item.Image size="tiny" src={courseImage} />
                            <Item.Content>
                                <Item.Header content={course.getTitle()} />
                                <Item.Meta
                                    content={course.getTeacher().getName()}
                                />
                                <Item.Description
                                    content={course.getDescription()}
                                />
                                {user ? (
                                    <Item.Extra>
                                        <Button
                                            onClick={() => {
                                                setIsModalShown(true);
                                                setSelectedCourse(course);
                                            }}
                                            icon="cart"
                                            floated="right"
                                            color="blue"
                                        />
                                    </Item.Extra>
                                ) : null}
                            </Item.Content>
                        </Item>
                    ))}
                </CourseList>
            </Container>
        </>
    );
};

export default Courses;
