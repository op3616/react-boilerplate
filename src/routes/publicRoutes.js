import React from 'react';

const Home = React.lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "home" */ '../pages/Home'),
);

const Product = React.lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "product" */ '../pages/Product'
  ),
);

const ProductCart = React.lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "product-cart" */ '../pages/Product/Cart'
  ),
);

const ProductItem = React.lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "product-item" */ '../pages/Product/Item'
  ),
);

const Error = React.lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "error" */ '../pages/Error'
  ),
);

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/product',
    component: Product,
    routes: [
      {
        path: '/product/cart',
        component: ProductCart,
      },
      {
        path: '/product/item',
        component: ProductItem,
      },
    ],
  },
  {
    path: '*',
    component: Error,
  },
];
