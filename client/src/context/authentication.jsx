import React, { useCallback, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import useAccountManagement from '../hooks/accountManagement';

import { GetAccountRequest } from '../proto/content-management_pb';

const AuthenticationContext = React.createContext({
    user: null,
    tryLogIn: () => {},
    logIn: (token, expiresIn) => {},
    logOut: () => {},
    becomeTeacher: () => {}
});

const AuthenticationContextProvider = props => {
    const [user, setUser] = useState(null);
    const [logOutTimeout, setLogOutTimeout] = useState(null);

    const history = useHistory();

    const { state, methods } = useAccountManagement();

    const { response, error } = state;
    useEffect(() => {
        if (response && !error) {
            setUser(user => ({
                token: user.token,
                email: response.getEmail(),
                firstName: response.getFirstname(),
                lastName: response.getLastname(),
                isTeacher: response.getIsteacher()
            }));
        }
    }, [response, error]);

    const logOut = useCallback(() => {
        clearTimeout(logOutTimeout);
        setUser(null);
        setLogOutTimeout(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        history.push('/');
    }, [setUser, logOutTimeout, setLogOutTimeout, history]);

    const { getAccount } = methods;
    const getUserAccount = useCallback(
        token => {
            getAccount(new GetAccountRequest(), token);
        },
        [getAccount]
    );

    const tryLogIn = useCallback(() => {
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');
        const expDate = new Date(expiryDate);

        if (!token || expDate.getTime() < new Date().getTime()) {
            return;
        }

        setUser({ token });
        setLogOutTimeout(
            setTimeout(logOut, expDate.getTime() - new Date().getTime())
        );
        getUserAccount(token);
    }, [setUser, logOut, getUserAccount]);

    const logIn = useCallback(
        (token, expiresIn) => {
            const expiryDate = new Date(new Date().getTime() + +expiresIn);
            localStorage.setItem('token', token);
            localStorage.setItem('expiryDate', expiryDate);
            setUser({ token });
            setLogOutTimeout(setTimeout(logOut, +expiresIn));
            getUserAccount(token);
        },
        [setUser, setLogOutTimeout, logOut, getUserAccount]
    );

    const becomeTeacher = useCallback(
        () => setUser(user => ({ ...user, isTeacher: true })),
        [setUser]
    );

    return (
        <AuthenticationContext.Provider
            value={{ user, tryLogIn, logIn, logOut, becomeTeacher }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    );
};

export { AuthenticationContext, AuthenticationContextProvider as default };
