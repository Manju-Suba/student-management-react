import { lazy } from 'react';
// project import
import MainLayout from 'layout/MainLayout';
import { PERMISSIONS } from '../constants/constants';
import ProtectedRoute from './ProtectRoutes';


const UserRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    
  ]
};

export default UserRoutes;
