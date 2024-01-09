import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Loading = <div>Loading....</div>;
const TodoList = lazy(() => import('pages/todo/ListPage'));

const todoRouter = () => [
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
        <TodoList />
      </Suspense>
    ),
  },
];

export default todoRouter;
