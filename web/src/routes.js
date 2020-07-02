import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Dashboard, Login, New, NotFound } from './pages';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/new" exact component={New} />
                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}