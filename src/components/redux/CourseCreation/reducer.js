import { GET_COURSE_DATA, GET_COURSE_NO_COUNT } from '../actionType';

const INIT_STATE = {
	Course: [],
	CourseNoCount:[],
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_COURSE_DATA:
			return { ...state, Course: action.payload };
		case GET_COURSE_NO_COUNT:
			return { ...state, CourseNoCount: action.payload };
		default:
			return state;
	}
};
