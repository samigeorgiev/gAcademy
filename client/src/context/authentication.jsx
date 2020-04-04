import React, { useCallback, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import useAccountOperations from '../hooks/accountOperations';

import { GetAccountRequest } from '../proto/account-operations_pb';

const AuthenticationContext = React.createContext({
    user: null,
    tryLogIn: () => {},
    logIn: (token, expiresIn) => {},
    logOut: () => {}
});

const AuthenticationContextProvider = props => {
    const [user, setUser] = useState(null);
    const [logOutTimeout, setLogOutTimeout] = useState(null);

    const { methods, state } = useAccountOperations();
    const { response } = state;
    const { getAccount } = methods;

    const history = useHistory();

    useEffect(() => {
        if (response) {
            setUser(user => ({
                token: user.token,
                email: response.getEmail(),
                firstName: response.getFirstname(),
                lastName: response.getLastname(),
                isTeacher: response.getIsteacher()
            }));
        }
    }, [response]);

    const logOut = useCallback(() => {
        clearTimeout(logOutTimeout);
        setUser(null);
        setLogOutTimeout(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        history.push('/');
    }, [setUser, logOutTimeout, setLogOutTimeout, history]);

    const getUserAccount = useCallback(
        token => {
            getAccount(new GetAccountRequest(), token);
        },
        [getAccount]
    );

    const tryLogIn = useCallback(() => {
        if (user) {
            return;
        }
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
    }, [user, setUser, logOut, getUserAccount]);

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

    return (
        <AuthenticationContext.Provider
            value={{ user, tryLogIn, logIn, logOut }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    );
};

export { AuthenticationContext, AuthenticationContextProvider as default };
