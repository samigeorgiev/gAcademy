import React, { useContext, useEffect, Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import { AuthenticationContext } from './context/authentication';
import { CategoriesContext } from './context/categories';

import Layout from './components/Layout';

const Course = React.lazy(() => import('./pages/Course'));
const Courses = React.lazy(() => import('./pages/Courses'));
const EnrolledCourses = React.lazy(() => import('./pages/EnrolledCourses'));
const ExecutePayment = React.lazy(() => import('./pages/ExecutePayment'));
const Home = React.lazy(() => import('./pages/Home'));
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
                    <Suspense fallback={<Loader active />}>
                        <Home />
                    </Suspense>
                </Route>
                <Route path="/courses" exact>
                    <Suspense fallback={<Loader active />}>
                        <Courses />
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
                    <Route path="/courses/:courseId/lectures/:lectureId?" exact>
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
