import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CategoriesPage from '../pages/CategoriesPage';

const createHistory = require("history").createBrowserHistory;

export const history = typeof(window) !== "undefined" ? createHistory() : createMemoryHistory();

class AppRouter extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" render={(props) => ( <CategoriesPage {...props} />)} exact={true} />
                    </Switch>
                </div>
            </Router>
        )
    }
};

export default AppRouter;
