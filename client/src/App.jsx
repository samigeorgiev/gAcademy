import React, { useContext, useEffect, Suspense } from 'react';

import { Loader } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import { AuthenticationContext } from './context/authentication';

import Layout from './components/Layout';

const EnrolledCourses = React.lazy(() => import('./pages/EnrolledCourses'));
const ExecutePayment = React.lazy(() => import('./pages/ExecutePayment'));
const ExploreCourses = React.lazy(() => import('./pages/ExploreCourses'));
const Lectures = React.lazy(() => import('./pages/Lectures'));
const TeacherPanel = React.lazy(() => import('./pages/TeacherPanel'));

const App = props => {
    const { user, tryLogIn } = useContext(AuthenticationContext);

    useEffect(() => {
        if (!user) {
            tryLogIn();
        }
    }, [user, tryLogIn]);

    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <h1>Home Route</h1>
                </Route>
                <Route path="/courses" exact>
                    <Suspense fallback={<Loader active />}>
                        <ExploreCourses />
                    </Suspense>
                </Route>
                {user ? (
                    <Route path="/enrolled-courses" exact>
                        <Suspense fallback={<Loader active />}>
                            <EnrolledCourses />
                        </Suspense>
                    </Route>
                ) : null}
                {user ? (
                    <Route path="/courses/:courseId/lectures" exact>
                        <Suspense fallback={<Loader active />}>
                            <Lectures />
                        </Suspense>
                    </Route>
                ) : null}
                {user ? (
                    <Route path="/execute-payment" exact>
                        <Suspense fallback={<Loader active />}>
                            <ExecutePayment />
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
