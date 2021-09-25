import React from 'react';
import { Switch } from 'react-router';
import PropType from 'prop-types';

import RouteWithSubRoutes from '../../components/common/RouteWithSubRoutes/RouteWithSubRoutes';

const Product = ({ routes }) => (
  <React.Fragment>
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  </React.Fragment>
);

Product.propTypes = {
  routes: PropType.array,
};

export default Product;
