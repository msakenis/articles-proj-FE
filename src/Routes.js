import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Loading} from './components';
import ArticlesListProvider from './contexts/ArticlesList.context';

const Homelazy = lazy(() => import('./pages/Home/Home'));

function Routes() {
  return (
    <Router>
      <ArticlesListProvider>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path='/' component={Homelazy} />
          </Switch>
        </Suspense>
      </ArticlesListProvider>
    </Router>
  );
}

export default Routes;
