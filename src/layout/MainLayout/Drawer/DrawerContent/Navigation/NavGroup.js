import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// material-ui
import { List, Typography } from '@mui/material';

// project import
import NavItem from './NavItem';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;
  // const token = localStorage.getItem('token') || '';

  // const decoded = jwtDecode(token);
  let role = '';

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.access) {
      case 'collapse':
        return (
          <Typography key={menuItem.id} variant="caption" color="error" sx={{ p: 2.5 }}>
            collapse - only available in paid version
          </Typography>
        );
      default:
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;;
    }
  });

  return <List sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}>{navCollapse}</List>;
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
