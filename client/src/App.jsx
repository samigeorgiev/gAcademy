import React, { useContext, useEffect, Suspense } from 'react';

import { Loader } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import { AuthenticationContext } from './context/authentication';

import Layout from './components/Layout';

const Courses = React.lazy(() => import('./pages/Courses'));
const TeacherPanel = React.lazy(() => import('./pages/TeacherPanel'));

const App = props => {
    const { user, tryLogIn } = useContext(AuthenticationContext);

    useEffect(() => tryLogIn(), [tryLogIn]);

    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <h1>Home Route</h1>
                </Route>
                {user ? (
                    <Route path="/courses" exact>
                        <Suspense fallback={<Loader active />}>
                            <Courses />
                        </Suspense>
                    </Route>
                ) : null}
                {user && user.isTeacher ? (
                    <Route path="/teacher-panel" exact>
                        <Suspense fallback={<Loader active />}>
                            <TeacherPanel />
                        </Suspense>
                    </Route>
                ) : null}
                <Route path="/">
                    <h1>Error 404</h1>
                </Route>
            </Switch>
        </Layout>
    );
};

export default App;
