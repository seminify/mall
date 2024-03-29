import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Loading = <div>Loading....</div>;
const TodoAdd = lazy(() => import('pages/todo/AddPage'));
const TodoList = lazy(() => import('pages/todo/ListPage'));
const TodoRead = lazy(() => import('pages/todo/ReadPage'));
const TodoModify = lazy(() => import('pages/todo/ModifyPage'));

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
    path: 'add',
    element: (
      <Suspense fallback={Loading}>
        <TodoAdd />
      </Suspense>
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
  {
    path: 'modify/:tno',
    element: (
      <Suspense fallback={Loading}>
        <TodoModify />
      </Suspense>
    ),
  },
];

export default todoRouter;
