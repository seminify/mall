import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Loading = <div>Loading....</div>;
const Main = lazy(() => import('pages/MainPage'));
const About = lazy(() => import('pages/AboutPage'));

export default createBrowserRouter([
  {
    path: '',
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: 'about',
    element: (
      <Suspense fallback={Loading}>
        <About />
      </Suspense>
    ),
  },
]);
