import { GET_SCHEDULED_DATA } from '../actionType';

const INIT_STATE = {
	ScheduleData: [],
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_SCHEDULED_DATA:
			return { ...state, ScheduleData: action.payload };
		default:
			return state;
	}
};
