import { ReactComponent as List } from 'assets/images/icons/list.svg';
import { ReactComponent as Master } from 'assets/images/icons/master.svg';
import { ReactComponent as Dashboard } from 'assets/images/icons/dashboard.svg';
//import style css
import '../menu-items/style.css';

const MenuLists = () => {
	const icons = {
		Dashboard,
		Master,
		List,
	};

	return [
		{
			id: 'dashboard',
			title: 'Dashboard',
			type: 'item',
			url: '/dashboard',
			icon: icons.Dashboard,
			breadcrumbs: true,
		},
		{
			id: 'util-Asset-creation',
			title: 'Course',
			type: 'item',
			url: '/CourseMaster',
			icon: icons.List,
		},
		{
			id: 'util-Master',
			title: 'Students',
			type: 'item',
			url: '/StudentMaster',
			icon: icons.Master,
			breadcrumbs: true,
		},
		{
			id: 'util-user-asset-list',
			title: 'Training Schedule',
			type: 'item',
			url: '/TrainingSchedule',
			icon: icons.List,
		}
	];
};

const Utilities = {
	id: 'utilities',
	title: 'Utilities',
	type: 'group',
	children: MenuLists()
};

export default Utilities;
