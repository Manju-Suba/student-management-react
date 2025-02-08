import { lazy } from 'react';
import { useParams } from 'react-router-dom';
// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import PageNotFound from 'pages/extra-pages/PageNotFound';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: '*',
      element: <PageNotFound />
    },
    {
      path: '/unauthorized',
      element: <PageNotFound />
    },
    
  ]
};

export default LoginRoutes;
