import { GET_STUDENT_DATA } from '../actionType';

const INIT_STATE = {
	StudentData: [],
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_STUDENT_DATA:
			return { ...state, StudentData: action.payload };
		default:
			return state;
	}
};
