import React, { useContext, useEffect, Suspense } from 'react';

import { Loader } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import { AuthenticationContext } from './context/authentication';
import { CategoriesContext } from './context/categories';

import Layout from './components/Layout';

const Course = React.lazy(() => import('./pages/Course'));
const EnrolledCourses = React.lazy(() => import('./pages/EnrolledCourses'));
const ExecutePayment = React.lazy(() => import('./pages/ExecutePayment'));
const ExploreCourses = React.lazy(() => import('./pages/ExploreCourses'));
const Lectures = React.lazy(() => import('./pages/Lectures'));
const TeacherPanel = React.lazy(() => import('./pages/TeacherPanel'));

const App = props => {
    const { user, tryLogIn } = useContext(AuthenticationContext);
    const { categories, fetchCategories } = useContext(CategoriesContext);

    useEffect(() => {
        if (!user) {
            tryLogIn();
        }
    }, [user, tryLogIn]);

    useEffect(() => {
        if (!categories.length) {
            fetchCategories();
        }
    }, [categories, fetchCategories]);

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
                <Route path="/courses/:id" exact>
                    <Suspense fallback={<Loader active />}>
                        <Course />
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
