import axiosInstance from '../../../constants/Global';
import { GET_USER_DETAILS } from 'components/redux/actionType';

export const ProfileData = (data) => {
    return (dispatch) => {
        axiosInstance
            .get(`/users/fetchsingleuser/${data}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                dispatch({
                    type: GET_USER_DETAILS,
                    payload: res.data.data
                });
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
};

