import React from 'react';
import { Router, Switch } from 'react-router-dom';

import publicRoutes from './publicRoutes';
import RouteWithSubRoutes from '../components/common/RouteWithSubRoutes/RouteWithSubRoutes';
import { history } from '../utils/history';

const Routes = () => (
  <Router history={history}>
    <Switch>
      {publicRoutes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  </Router>
);

export default Routes;
