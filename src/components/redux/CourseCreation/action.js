import {
	GET_COURSE_DATA,
	GET_COURSE_NO_COUNT,
	GET_STATUSWISE_ASSET_TICKET
} from 'components/redux/actionType';
import axiosInstance from '../../../constants/Global';

export const courseCreate = (data) => {
	return async () => {
		const response = await axiosInstance.post(`/course_create`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const getAllCourse = ( page, pageSize, signal) => {
	return (dispatch) => {
		let pageNo;
		if (page) {
			pageNo = page;
		} else {
			pageNo = 0;
		}

		let url = `/course/fetch-all?page=${pageNo}&size=${pageSize}`;
		axiosInstance
			.get(url, {
				signal: signal,
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_COURSE_DATA,
					payload: res.data.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};


export const courseDataUpdate = (id, data) => {
	return async () => {
		const response = await axiosInstance.post(`/course_update/${id}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const deleteCourse = (id) => {
	return async () => {
		const response = await axiosInstance.delete(`/delete_course/${id}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	};
};

export const getCourseNoCount = () => {
	return (dispatch) => {
		let url = `/course_count`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_COURSE_NO_COUNT,
					payload: res.data.data
				});
			})
			.catch((error) => {
				dispatch({
					type: GET_COURSE_NO_COUNT,
					payload: []
				});
				console.log('error', error);
			});
	};
};

