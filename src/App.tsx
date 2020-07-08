import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const Tap = React.lazy(() => import('./Tap/containers/Tap'));

function App() {
    const routes = (
        <Switch>
            <Route path="/tap" render={(props) => <Tap {...props} />} />
            <Redirect to="/tap" />
        </Switch>
    );

    return (
        <React.Fragment>
            <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </React.Fragment>
    );
}

export default withRouter(App);
