import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './App';
import AuthenticationContextProvider from './context/authentication';
import CategoriesContextProvider from './context/categories';

import * as serviceWorker from './serviceWorker';

import 'semantic-ui-css/semantic.min.css';
import 'video-react/dist/video-react.css';

import './index.css';

const app = (
    <React.StrictMode>
        <BrowserRouter>
            <AuthenticationContextProvider>
                <CategoriesContextProvider>
                    <App />
                </CategoriesContextProvider>
            </AuthenticationContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
