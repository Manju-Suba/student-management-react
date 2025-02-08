import PropTypes from 'prop-types';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button as Btn } from '../../../../../../node_modules/@mui/material/index';
import { useAuth } from '../../../../../routes/AuthContext';

// assets
import avatar1 from 'assets/images/users/avatar-1.png';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = ({ ProPicture }) => {
  const anchorRef = useRef(null);
	const navigate = useNavigate();
	const { logout } = useAuth();

  let proimg;
  if (ProPicture != null) {
    proimg =  ProPicture;
  } else {
    proimg = avatar1;
  }
  const iconBackColorOpen = 'grey.300';

  const handleLogout = async () => {
		try {
			const response = await logout();
			if (response.data.status == 200) {
				navigate('/');
			}else{
			  toast.error(response.data.message);
      }
		} catch (error) {
			toast.error('Unable Logout', error);
		}
	};

  return (
    <Box sx={{ flexShrink: 0 }}>
      <Link
        role="button"
        sx={{
          pr: -2.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={'profile-grow'}
        aria-haspopup="true"
        className="profile-box"
      >
        <img alt="profile user" src={proimg} style={{ width: '100%', backgroundSize: 'cover' }} />
      </Link>
      <Btn className="btn-profile-default" onClick={handleLogout} style={{marginTop: '-29px'}}>
        <LogoutIcon fontSize="small" /> Logout
      </Btn>
    </Box>
    
  );
};

export default Profile;
