import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Homelazy = lazy(() => import('./pages/Home/Home'));

function Routes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Homelazy} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Routes;