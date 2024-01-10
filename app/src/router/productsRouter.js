import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Loading = <div>Loading....</div>;
const ProductsList = lazy(() => import('pages/products/ListPage'));

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
    path: 'list',
    element: (
      <Suspense fallback={Loading}>
        <ProductsList />
      </Suspense>
    ),
  },
];

export default productsRouter;
