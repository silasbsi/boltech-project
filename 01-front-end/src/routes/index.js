import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import UserService from '../services/userService';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => 
                UserService.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
        </Switch>
    </BrowserRouter>
);

export default Routes;