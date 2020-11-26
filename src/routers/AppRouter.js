import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CategoriesPage from '../pages/CategoriesPage';
import NotFoundPage from '../pages/NotFoundPage';

const createHistory = require("history").createBrowserHistory;

export const history = typeof(window) !== "undefined" ? createHistory() : createMemoryHistory();

const AppRouter = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" render={(props) => ( <CategoriesPage {...props} />)} exact={true} />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    )
};

export default AppRouter;
