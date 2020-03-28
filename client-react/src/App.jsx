import React, { useContext, useEffect } from 'react';

import { AuthContext } from './context/auth';

import Layout from './components/Layout';

const App = props => {
    const { tryLogIn } = useContext(AuthContext);

    useEffect(() => tryLogIn(), [tryLogIn]);

    return (
        <Layout>
            <h1>App</h1>
        </Layout>
    );
};

export default App;
