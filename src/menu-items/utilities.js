import { ReactComponent as Disposed } from 'assets/images/icons/trash.svg';
import { ReactComponent as AssetList } from 'assets/images/icons/list.svg';
import { ReactComponent as Master } from 'assets/images/icons/master.svg';
import { ReactComponent as Audit } from 'assets/images/icons/audit.svg';
import { ReactComponent as AssetTransfer } from 'assets/images/icons/transfer.svg';
import { ReactComponent as Dashboard } from 'assets/images/icons/dashboard.svg';
import { ROLE_LIST } from '../constants/constants';
//import style css
import '../menu-items/style.css';

const MenuLists = () => {
	const icons = {
		Dashboard,
		AssetTransfer,
		Audit,
		Master,
		AssetList,
		Disposed
	};

	return [
		{
			id: 'dashboard',
			title: 'Dashboard',
			type: 'item',
			url: '/dashboard',
			icon: icons.Dashboard,
			breadcrumbs: true,
			// access: ROLE_LIST.ADMIN
		},
		{
			id: 'util-Asset-creation',
			title: 'Course',
			type: 'item',
			url: '/CourseMaster',
			icon: icons.AssetList,
			// access: ROLE_LIST.ADMIN
		},
		{
			id: 'util-Master',
			title: 'Students',
			type: 'item',
			url: '/StudentMaster',
			icon: icons.Master,
			breadcrumbs: true,
			// access: ROLE_LIST.ADMIN
		},
		{
			id: 'util-user-asset-list',
			title: 'Training Schedule',
			type: 'item',
			url: '/TrainingSchedule',
			icon: icons.AssetList,
			// access: ROLE_LIST.USER
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
