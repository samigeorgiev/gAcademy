import React, { useContext } from 'react';

import { AuthContext } from '../../context/auth';

import Button from '../UI/Button';

import { BecomeTeacherRequest } from '../../proto/account-operations_pb';
import { AccountOperationsClient } from '../../proto/account-operations_grpc_web_pb';

import styles from './index.module.css';

const BecomeTeacher = props => {
    const { token } = useContext(AuthContext);

    const becomeTeacherHandler = () => {
        const accountOperationsClient = new AccountOperationsClient(
            process.env.REACT_APP_ACCOUNT_OPERATIONS
        );
        const request = new BecomeTeacherRequest();
        accountOperationsClient.becomeTeacher(
            request,
            { Authorization: token },
            (err, res) => {
                console.log(err, res);
            }
        );
    };

    return (
        <div className={styles.BecomeTeacher}>
            <p>Are you sure you want to become teacher?</p>
            <div className={styles.ButtonsContainer}>
                <Button onClick={becomeTeacherHandler} filled>
                    Confirm
                </Button>
                <Button onClick={props.onClose}>Close</Button>
            </div>
        </div>
    );
};
export default BecomeTeacher;
