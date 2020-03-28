import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: null,
    tryLogIn: () => {},
    logIn: (token, expiresIn) => {},
    logOut: () => {}
});

const AuthContextProvider = props => {
    const [token, setToken] = useState(null);
    const [logOutTimeout, setLogOutTimeout] = useState(null);

    const tryLogIn = () => {
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');
        const expDate = new Date(expiryDate);

        if (!token || expDate.getTime() < new Date().getTime()) {
            return;
        }

        setToken(token);
    };

    const logIn = (token, expiresIn) => {
        const expiryDate = new Date(new Date().getTime() + +expiresIn);
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expiryDate', expiryDate);
        setLogOutTimeout(setTimeout(logOut, +expiresIn));
    };

    const logOut = () => {
        clearTimeout(logOutTimeout);
        setToken(null);
        setLogOutTimeout(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
    };

    return (
        <AuthContext.Provider value={{ token, tryLogIn, logIn, logOut }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider as default };
