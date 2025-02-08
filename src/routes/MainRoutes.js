import { lazy } from 'react';
// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { PERMISSIONS } from '../constants/constants';
import ProtectedRoute from './ProtectRoutes';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const StudentMaster = Loadable(lazy(() => import('pages/components-overview/StudentMaster')));
const CourseMaster = Loadable(lazy(() => import('pages/components-overview/CourseCreation')));
const TrainingSchedule = Loadable(lazy(() => import('pages/components-overview/TrainingSchedule')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: 'dashboard',
			element: <DashboardDefault />
		},
		{
			path: 'CourseMaster',
			element: <CourseMaster />
		},
		{
			path: 'StudentMaster',
			element: <StudentMaster />
		},
		{
			path: 'TrainingSchedule',
			element: <TrainingSchedule />
		},
		{
			path: 'sample-page',
			element: <SamplePage />
		}
		
	]
};

export default MainRoutes;
