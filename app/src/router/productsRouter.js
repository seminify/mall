import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Loading = <div>Loading....</div>;
const ProductsAdd = lazy(() => import('pages/products/AddPage'));
const ProductsList = lazy(() => import('pages/products/ListPage'));
const ProductsRead = lazy(() => import('pages/products/ReadPage'));
const ProductsModify = lazy(() => import('pages/products/ModifyPage'));

const productsRouter = () => [
  {
    path: '',
    element: (
      <Navigate
        to='list'
        replace
      />
    ),
  },
  {
    path: 'add',
    element: (
      <Suspense fallback={Loading}>
        <ProductsAdd />
      </Suspense>
    ),
  },
  {
    path: 'list',
    element: (
      <Suspense fallback={Loading}>
        <ProductsList />
      </Suspense>
    ),
  },
  {
    path: 'read/:pno',
    element: (
      <Suspense fallback={Loading}>
        <ProductsRead />
      </Suspense>
    ),
  },
  {
    path: 'modify/:pno',
    element: (
      <Suspense fallback={Loading}>
        <ProductsModify />
      </Suspense>
    ),
  },
];

export default productsRouter;
