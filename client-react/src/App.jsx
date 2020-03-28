import React, { useContext } from 'react';

import { Switch, Route } from 'react-router-dom';

import { AuthContext } from './context/auth';

import { Tmp } from './pages';

import Layout from './components/Layout';

const App = props => {
    const { tryLogIn } = useContext(AuthContext);

    tryLogIn();

    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <h1>Home Route</h1>
                </Route>
                <Route path="/tmp" exact>
                    <Tmp />
                </Route>
                <Route path="/">
                    <h1>Error 404</h1>
                </Route>
            </Switch>
        </Layout>
    );
};

export default App;
