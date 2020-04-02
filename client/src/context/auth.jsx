import React, { useCallback, useEffect, useState } from 'react';

import useAccountOperations from '../hooks/accountOperations';

import { GetAccountRequest } from '../proto/account-operations_pb';

const AuthContext = React.createContext({
    user: null,
    tryLogIn: () => {},
    logIn: (token, expiresIn) => {},
    logOut: () => {}
});

const AuthContextProvider = props => {
    const [user, setUser] = useState(null);
    const [logOutTimeout, setLogOutTimeout] = useState(null);

    const { methods, state } = useAccountOperations();
    const { response, error } = state;
    const { getAccount } = methods;

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
    }, [setUser, logOutTimeout, setLogOutTimeout]);

    const getUserAccount = useCallback(
        token => {
            const request = new GetAccountRequest();
            getAccount(request, { Authorization: token });
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
        getUserAccount(token);
    }, [setUser]);

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
        <AuthContext.Provider value={{ user, tryLogIn, logIn, logOut }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider as default };
