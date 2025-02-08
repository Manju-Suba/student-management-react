import { GET_USER_DETAILS } from '../actionType';

const INIT_STATE = {
	UserDetails: []
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_USER_DETAILS:
			return { ...state, UserDetails: action.payload };
		default:
			return state;
	}
};
