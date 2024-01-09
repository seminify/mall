import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Loading = <div>Loading....</div>;
const TodoList = lazy(() => import('pages/todo/ListPage'));
const TodoRead = lazy(() => import('pages/todo/ReadPage'));

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
  {
    path: 'read/:tno',
    element: (
      <Suspense fallback={Loading}>
        <TodoRead />
      </Suspense>
    ),
  },
];

export default todoRouter;
